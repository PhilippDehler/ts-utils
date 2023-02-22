import { Init, Last } from "../../ts-array-utils";
import { ParseVariables } from "./GraphQLVariables";
import { ValueRef } from "./SchemaParser";

export declare const objectValue: unique symbol;
export type ParseObject<
  T extends string[],
  ObjectKeyStack extends string[] = [],
  PreviousValue extends string = "",
  TAgg extends unknown[] = [],
> = T extends [infer Head extends string, ...infer Tail extends string[]]
  ? Head extends "{"
    ? ParseObject<Tail, [...ObjectKeyStack, PreviousValue], Head, TAgg>
    : Head extends "..."
    ? ParseObject<Tail, ObjectKeyStack, Head, TAgg>
    : Head extends "}"
    ? ParseObject<Tail, Init<ObjectKeyStack>, Head, TAgg>
    : Head extends "("
    ? ParseVariables<Tail, PreviousValue> extends [
        infer Result extends unknown[],
        infer Rest extends string[],
      ]
      ? ParseObject<Rest, ObjectKeyStack, Head, [...TAgg, ...Result]>
      : never
    : ParseObject<
        Tail,
        ObjectKeyStack,
        Head,
        [...TAgg, ValueRef<Last<ObjectKeyStack>, Head, typeof objectValue>]
      >
  : TAgg;
type TestParseInput = ParseObject<
  [
    "{",
    "name",
    "...",
    "asda",
    "(",
    "a",
    ":",
    "b",
    "c",
    ":",
    "d",
    ")",
    "appearsIn",
    "friends",
    "{",
    "name",
    "}",
    "}",
  ],
  [],
  "inital"
>;
