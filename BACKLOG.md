# BACKLOG — DRE-toolkit

> 最終更新: 2026-04-04
> バージョン: v0.5.0

## 完了済み

- ✅ install.sh 実装（`.claude/` へのコピー）
- ✅ update.sh 実装（カスタマイズ保護、新規ファイルのみ追加）
- ✅ .dre-manifest 生成（ファイル一覧 + sha256）
- ✅ dre-reset.md — ファイル単位リセット（CUSTOMIZED → INSTALLED）
- ✅ dre-uninstall.md — アンインストール（any → FRESH）
- ✅ dxe-command.md — dxe update/install/status をそのまま実行
- ✅ dre-activate.md — スキル有効化・無効化（skills/disabled/ 方式）
- ✅ rules/dre-skill-control.md — disabled/ スキル無視ルール
- ✅ update.sh: disabled/ のファイルも更新
- ✅ トリガー競合解消（dre-update.md を dxe-command.md に統合）

---

## P0: すぐやる

| # | タスク | 出典 | 種類 |
|---|--------|------|------|
| 1 | **dre-session.md 作成** — 「DRE して」の挙動定義。.claude/ 現状診断 → 番号付きアクション提案 | DGE session 2026-04-04 | 実装 |
| 2 | **Layer 3: dxe update 時に CLAUDE.md のスキル索引を自動再生成** — 手動索引は腐るため | DGE session skills過多 | 設計+実装 |

## P1: 設計が要る

| # | タスク | 出典 | 種類 |
|---|--------|------|------|
| 3 | **ユースケース定義** — プロファイル設計の前提。A:チーム設定統一 B:DxE管理 C:自作rules配布 | DGE Gap #4 | 設計 |
| 4 | **extends 的な継承機構** — 親パッケージの設定を extends して差分だけ上書き | BACKLOG旧 | 設計+実装 |
| 5 | **kit/bin/dre-tool.js の実装** — status / list / activate / deactivate を CLI で | BACKLOG旧 | 実装 |

## P2: 将来

| # | タスク | 出典 | 種類 |
|---|--------|------|------|
| 6 | **cross-tool 変換** — `dre-tool export --cursor / --codex / --gemini` | BACKLOG旧 | 設計+実装 |
| 7 | **スキルカタログ** — `kit/skills/catalog.md`（awesome のインデックスを内側に持つ） | BACKLOG旧 | コンテンツ |
| 8 | **npm keyword `claude-config` での publishing** | BACKLOG旧 | マーケティング |

## Inbox（未分類）

- [ ] PR レビュー対応フロー — `/pulls/{pr}/reviews`（レビュー本文）を含む3エンドポイント取得をルール化する
