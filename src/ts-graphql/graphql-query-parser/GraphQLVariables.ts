import { ValueRef } from "./SchemaParser";

export declare const variable: unique symbol;
export type ParseVariables<
  T extends string[],
  RootReference extends string,
  VariableName extends string = "",
  TAgg extends unknown[] = [],
> = T extends [infer Head extends string, ...infer Tail extends string[]]
  ? Head extends ")"
    ? [TAgg, Tail]
    : Head extends ":"
    ? ParseVariables<Tail, RootReference, VariableName, TAgg>
    : VariableName extends ""
    ? ParseVariables<Tail, RootReference, Head, TAgg>
    : ParseVariables<
        Tail,
        RootReference,
        "",
        [...TAgg, ValueRef<VariableName, Head, typeof variable>]
      >
  : never;

type TestParseVariable = ParseVariables<
  ["$as", ":", "aa", "$af", ":", "sf", ")"],
  "a"
>;
