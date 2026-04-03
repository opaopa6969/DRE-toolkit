#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const VERSION = '0.2.1';
const command = process.argv[2];
const arg = process.argv[3];

function findClaudeDir() {
  const candidates = ['.claude', path.join(process.cwd(), '.claude')];
  for (const dir of candidates) {
    if (fs.existsSync(dir)) return dir;
  }
  return null;
}

function findKitDir() {
  // Look for kit via node_modules or local
  const candidates = [
    path.join(process.cwd(), 'node_modules', '@unlaxer', 'dre-toolkit'),
    path.dirname(__dirname), // kit/ itself when run locally
  ];
  for (const dir of candidates) {
    if (fs.existsSync(path.join(dir, 'version.txt'))) return dir;
  }
  return null;
}

function cmdStatus() {
  const claudeDir = findClaudeDir();
  const kitDir = findKitDir();

  const localVersion = claudeDir
    ? (fs.existsSync(path.join(claudeDir, '.dre-version'))
        ? fs.readFileSync(path.join(claudeDir, '.dre-version'), 'utf8').trim()
        : 'unknown')
    : 'not installed';

  const kitVersion = kitDir
    ? fs.readFileSync(path.join(kitDir, 'version.txt'), 'utf8').trim()
    : 'unknown';

  console.log('DRE toolkit status');
  console.log('');
  console.log(`  Installed:  ${localVersion}`);
  console.log(`  Kit:        ${kitVersion}`);

  if (claudeDir) {
    console.log('');
    const dirs = ['rules', 'skills', 'agents', 'commands', 'profiles'];
    for (const dir of dirs) {
      const d = path.join(claudeDir, dir);
      if (fs.existsSync(d)) {
        const files = fs.readdirSync(d).filter(f => f !== '.gitkeep');
        console.log(`  .claude/${dir}/  ${files.length} ファイル`);
      }
    }
  }
}

function cmdList() {
  const kitDir = findKitDir();
  if (!kitDir) {
    console.error('ERROR: DRE toolkit not found in node_modules.');
    process.exit(1);
  }

  const dirs = ['rules', 'skills', 'agents', 'commands', 'profiles'];
  console.log('DRE toolkit — kit の内容');
  console.log('');
  for (const dir of dirs) {
    const d = path.join(kitDir, dir);
    if (fs.existsSync(d)) {
      const files = fs.readdirSync(d).filter(f => f !== '.gitkeep');
      if (files.length > 0) {
        console.log(`  ${dir}/`);
        for (const f of files) {
          console.log(`    ${f}`);
        }
      } else {
        console.log(`  ${dir}/  (空)`);
      }
    }
  }
}

function cmdSave() {
  const file = arg;
  if (!file) {
    console.error('ERROR: file path required. Usage: echo "content" | dre-tool save <file>');
    process.exit(1);
  }

  const dir = path.dirname(file);
  fs.mkdirSync(dir, { recursive: true });

  let content = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', chunk => { content += chunk; });
  process.stdin.on('end', () => {
    fs.writeFileSync(file, content);
    const bytes = Buffer.byteLength(content);
    console.log(`SAVED: ${file} (${bytes} bytes)`);
  });
}

function cmdVersion() {
  console.log(`dre-tool v${VERSION}`);
}

function cmdHelp() {
  console.log(`dre-tool v${VERSION} — DRE toolkit CLI

Commands:
  status     インストール状態とバージョンを表示
  list       kit に含まれるファイル一覧
  save <file>           stdin をファイルに保存
  install-plugin <yaml> plugin manifest を state-machine.yaml に merge
  version               バージョン表示
  help                  このヘルプを表示

Examples:
  dre-tool status
  dre-tool list
  echo "content" | dre-tool save .claude/rules/my-rule.md`);
}

function findDreDir() {
  const candidates = ['.dre', path.join(process.cwd(), '.dre')];
  for (const dir of candidates) {
    if (fs.existsSync(dir)) return dir;
  }
  return null;
}

function cmdInstallPlugin() {
  const manifestPath = arg;
  if (!manifestPath) {
    console.error('ERROR: manifest path required. Usage: dre-tool install-plugin <manifest.yaml>');
    process.exit(1);
  }
  if (!fs.existsSync(manifestPath)) {
    console.error(`ERROR: manifest not found: ${manifestPath}`);
    process.exit(1);
  }

  // Parse YAML manually (simple key:value, no external deps)
  const raw = fs.readFileSync(manifestPath, 'utf8');
  const lines = raw.split('\n');

  // Extract plugin id
  const idLine = lines.find(l => l.trim().startsWith('id:') && !l.includes('phases'));
  if (!idLine) {
    console.error('ERROR: manifest missing required field: plugin.id');
    process.exit(1);
  }
  const pluginId = idLine.split(':')[1].trim();

  // Extract phases
  const phases = [];
  let inPhase = false;
  let currentPhase = {};
  for (const line of lines) {
    if (line.trim() === '- id:' || line.match(/^\s{4}- id:/)) {
      if (Object.keys(currentPhase).length > 0) phases.push(currentPhase);
      currentPhase = { id: line.split('id:')[1].trim() };
      inPhase = true;
    } else if (inPhase) {
      const m = line.match(/^\s+(insert_after|ordering|loop_until):\s*(.+)/);
      if (m) currentPhase[m[1]] = m[2].trim();
    }
  }
  if (Object.keys(currentPhase).length > 0) phases.push(currentPhase);

  // Validate required fields per phase
  const required = ['id', 'insert_after'];
  for (const phase of phases) {
    for (const field of required) {
      if (!phase[field]) {
        console.error(`ERROR: phase missing required field "${field}" in manifest: ${manifestPath}`);
        process.exit(1);
      }
    }
  }

  if (phases.length === 0) {
    console.error('ERROR: manifest has no phases defined');
    process.exit(1);
  }

  // Load .dre/state-machine.yaml
  const dreDir = findDreDir() || '.dre';
  const smPath = path.join(dreDir, 'state-machine.yaml');
  if (!fs.existsSync(smPath)) {
    console.error(`ERROR: ${smPath} not found. Run dre-install first.`);
    process.exit(1);
  }

  let smContent = fs.readFileSync(smPath, 'utf8');

  // Check for ordering duplicates (simple: check if plugin already installed)
  if (smContent.includes(`- ${pluginId}`)) {
    console.log(`  plugin "${pluginId}" already installed — skipping`);
    return;
  }

  // Merge each phase into state-machine.yaml
  for (const phase of phases) {
    const insertAfter = phase.insert_after;
    const position = phase.ordering
      ? (parseInt(phase.ordering) < 100 ? 'plugins_before' : 'plugins_after')
      : 'plugins_before';

    // Find the target phase block and append plugin
    const regex = new RegExp(`(  - id: ${insertAfter}[\\s\\S]*?${position}: \\[\\])`, 'm');
    if (smContent.match(regex)) {
      smContent = smContent.replace(
        new RegExp(`(  - id: ${insertAfter}[\\s\\S]*?${position}: )\\[\\]`),
        `$1[${pluginId}]`
      );
    } else {
      // Already has items, append
      const appendRegex = new RegExp(`(  - id: ${insertAfter}[\\s\\S]*?${position}: \\[)(.*?)(\\])`);
      smContent = smContent.replace(appendRegex, (_, pre, mid, post) => {
        const items = mid ? `${mid}, ${pluginId}` : pluginId;
        return `${pre}${items}${post}`;
      });
    }
  }

  fs.writeFileSync(smPath, smContent);
  console.log(`  plugin "${pluginId}" installed → ${smPath}`);
  console.log(`  phases: ${phases.map(p => p.id).join(', ')}`);
}

// Dispatch
switch (command) {
  case 'status':
    cmdStatus();
    break;
  case 'list':
    cmdList();
    break;
  case 'save':
    cmdSave();
    break;
  case 'version':
  case '-v':
  case '--version':
    cmdVersion();
    break;
  case 'install-plugin':
    cmdInstallPlugin();
    break;
  case 'help':
  case '-h':
  case '--help':
  case undefined:
    cmdHelp();
    break;
  default:
    console.error(`ERROR: unknown command "${command}". Run "dre-tool help" for usage.`);
    process.exit(1);
}
