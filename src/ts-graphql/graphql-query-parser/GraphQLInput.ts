import { ValueRef } from "./SchemaParser";

export declare const input: unique symbol;
export type ParseInput<
  T extends string[],
  RootReference extends string,
  VariableName extends string = "",
  TAgg extends unknown[] = [],
> = T extends [infer Head extends string, ...infer Tail extends string[]]
  ? Head extends ")"
    ? [TAgg, Tail]
    : Head extends ":"
    ? ParseInput<Tail, RootReference, VariableName, TAgg>
    : VariableName extends ""
    ? ParseInput<Tail, RootReference, Head, TAgg>
    : ParseInput<
        Tail,
        RootReference,
        "",
        [...TAgg, ValueRef<VariableName, Head, typeof input>]
      >
  : never;
type TestParseInput = ParseInput<
  ["as", ":", "$aa", "af", ":", "$sf", ")"],
  "a"
>;
