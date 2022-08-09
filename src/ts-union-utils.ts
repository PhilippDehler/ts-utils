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

// type TestUnion0 = "A" | "B";
// type TestUnion1 = "C" | "B";

// type TestDifference = Difference<TestUnion0, TestUnion1>;
// type TestPermutations = UnionPermutations<TestUnion0 | TestUnion1>;
