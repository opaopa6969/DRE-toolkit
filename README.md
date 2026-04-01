# DRE-toolkit

**Document Rule Engine** — Claude Code の rules / skills / agents / commands / profiles を npm パッケージとして配布・管理するツールキット。

DGE-toolkit（Dialogue-driven Gap Extraction）、DDE-toolkit と並ぶ D*E シリーズの兄弟プロジェクト。AskOS はこのツールキットを利用するアプリケーションのひとつ。

## コンセプト

Claude Code プロジェクトの設定は今まで手動コピーで広めるしかなかった。DRE-toolkit はこれを npm パッケージ化し、`npx dre-install` 一発で展開できるようにする。

```
新プロジェクト
  └─ npx @unlaxer/dre-toolkit dre-install
       ├─ .claude/rules/     ← 行動ルール・制約
       ├─ .claude/skills/    ← スキル定義
       ├─ .claude/agents/    ← エージェント定義
       ├─ .claude/commands/  ← コマンド定義
       └─ .claude/profiles/  ← プロファイルプリセット
```

## インストール

> v0.1.0 — `install.sh` / `update.sh` / `dre-tool` は現在未実装。

```bash
npm install @unlaxer/dre-toolkit
npx dre-install
```

アップデート：

```bash
npx dre-update
```

## 構造

```
DRE-toolkit/
├── kit/               # npm パッケージ (@unlaxer/dre-toolkit)
│   ├── rules/         # インストール先: .claude/rules/
│   ├── skills/        # インストール先: .claude/skills/
│   ├── agents/        # インストール先: .claude/agents/
│   ├── commands/      # インストール先: .claude/commands/
│   ├── profiles/      # インストール先: .claude/profiles/
│   └── templates/     # CLAUDE.md テンプレートなど
├── dre/               # 作業コピー（kit/ の開発中の最新版）
│   ├── rules/
│   ├── skills/
│   ├── agents/
│   ├── commands/
│   └── profiles/
├── design-materials/  # 設計資料 (intake → reviews → finalize)
└── docs/              # ドキュメント
    ├── flows.md       # ワークフロー図 (mermaid)
    └── strategy.md    # 戦略・世界比較・課題
```

## DxE-suite

DGE / DDE / DRE をまとめて管理したい場合は [DxE-suite](https://github.com/opaopa6969/DxE-suite) を使うと一括インストール・アップデートができる。

```bash
npm install @unlaxer/dxe-suite
npx dxe install        # 全部
npx dxe install dre    # DRE のみ
```

## D*E シリーズ

```
DGE — Design-Gap Extraction       設計の穴を会話劇で発見
DDE — Document-Deficit Extraction ドキュメントの穴をLLM+CLIで補完
DRE — Document Rule Engine        rules/skills/agents をパッケージ化・配布
```
