# DRE-toolkit 戦略メモ

## 命名の経緯

DGE-toolkit（Dialogue-driven Gap Extraction）、DDE-toolkit に並ぶ兄弟として、`D_E` パターンで命名。

候補：
- DAE — Daily Agent Engine
- DOE — Daily Operation Engine
- **DRE — Document Rule Engine** ← 採用
- DSE — Document Structure Engine

DRE を選んだ理由：rules / skills / agents を管理するという「中身」に最も近い名前。

## 何をするものか

Claude Code をうまく使うための仕組みをパッケージ化する。具体的には：

- `.claude/rules/` — 行動ルール・制約
- `.claude/skills/` — スキル定義
- `.claude/commands/` — コマンド定義
- `CLAUDE.md` — プロジェクト固有の指示

これらを npm パッケージとして配布し、新プロジェクトへの展開・アップデートを自動化する。

## 世界標準との比較（2026年4月時点）

### 現状

Claude Code の設定を配布する方法として確立しているのは「GitHub repo + 手動コピー」のみ。
npm パッケージ化した例はまだない。コミュニティは awesome-claude-skills 系のキュレーションリストに収束しつつある段階。

### 最も近いアナロジー：ESLint shareable config

| ESLint config | DRE-toolkit |
|---|---|
| npm publish | npm publish |
| postinstall でファイル展開 | install.sh / update.sh |
| `extends` で継承 | 未実装（課題） |
| keyword: `eslintconfig` | keyword: `claude-config`（未標準） |

### 評価

DRE-toolkit の方向性は正しい。「npm でパッケージ化する」発想自体がまだ世界でほぼやられていないため先行者優位がある。

## 強み

- **再現性** — 新プロジェクトへの展開が `npx dre-install` 一発
- **バージョン管理** — どのルールセットで動いているか追跡できる
- **DGE との分離** — 方法論（DGE）と運用ルール（DRE）が別パッケージ、選んで組み合わせられる

## 課題・TODO

### 優先度高
- **extends 的な継承機構** — プロジェクト固有のカスタマイズをベース設定から継承する仕組みがない。update 時の上書き問題の根本原因
- **install 先の標準化** — `~/.claude/`（グローバル）vs `.claude/`（プロジェクト）どちらに置くかの設計

### 優先度中
- **keyword 規約** — npm に `claude-config` という keyword を先取りする
- **update 戦略** — `dre-update` 実行時のマージ・上書きルール

### 優先度低
- cross-tool 対応 — Cursor rules、AGENTS.md（Codex）への変換（Rulesync 的な機能）
