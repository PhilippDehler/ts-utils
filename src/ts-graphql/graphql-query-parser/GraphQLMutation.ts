import { ParseInput } from "./GraphQLInput";
import { ParseObject } from "./GraphQLObject";
import { ValueRef } from "./SchemaParser";

declare const mutation: unique symbol;

export type ExtractMuationInput<
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

type ExtractNamedMuation<T, TAgg extends unknown[]> = T extends [
  "query",
  infer NamedMuation extends string,
  ...infer Tail,
]
  ? [
      [...TAgg, ValueRef<typeof mutation, NamedMuation, typeof mutation>],
      Tail,
      NamedMuation,
    ]
  : [TAgg, T, ""];

type ExtractNamedInnerMuation<T, Ref, TAgg extends unknown[]> = T extends [
  "{",
  infer NamedMuation extends string,
  ...infer Tail,
  "}",
]
  ? [
      [
        ...TAgg,
        ValueRef<
          Ref extends "" ? typeof mutation : Ref,
          NamedMuation,
          typeof mutation
        >,
      ],
      Tail,
      NamedMuation,
    ]
  : [TAgg, T, ""];

export type ParseMuation<T extends string[]> = ExtractNamedMuation<
  T,
  []
> extends [
  infer Result extends unknown[],
  infer Rest extends string[],
  infer Name extends string,
]
  ? ExtractMuationInput<Rest, Name, Result> extends [
      infer Result1 extends unknown[],
      infer Rest1 extends string[],
    ]
    ? ExtractNamedInnerMuation<Rest1, Name, Result1> extends [
        infer Result2 extends unknown[],
        infer Rest2 extends string[],
        infer Name2 extends string,
      ]
      ? ExtractMuationInput<Rest2, Name2, Result2> extends [
          infer Result3 extends unknown[],
          infer Rest3 extends string[],
        ]
        ? ParseObject<Rest3, [], Name2, Result3>
        : never
      : never
    : never
  : never;
