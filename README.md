# AskOS-toolkit

AskOS の agents、rules、skills、document 構成を npm パッケージとして配布するためのツールキット。

## 構造

```
AskOS-toolkit/
├── kit/          # npm パッケージ (@unlaxer/askos-toolkit)
├── askos/        # 作業コピー（開発中の最新版）
├── design-materials/  # 設計資料 (intake → reviews → finalize)
├── docs/         # ドキュメント
├── paper/        # 研究・理論
├── server/       # API サーバー
├── sessions/     # セッション記録
└── templates/    # テンプレート
```

## インストール

```bash
npx @unlaxer/askos-toolkit askos-install
```
