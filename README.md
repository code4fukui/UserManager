# UserManager

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

File-based user management with [PubkeyUser](https://github.com/code4fukui/PubkeyUser).

## API

```js
import { UserManager } from "https://code4fukui.github.io/UserManager/UserManager.js";

const um = await UserManager.create();
```

- `async isAllowed(pubkey)`
  Check if a user is allowed.
- `async add(pubkey, name, secret)`
  Add a new user.
- `async getRequestUsers()`
  Get a list of users waiting for approval.
- `async getAllowedUsers()`
  Get a list of approved users.
- `async allow(pubkey)`
  Approve a user.
- `async reject(pubkey)`
  Reject a user.
- `async remove(pubkey)`
  Remove an approved user.

## Testing

```sh
deno test --allow-read=./data/ --allow-write=./data/ --allow-import
```

## License

MIT License