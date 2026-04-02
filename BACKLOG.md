# BACKLOG

## Inbox（未分類・思いついたこと）

<!-- ここは気軽に投げ込む場所。整理・優先度付けは後でいい。 -->

- [ ] PR レビュー対応フロー — `/pulls/{pr}/reviews`（レビュー本文）を含む3エンドポイント取得をルール化する。参考: `docs/articles/github-pr-comment-fetch.md`

---

## v0.2.0
- [ ] extends 的な継承機構の設計
- [ ] install.sh の実装（`~/.claude/` vs `.claude/` 選択）
- [ ] kit/bin/dre-tool.js の実装

## v0.3.0
- [ ] update.sh の実装（既存ファイルとのマージ戦略）
- [ ] AskOS rules/skills/commands の kit への収録

## 将来
- [ ] npm keyword `claude-config` での publishing
- [ ] cross-tool 変換 — `dre-tool export --cursor` / `--codex` / `--gemini`（DRE rules を正典にして各ツール形式に変換）
- [ ] スキルカタログ — `kit/skills/catalog.md`（awesome のインデックスを内側に持つ）
