# UserManager

ファイルベースのユーザー管理 with [PubkeyUser](https://github.com/code4fukui/PubkeyUser)

## API

```js
import { UserManager } from "https://code4fukui.github.io/UserManager/UserManager.js";

const um = await UserManager.create();
```

- async isAllowed(pubkey)
許可チェック

- async add(pubkey, name, secret)
ユーザー追加

- async getRequestUsers()
許可待ちユーザー取得

- async getAllowedUsers()
許可済みユーザー取得

- async allow(pubkey)
許可

- async reject(pubkey)
拒否

- async remove(pubkey)
許可済みユーザーの削除

## test

```sh
deno test --allow-read=./data/ --allow-write=./data/ --allow-import
```
