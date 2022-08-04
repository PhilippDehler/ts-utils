export type UnionPermutations<U0 extends string> = {
  [key in U0]: Exclude<U0, key> extends never
    ? [key]
    : [key, ...UnionPermutations<Exclude<U0, key>>];
}[U0];

export type Difference<U0 extends String, U1 extends String> =
  | U0
  | U1 extends infer Head
  ? Head extends U0 & U1
    ? never
    : Head
  : never;

export type ToUnion<T extends unknown[]> = T[number];
