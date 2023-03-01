import { Strings } from ".";
import { Maths } from "../numbers";
import { ASCII } from "./tables";

export declare namespace StringCore {
  export type EmptyString = "@isEmptyString";

  type IfEmpty<T extends string, If, Then = T> = T extends EmptyString
    ? If
    : Then;

  export type ToTuple<T extends string> =
    T extends `${infer First}${infer Rest}` ? [First, ...ToTuple<Rest>] : [];

  // prettier-ignore
  export type Split<T extends string, Delimiter extends string = EmptyString> = 
    Delimiter extends "" | EmptyString 
        ? ToTuple<T> 
        : T extends `${infer Start}${Delimiter}${infer Rest}`
            ? [Start, ...Split<Rest, Delimiter>]
            : [T];

  export type Length<T extends string> = ToTuple<T>["length"];

  export type ToNumber<T extends string> =
    T extends `${infer Num extends number}` ? Num : never;

  export type Concat<A extends string, B extends string> = `${A}${B}`;

  export type Capitalize<T extends string> =
    T extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : T;

  export type Uncapitalize<T extends string> =
    T extends `${infer First}${infer Rest}` ? `${Lowercase<First>}${Rest}` : T;

  export type Replace<
    T extends string,
    TMatch extends string,
    TReplace extends string,
  > = T extends `${infer Head}${TMatch}${infer Tail}`
    ? `${Head}${TReplace}${Tail}`
    : T;

  export type ReplaceAll<
    T extends string,
    TMatch extends string,
    TReplace extends string,
  > = T extends `${infer Head}${TMatch}${infer Tail}`
    ? ReplaceAll<`${Head}${TReplace}${Tail}`, TMatch, TReplace>
    : T;

  export type Words<
    T extends string,
    CurrentWord extends string = EmptyString,
    Aggregator extends string[] = [],
  > = T extends `${infer First}${infer Rest}`
    ? First extends ASCII.WHITESPACE_CHARACTERS[number]
      ? Words<
          Rest,
          EmptyString,
          IfEmpty<CurrentWord, Aggregator, [...Aggregator, CurrentWord]>
        >
      : Words<
          Rest,
          IfEmpty<CurrentWord, First, Concat<CurrentWord, First>>,
          Aggregator
        >
    : IfEmpty<CurrentWord, Aggregator, [...Aggregator, CurrentWord]>;

  export type Join<
    T extends Strings.TemplateStrings[],
    Delimiter extends Strings.TemplateStrings,
  > = T extends [
    infer First extends Strings.TemplateStrings,
    ...infer Rest extends Strings.TemplateStrings[],
  ]
    ? Rest extends []
      ? `${First}`
      : `${First}${Delimiter}${Join<Rest, Delimiter>}`
    : "";

  // prettier-ignore
  export type SplitByAlphaNumericGroups<
    T extends string,
    previousKey extends string = EmptyString,
    CurrentWord extends string = EmptyString,
    Aggregator extends string[] = [],
  > = T extends `${infer First}${infer Rest}`
    ? CurrentWord extends EmptyString
        ? GetAlphaNumericASCIIKey<First> extends EmptyString 
            ? SplitByAlphaNumericGroups<Rest, EmptyString, EmptyString, Aggregator>
            : SplitByAlphaNumericGroups<Rest, GetAlphaNumericASCIIKey<First>, First, Aggregator>
        : GetAlphaNumericASCIIKey<First> extends EmptyString 
            ? SplitByAlphaNumericGroups<Rest, EmptyString, EmptyString, [...Aggregator, CurrentWord]>
            : GetAlphaNumericASCIIKey<First> extends previousKey 
                ? SplitByAlphaNumericGroups<Rest, GetAlphaNumericASCIIKey<First>, Concat<CurrentWord,First>, Aggregator>
                : SplitByAlphaNumericGroups<Rest, GetAlphaNumericASCIIKey<First>, First, [...Aggregator, CurrentWord]>
    : IfEmpty<CurrentWord, Aggregator, [...Aggregator, CurrentWord]>;

  export type GetAlphaNumericASCIIKey<T extends string = EmptyString> =
    T extends ASCII.UPPERCASE_CHARACTERS[number]
      ? "UPPERCASE_CHARACTERS"
      : T extends ASCII.LOWERCASE_CHARACTERS[number]
      ? "LOWERCASE_CHARACTERS"
      : T extends ASCII.DIGIT_CHARACTERS[number]
      ? "DIGIT_CHARACTERS"
      : EmptyString;

  export type SplitBeforeASCIIKey<
    T extends string,
    Key extends keyof ASCII.TABLE_BY_KEY,
    CurrentWord extends string = EmptyString,
    Aggregator extends string[] = [],
  > = T extends `${infer First}${infer Rest}`
    ? First extends ASCII.TABLE_BY_KEY[Key][number]
      ? SplitBeforeASCIIKey<
          Rest,
          Key,
          First,
          IfEmpty<CurrentWord, Aggregator, [...Aggregator, CurrentWord]>
        >
      : SplitBeforeASCIIKey<
          Rest,
          Key,
          IfEmpty<CurrentWord, First, Concat<CurrentWord, First>>,
          Aggregator
        >
    : IfEmpty<CurrentWord, Aggregator, [...Aggregator, CurrentWord]>;

  export type Repeat<
    T extends string,
    Counter extends Maths.NumberInput,
    Agg extends string = "",
  > = Maths.LTE<Counter, Maths.SignedZero> extends true
    ? Agg
    : Repeat<T, Maths.Dec<Counter>, `${Agg}${T}`>;

  export type TrimLeft<
    T extends string,
    TrimChar extends string = ASCII.WHITESPACE_CHARACTERS[number],
  > = T extends `${TrimChar}${infer Rest}` ? TrimLeft<Rest> : T;

  export type TrimRight<
    T extends string,
    TrimChar extends string = ASCII.WHITESPACE_CHARACTERS[number],
  > = T extends `${infer Rest}${TrimChar}` ? TrimRight<Rest> : T;

  export type Trim<
    T extends string,
    TrimChar extends string = ASCII.WHITESPACE_CHARACTERS[number],
  > = TrimLeft<TrimRight<T, TrimChar>, TrimChar>;

  export type StartsWith<
    T extends string,
    StartsWith extends string,
  > = T extends `${StartsWith}${string}` ? true : false;

  export type EndsWith<
    T extends string,
    EndsWith extends string,
  > = T extends `${string}${EndsWith}` ? true : false;

  export type Contains<
    T extends string,
    Contains extends string,
  > = T extends `${string}${Contains}${string}` ? true : false;

  export type IndexOf<
    T extends string,
    Search extends string,
  > = T extends `${infer Rest}${Search}${string}` ? Length<Rest> : -1;

  export type LastIndexOf<
    T extends string,
    Search extends string,
    LastIndex extends number = -1,
  > = T extends `${infer Start}${Search}${infer Rest}`
    ? LastIndexOf<`${Start}${Rest}`, Search, Length<Start>>
    : LastIndex;

  export type Slice<
    T extends string,
    TStart extends Maths.NumberInput,
    TEnd extends Maths.NumberInput,
    TotalLength extends Maths.NumberInput = Maths.Sub<TEnd, TStart>,
    Agg extends string = "",
  > = Maths.IsZero<TStart> extends true
    ? Maths.IsZero<TotalLength> extends true
      ? Agg
      : T extends `${infer Start_}${infer Rest}`
      ? Slice<
          Rest,
          Maths.SignedZero,
          TEnd,
          Maths.Dec<TotalLength>,
          `${Agg}${Start_}`
        >
      : ""
    : T extends `${string}${infer Tail extends string}`
    ? Slice<Tail, Maths.Dec<TStart>, TEnd, TotalLength, Agg>
    : "";

  export type PadStart<
    T extends string,
    Pad extends string,
    MaxLength extends Maths.NumberInput,
    CurrentStringLength extends Maths.SignedNumber = Maths.ToSignedNumber__<
      StringCore.Length<T>
    >,
  > = Maths.GT<CurrentStringLength, MaxLength> extends true
    ? StringCore.Slice<T, Maths.Sub<CurrentStringLength, MaxLength>, MaxLength>
    : Maths.EQ<CurrentStringLength, MaxLength> extends true
    ? T
    : PadStart<`${Pad}${T}`, Pad, MaxLength>;

  export type PadEnd<
    T extends string,
    Pad extends string,
    MaxLength extends Maths.NumberInput,
    CurrentStringLength extends Maths.NumberInput = Maths.ToSignedNumber__<
      StringCore.Length<T>
    >,
  > = Maths.GT<CurrentStringLength, MaxLength> extends true
    ? StringCore.Slice<T, Maths.SignedZero, MaxLength>
    : Maths.EQ<CurrentStringLength, MaxLength> extends true
    ? T
    : PadEnd<`${T}${Pad}`, Pad, MaxLength>;
}
