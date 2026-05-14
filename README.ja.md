# UserManager

[PubkeyUser](https://github.com/code4fukui/PubkeyUser) を使用したファイルベースのユーザー管理。

## API

```js
import { UserManager } from "https://code4fukui.github.io/UserManager/UserManager.js";

const um = await UserManager.create();
```

- `async isAllowed(pubkey)`
  ユーザーが許可されているか確認します。
- `async add(pubkey, name, secret)`
  新しいユーザーを追加します。
- `async getRequestUsers()`
  承認待ちのユーザー一覧を取得します。
- `async getAllowedUsers()`
  承認済みのユーザー一覧を取得します。
- `async allow(pubkey)`
  ユーザーを承認します。
- `async reject(pubkey)`
  ユーザーを拒否します。
- `async remove(pubkey)`
  承認済みユーザーを削除します。

## テスト

```sh
deno test --allow-read=./data/ --allow-write=./data/ --allow-import
```

## ライセンス

MIT License
