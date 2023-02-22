import { ParseObject } from "./GraphQLObject";
import { ValueRef } from "./SchemaParser";

declare const fragment: unique symbol;
type Input = [
  "fragment",
  "comparisonFields",
  "on",
  "Character",
  "{",
  "name",
  "friendsConnection",
  "(",
  "first",
  ":",
  "$first",
  ")",
  "{",
  "totalCount",
  "edges",
  "{",
  "node",
  "{",
  "name",
  "}",
  "}",
  "}",
  "}",
];
type Test = ExtractFragment<Input, []>;
type Test1 = ExtractFramgentReference<Test[1], Test[2], Test[0]>;
type Test2 = ParseObject<Test1[1], [], "asds", Test1[0]>;
type A = ParseFragment<Input>;

export type ExtractFramgentReference<
  T,
  Ref extends string,
  TAgg extends unknown[],
> = T extends ["on", infer Reference, ...infer Tail extends string[]]
  ? [[...TAgg, ValueRef<Ref, Reference, typeof fragment>], Tail]
  : [TAgg, T];

type ExtractFragment<T, TAgg extends unknown[]> = T extends [
  "fragment",
  infer FragmentName extends string,
  ...infer Tail,
]
  ? [
      [...TAgg, ValueRef<typeof fragment, FragmentName, typeof fragment>],
      Tail,
      FragmentName,
    ]
  : [TAgg, T, ""];

export type ParseFragment<T extends string[]> = ExtractFragment<T, []> extends [
  infer Result extends unknown[],
  infer Rest extends string[],
  infer Name extends string,
]
  ? ExtractFramgentReference<Rest, Name, Result> extends [
      infer Result1 extends unknown[],
      infer Rest1 extends string[],
    ]
    ? ParseObject<Rest1, [], Name, Result1>
    : never
  : never;
