import * as t from "https://deno.land/std/testing/asserts.ts";
import { UserManager } from "./UserManager.js";

const um = await UserManager.create();

Deno.test("allow and remmove", async () => {
  const u1 = "pub1";
  const u1name = "pub1name";
  const u1secret = "pub1secret";
  await um.add(u1, u1name, u1secret);
  t.assert(!await um.isAllowed(u1));
  await um.allow(u1);
  t.assert(await um.isAllowed(u1));
  await um.remove(u1);
  t.assert(!await um.isAllowed(u1));
});

Deno.test("reject", async () => {
  const u1 = "pub2";
  const u1name = "pub2name";
  const u1secret = "pub2secret";
  await um.add(u1, u1name, u1secret);
  t.assert(!await um.isAllowed(u1));
  await um.reject(u1);
  t.assert(!await um.isAllowed(u1));
});

Deno.test("request and allowed list", async () => {
  const u1 = "pub3";
  const u2 = "pub4";
  await um.add(u1, u1, u1);
  await um.add(u2, u2, u2);
  const list = await um.getRequestUsers();
  //console.log(list)
  t.assert(list.find(i => i.pubkey == u1) != null);
  t.assert(list.find(i => i.pubkey == u2)) != null;
  await um.allow(u1);
  t.assert(await um.isAllowed(u1));
  await um.reject(u2);
  t.assert(!await um.isAllowed(u2));
  const list2 = await um.getRequestUsers();
  t.assert(list2.find(i => i.pubkey == u1) == null);
  t.assert(list2.find(i => i.pubkey == u2) == null);
  const list3 = await um.getAllowedUsers();
  t.assert(list3.find(i => i.pubkey == u1) != null);
  t.assert(list3.find(i => i.pubkey == u2) == null);
});
