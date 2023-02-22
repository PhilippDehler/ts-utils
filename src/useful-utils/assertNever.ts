export function assertNever(v: never) {
  throw new Error("Never assertion " + v);
}
