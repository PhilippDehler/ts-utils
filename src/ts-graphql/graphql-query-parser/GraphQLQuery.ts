import { ParseInput } from "./GraphQLInput";
import { ParseObject } from "./GraphQLObject";
import { ParseVariables } from "./GraphQLVariables";
import { ValueRef } from "./SchemaParser";

export declare const query: unique symbol;

export type ExtractQueryInput<
  T,
  Ref extends string,
  TAgg extends unknown[],
> = T extends ["(", ...infer Tail extends string[]]
  ? ParseInput<Tail, Ref> extends [
      infer Result extends unknown[],
      infer Rest extends string[],
    ]
    ? [[...TAgg, ...Result], Rest]
    : [TAgg, Tail]
  : [TAgg, T];
export type ExtractQueryVariables<
  T,
  Ref extends string,
  TAgg extends unknown[],
> = T extends ["(", ...infer Tail extends string[]]
  ? ParseVariables<Tail, Ref> extends [
      infer Result extends unknown[],
      infer Rest extends string[],
    ]
    ? [[...TAgg, ...Result], Rest]
    : [TAgg, Tail]
  : [TAgg, T];

type ExtractNamedQuery<T, TAgg extends unknown[]> = T extends [
  "query",
  infer NamedQuery extends string,
  ...infer Tail,
]
  ? [
      [...TAgg, ValueRef<typeof query, NamedQuery, typeof query>],
      Tail,
      NamedQuery,
    ]
  : [TAgg, T, ""];

type ExtractNamedInnerQuery<T, Ref, TAgg extends unknown[]> = T extends [
  "{",
  infer NamedQuery extends string,
  ...infer Tail,
  "}",
]
  ? [
      [
        ...TAgg,
        ValueRef<Ref extends "" ? typeof query : Ref, NamedQuery, typeof query>,
      ],
      Tail,
      NamedQuery,
    ]
  : [TAgg, T, ""];

export type ParseQuery<T extends string[]> = ExtractNamedQuery<T, []> extends [
  infer Result extends unknown[],
  infer Rest extends string[],
  infer Name extends string,
]
  ? ExtractQueryVariables<Rest, Name, Result> extends [
      infer Result1 extends unknown[],
      infer Rest1 extends string[],
    ]
    ? ExtractNamedInnerQuery<Rest1, Name, Result1> extends [
        infer Result2 extends unknown[],
        infer Rest2 extends string[],
        infer Name2 extends string,
      ]
      ? ExtractQueryInput<Rest2, Name2, Result2> extends [
          infer Result3 extends unknown[],
          infer Rest3 extends string[],
        ]
        ? ParseObject<Rest3, [], Name2, Result3>
        : never
      : never
    : never
  : never;

type TestParseInput = ParseQuery<
  [
    "query",
    "HeroNameAndFriends",
    "(",
    "$episode",
    ":",
    "Episode",
    ")",
    "{",
    "hero",
    "(",
    "episode",
    ":",
    "$episode",
    ")",
    "{",
    "...",
    "comparisonFields",
    "id",
    "strength",
    "someNestedField",
    "{",
    "...",
    "comparisonFields",
    "}",
    "}",
    "}",
  ]
>;
