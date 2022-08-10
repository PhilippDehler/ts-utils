import { Init, Length, Remove } from "./ts-array-utils";

import {
  AllSpecialChar,
  Empty,
  TemplateStringPrimitve, WhitspaceChars
} from "./ts-string-constants";
export type ToString<T extends TemplateStringPrimitve> = 
  T extends TemplateStringPrimitve 
    ? `${T}` 
    : never;
    
export type GetStringLength<T extends string> = Length<SplitEmpty<T>>;


type SnakeCase<T extends string> = ReplaceGroup<
  Join<Words<T>, "_">,
  "_",
  "_"
>;

type ParsePascalCase<T, TAgg extends string[]=[]> = 
  T extends [infer Head extends string, ...infer Tail extends string[]]
    ? ParsePascalCase<Tail, [...TAgg, FirstCharUpperCase<Head>]>
    : TAgg;

export type PascalCase<T extends string> = Join<
  ParsePascalCase<Words<T>>,
  Empty
>;

export type CamelCase<T extends string> = FirstCharLowerCase<PascalCase<T>>;

export type KebapCase<T extends string> = Replace<SnakeCase<T>, "_", "-">;

export type FirstCharUpperCase<T> = Concat<
  Uppercase<FirstChar<T>>,
  RemoveFirstChar<T>
>;

export type FirstCharLowerCase<T> = Concat<
  Lowercase<FirstChar<T>>,
  RemoveFirstChar<T>
>;

export type Replace<
  T extends string,
  TSearch extends string,
  TReplace extends string,
  TAgg extends string = "",
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

export type SplitEmpty<T extends string> = 
  Init<Split<T, "">> extends infer Splitted extends string[]
  ? Splitted
  : [];

export type Join<
  T,
  TJoin extends string,
  TAgg extends string = "",
  Inital extends boolean = true,
> = T extends [infer Head extends string, ...infer Tail extends string[]]
  ? Join<
      Tail,
      TJoin,
      `${TAgg}${Inital extends true ? "" : TJoin}${Head}`,
      false
    >
  : TAgg;

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
export type Concat<T1 extends string, T2 extends string> = `${T1}${T2}`;

export type FirstChar<T> = T extends `${infer First}${string}` ? First : "";
export type RemoveFirstChar<T> = T extends `${string}${infer Rest}` ? Rest : "";

export type RemoveString<
  T extends string,
  TFilter extends string,
  TAgg extends string = "",
> = T extends `${infer Head}${TFilter}${infer Tail}`
  ? RemoveString<Tail, TFilter, `${TAgg}${Head}`>
  : TAgg;

export type Words<T extends string> = Remove<Split<T, AllSpecialChar>, Empty>;

// type PadStart_<
//   T extends string,
//   TPad extends string,
//   Diff extends TsNumber,
// > = Diff extends never ? T : Concat<Repeat_<TPad, Diff>, T>;

// export type PadStart<
//   T extends string,
//   TPad extends string,
//   MaxLength extends number,
// > = PadStart_<T, TPad, Subtract<ParseTsNumber<MaxLength>, T>>;

// type TakeString_<
//   T extends string, 
//   TCount extends TsNumber, 
//   TTook = Take_<SplitEmpty<T>, TCount>
// > =
//   TTook extends string[]
//     ? Join<TTook, ""> 
//     : never;

// export type TakeString<T extends string, TCount extends number> = TakeString_<
//   T,
//   ParseTsNumber<TCount>
// >;

// type PadEnd_<
//   T extends string,
//   TPad extends string,
//   Diff extends TsNumber,
// > = Diff extends never ? T : Concat<T, TakeString_<Repeat_<TPad, Diff>, Diff>>;

// export type PadEnd<
//   T extends string,
//   TPad extends string,
//   MaxLength extends number,
// > = PadEnd_<T, TPad, Subtract<ParseTsNumber<MaxLength>, T>>;

// export type Repeat_<T extends string, TRepeat extends TsNumber> = TRepeat extends Zero
//   ? ""
//   : `${T}${Repeat_<T, Decrement<TRepeat>>}`;

// export type Repeat<T extends string, TRepeat extends number> = Repeat_<
//   T,
//   ParseTsNumber<TRepeat>
// >;

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

// type TestString = "asfpagfnpagnpoasgpoag asd"
// type TestIndexOf = IndexOf<TestString, 'sd'>;
// type TestGetStringLength = GetStringLength<TestString>;
// type TestRepeat = Repeat<TestString, 3>;
// type Num2 = '00';
// type Num4 = '0000';
// type PadStartTest = PadStart<TestString, '0', 15>;
// // type PadEndTest = PadEnd<TestString, '0', 15>;

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
