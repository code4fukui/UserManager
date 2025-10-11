import { dir2array } from "https://js.sabae.cc/dir2array.js";
import { DateTime } from "https://js.sabae.cc/DateTime.js";

const write = async (fn, data) => {
  try {
    await Deno.writeTextFile(fn, JSON.stringify(data, null, 2));
    return true;
  } catch (e) {
    //console.log(e);
    return false;
  }
};
const remove = async (fn) => {
  try {
    await Deno.remove(fn);
    return true;
  } catch (e) {
    //console.log(e);
    return false;
  }
};
const read = async (fn) => {
  try {
    return JSON.parse(await Deno.readTextFile(fn));
  } catch (e) {
    //console.log(e);
    return null;
  }
};

const list = async (dir) => {
  const fns = await dir2array(dir);
  const fns2 = fns.filter(i => i.endsWith(".json"));
  const res = [];
  for (const fn of fns2) {
    const o = await read(dir + "/" + fn);
    res.push(o);
  }
  return res;
};

const time = () => new DateTime().toString();

const defaultpath = "./data/user";

export class UserManager {
  static async create(path = defaultpath) {
    const dirs = ["request", "allowed", "rejected"];
    for (const dir of dirs) {
      await Deno.mkdir(path + "/" + dir, { recursive: true });
    }
    return new UserManager(path);
  }
  constructor(path) {
    this.path = path;
  }
  getPath(dir, pubkey) {
    if (pubkey) {
      return this.path + "/" + dir + "/" + pubkey + ".json";
    }
    return this.path + "/" + dir;
  }
  async add(pubkey, name, secret) {
    const dt = time();
    await write(this.getPath("request", pubkey), { pubkey, name, secret, dt });
  }
  async isAllowed(pubkey) {
    return await read(this.getPath("allowed", pubkey)) != null;
  }
  async getRequestUsers() {
    return await list(this.getPath("request"));
  }
  async getAllowedUsers() {
    return await list(this.getPath("allowed"));
  }
  async allow(pubkey) {
    const r = await read(this.getPath("request", pubkey));
    if (!r) throw new Error("not found in request");
    r.allowed = time();
    await write(this.getPath("allowed", pubkey), r);
    await remove(this.getPath("request", pubkey));
  }
  async reject(pubkey) {
    const r = await read(this.getPath("request", pubkey));
    if (!r) throw new Error("not found in request");
    r.rejected = time();
    await write(this.getPath("rejected", pubkey), r);
    await remove(this.getPath("request", pubkey));
  }
  async remove(pubkey) {
    const r = await read(this.getPath("allowed", pubkey));
    if (!r) throw new Error("not found in allowed");
    r.rejected = time();
    await write(this.getPath("rejected", pubkey), r);
    await remove(this.getPath("allowed", pubkey));
  }
}
