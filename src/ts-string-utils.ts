import { Init, Length, Remove } from "./ts-array-utils";
import { AllSpecialChar, Empty, WhitspaceChars } from "./ts-constants";
import {
  CountCharacters,
  CounterDifference,
  CounterToNumber,
  Decrement,
  InitCounter,
} from "./ts-counter";
import { Args, FoldCallbackArgs, Lambda } from "./ts-lambda";
import { Print } from "./ts-print-utils";

export type GetStringLength<T extends string> = Length<SplitEmpty<T>>;

type SnakeCase<T extends string> = ReplaceGroup<Join<Words<T>, "_">, "_", "_">;

type ParsePascalCase<T, TAgg extends string[] = []> = T extends [
  infer Head extends string,
  ...infer Tail extends string[],
]
  ? ParsePascalCase<Tail, [...TAgg, FirstCharUpperCase<Head>]>
  : TAgg;

export type PascalCase<T extends string> = Join<
  ParsePascalCase<Words<T>>,
  Empty
>;

export type CamelCase<T extends string> = FirstCharLowerCase<PascalCase<T>>;

export type KebapCase<T extends string> = Replace<SnakeCase<T>, "_", "-">;

export type FirstCharUpperCase<T extends string> = Concat<
  Uppercase<FirstChar<T>>,
  RemoveFirstChar<T>
>;

export type FirstCharLowerCase<T extends string> = Concat<
  Lowercase<FirstChar<T>>,
  RemoveFirstChar<T>
>;

/**
 * Splits a string into an array of strings, delimited by the given delimiters.
 */

type GetPossibleFirstChunks<
  T,
  X extends string,
> = T extends `${infer Start}${X}${string}` ? Start : never;

type Shortest<A extends string, Y = A> = A extends any
  ? [Y] extends [`${A}${string}`]
    ? A
    : never
  : never;

export type Splitty<
  Input extends string,
  Del extends string,
  Agg extends string[] = [],
> = Input extends `${infer S extends Shortest<
  GetPossibleFirstChunks<Input, Del>
>}${Del}${string}`
  ? Splitty<
      Input extends `${S}${Del}${infer Rest}` ? Rest : never,
      Del,
      [...Agg, S]
    >
  : [...Agg, Input];

export type Replace<
  T extends string,
  TSearch extends string,
  TReplace extends string,
  TAgg extends string = Empty,
> = T extends `${infer Head}${TSearch}${infer Tail}`
  ? Replace<Tail, TSearch, TReplace, `${TAgg}${Head}${TReplace}`>
  : `${TAgg}${T}`;

export type ReplaceGroup<
  T extends string,
  TSearch extends string,
  TReplace extends string,
> = T extends `${infer Head}${TSearch}${TSearch}${infer Tail}`
  ? ReplaceGroup<`${Head}${TSearch}${Tail}`, TSearch, TReplace>
  : Replace<T, TSearch, TReplace>;

export type Split<
  T extends string,
  TSplit extends string,
  TAgg extends string[] = [],
> = T extends `${infer Head}${TSplit}${infer Tail}`
  ? Split<Tail, TSplit, [...TAgg, Head]>
  : [...TAgg, T];

export interface $Split<TSplit extends string> extends Lambda<string> {
  return: Split<Args<this>, TSplit>;
}

export type SplitEmpty<T extends string> = Init<
  Split<T, Empty>
> extends infer Splitted extends string[]
  ? Splitted
  : [];

export type Join<
  T,
  TJoin extends string,
  TAgg extends string = Empty,
  Inital extends boolean = true,
> = T extends [
  infer Head extends string | number,
  ...infer Tail extends (string | number)[],
]
  ? Join<
      Tail,
      TJoin,
      `${TAgg}${Inital extends true ? Empty : TJoin}${Head}`,
      false
    >
  : TAgg;

export interface $Join<TJoin extends string> extends Lambda {
  return: Join<Args<this>, TJoin>;
}

export interface $$Concat extends Lambda<FoldCallbackArgs> {
  return: `${Print<Args<this>["curr"]>}${Print<Args<this>["agg"]>}`;
}

export type TrimLeft<
  T extends string,
  TChar extends string,
> = T extends `${TChar}${infer Tail}` ? TrimLeft<Tail, TChar> : T;

export type TrimRight<
  T extends string,
  TChar extends string,
> = T extends `${infer Tail}${TChar}` ? TrimRight<Tail, TChar> : T;

export type TrimChar<T extends string, TChar extends string> = TrimLeft<
  TrimRight<T, TChar>,
  TChar
>;
export type Trim<T extends string> = TrimLeft<
  TrimRight<T, WhitspaceChars>,
  WhitspaceChars
>;
export interface $Trim extends Lambda<string> {
  return: Trim<Args<this>>;
}

export type Concat<T1 extends string, T2 extends string> = `${T1}${T2}`;

export type FirstChar<T extends string> = T extends `${infer First}${string}`
  ? First
  : Empty;

export type RemoveFirstChar<T extends string> =
  T extends `${string}${infer Rest}` ? Rest : Empty;
export type RemoveLastChar<T extends string> = Join<Init<SplitEmpty<T>>, Empty>;

export type RemoveString<
  T extends string,
  TFilter extends string,
  TAgg extends string = Empty,
> = T extends `${infer Head}${TFilter}${infer Tail}`
  ? RemoveString<Tail, TFilter, `${TAgg}${Head}`>
  : TAgg;

export type Words<T extends string> = Remove<Split<T, AllSpecialChar>, Empty>;

export type PadStart<
  T extends string,
  TPad extends string,
  TLength extends number,
  TAgg extends string = Empty,
> = CounterDifference<
  InitCounter<TLength>,
  CountCharacters<`${TAgg}${T}`>
> extends []
  ? RemoveCharactersFromStart<
      CounterToNumber<
        CounterDifference<CountCharacters<`${TAgg}${T}`>, InitCounter<TLength>>
      >,
      `${TAgg}${T}`
    >
  : PadStart<T, TPad, TLength, `${TAgg}${TPad}`>;

export type PadEnd<
  T extends string,
  TPad extends string,
  TLength extends number,
  TAgg extends string = Empty,
> = CounterDifference<
  InitCounter<TLength>,
  CountCharacters<`${T}${TAgg}`>
> extends []
  ? RemoveCharactersFromEnd<
      CounterToNumber<
        CounterDifference<CountCharacters<`${T}${TAgg}`>, InitCounter<TLength>>
      >,
      `${T}${TAgg}`
    >
  : PadEnd<T, TPad, TLength, `${TPad}${TAgg}`>;

type RemoveCharactersFromStart<
  T extends number,
  Input extends string,
  Counter extends unknown[] = InitCounter<T>,
> = Counter extends []
  ? Input
  : RemoveCharactersFromStart<T, RemoveFirstChar<Input>, Decrement<Counter>>;

type RemoveCharactersFromEnd<
  T extends number,
  Input extends string,
  Counter extends unknown[] = InitCounter<T>,
> = Counter extends []
  ? Input
  : RemoveCharactersFromEnd<T, RemoveLastChar<Input>, Decrement<Counter>>;

export type Repeat<
  T extends string,
  TRepeat extends number,
  TCounter extends unknown[] = InitCounter<TRepeat>,
  TAgg extends string = Empty,
> = TCounter extends []
  ? TAgg
  : Repeat<T, TRepeat, Decrement<TCounter>, `${T}${TAgg}`>;

export type Includes<
  T extends string,
  TSearch extends string,
> = T extends `${string}${TSearch}${string}` ? true : false;

export type IndexOf<
  T extends string,
  TSearch extends string,
> = T extends `${infer Head}${TSearch}${string}`
  ? GetStringLength<Head>
  : never;

type TestString = "asfpagfnpagnpoasgpoag asd";
// type TestIndexOf = IndexOf<TestString, 'sd'>;
// type TestGetStringLength = GetStringLength<TestString>;
// type TestRepeat = Repeat<TestString, 3>;
// type Num2 = '00';
// type Num4 = '0000';
// type PadStartTest = PadStart<TestString, '0', 15>;
// // type PadEndTest = PadEnd<TestString, '0', 15>;

// type Repea = Repeat<TestString, 3>;
// type TestSplit = Split<TestString, 'a'>;
// type TestWords = Split<TestString, AllSpecialChar>;
// type TestSnakeCase = SnakeCase<TestString>;
// type TestPascalCase = PascalCase<TestString>;
// type TestCamelCase = CamelCase<TestString>;
// type TestKebapCase = KebapCase<TestString>;
// type JoinTest = ReplaceGroup<Join<Words<TestString>, '_'>,"_","_">;
// type ReplaceGroupTest = ReplaceGroup<JoinTest, '_', 'abc'>;
// type TestRemFilter = Words<'..asdad.asd.'>;
// type TestFirstCharUpperCase = FirstCharUpperCase<'ssss'>;
// type TestFirstCharLowerCase = FirstCharLowerCase<TestFirstCharUpperCase>;
