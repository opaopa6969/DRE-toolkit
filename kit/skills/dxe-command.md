<!-- DRE-toolkit (MIT License) -->

# Skill: dxe コマンド

## Trigger
以下のいずれかを言ったとき:
- 「dxe update」「dxe install」「dxe status」
- 「DxE を更新して」「DxE をインストールして」「DxE の状態を確認して」
- 「全部更新して」（DxE インストール済みのプロジェクトで）

## MUST
**考えるな。そのまま実行する。**

## 手順

### dxe update
```bash
npx dxe update
```

### dxe install
```bash
npx dxe install
```

### dxe status
```bash
npx dxe status
```

### 対象を絞る場合（例: dge だけ更新）
```bash
npx dxe update dge
```

## 注意
- `npx dxe` が見つからない場合は `npm install @unlaxer/dxe-suite` を案内する。
- 結果をそのまま表示してユーザーに判断させる。余計な解釈を加えない。
