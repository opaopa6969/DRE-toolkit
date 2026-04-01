# DRE-toolkit

**Document Rule Engine** — Claude Code をうまく使うための仕組み（rules, skills, agents, commands）を npm パッケージとして配布・管理するツールキット。

DGE-toolkit（Dialogue-driven Gap Extraction）、DDE-toolkit と並ぶ兄弟プロジェクト。

## コンセプト

Claude Code プロジェクトの `.claude/rules`、`.claude/skills`、`.claude/commands` などは今まで手動コピーで広めるしかなかった。DRE-toolkit はこれを npm パッケージ化し、`npx dre-install` 一発で展開できるようにする。

```
新プロジェクト
  └─ npx @unlaxer/dre-toolkit dre-install
       ├─ .claude/rules/    ← 展開
       ├─ .claude/skills/   ← 展開
       └─ .claude/commands/ ← 展開
```

## 構造

```
DRE-toolkit/
├── kit/          # npm パッケージ (@unlaxer/dre-toolkit)
├── askos/        # 作業コピー（開発中の最新版）
├── design-materials/  # 設計資料 (intake → reviews → finalize)
├── docs/
├── paper/
├── server/
├── sessions/
└── templates/
```

## インストール

```bash
npx @unlaxer/dre-toolkit dre-install
```
