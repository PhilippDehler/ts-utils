export type UnionPermutation<
  U extends PropertyKey,
  TAgg extends unknown[] = [],
> = [U] extends [never]
  ? TAgg
  : { [K in U]: UnionPermutation<Exclude<U, K>, [K, ...TAgg]> }[U];

export type Difference<U0 extends String, U1 extends String> =
  | U0
  | U1 extends infer Head
  ? Head extends U0 & U1
    ? never
    : Head
  : never;

type TestUnion0 = "A" | "B";
type TestUnion1 = "C" | "B";

type TestDifference = Difference<TestUnion0, TestUnion1>;
type TestPermutations = UnionPermutation<TestUnion0 | TestUnion1>;
