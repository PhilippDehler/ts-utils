type Split<
  T,
  Delimiter extends string,
  TAgg extends string[] = [],
> = T extends `${infer A}${Delimiter}${infer B}`
  ? Split<B, Delimiter, [...TAgg, ...(A extends "" ? [] : [A])]>
  : [...TAgg, ...(T extends "" ? [] : [T])];

export type FlatSplit<T, Delimiter extends string, TAgg extends string[] = []> = T extends [
  infer Head extends string,
  ...infer Tail,
]
  ? FlatSplit<Tail, Delimiter, [...TAgg, ...Split<Head, Delimiter>]>
  : TAgg;

export type SplitMultiple<T extends string, Delimiter extends string[] = []> = Delimiter extends [
  infer Head extends string,
  ...infer Tail extends string[] | [],
]
  ? SplitMultiple_<Split<T, Head>, Tail>
  : never;

type SplitMultiple_<T extends string[], Delimiter extends string[] = []> = Delimiter extends [
  infer D extends string,
  ...infer Rest extends string[] | [],
]
  ? SplitMultiple_<FlatSplit<T, D>, Rest>
  : T;
