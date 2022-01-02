import { Flat, Length, Remove, Take_ } from './ts-array-utils';
import { Decrement, ParseTsNumber, Subtract, TsNumber, Zero } from './ts-number-system';
import {
    AllSpecialChar,
    Empty,
    LowerCaseChars,
    LowerToUpperCaseMap,
    TemplateStringPrimitve as String,
    UpperCaseChars,
    UpperLowerCharMap,
    WhitspaceChars,
} from './ts-string-constants';

export type ToString<T> = T extends String ? `${T}` : never;
export type GetStringLength<T> = Length<SplitEmpty<T>>;

type ParseSnakeCase<T, TFlag = true> = T extends `${infer Head}${infer Tail}`
    ? Head extends UpperCaseChars
        ? Concat<TFlag extends true ? '_' : '', Concat<ToLowerCaseChar<Head>, ParseSnakeCase<Tail>>>
        : Concat<ToString<Head>, ParseSnakeCase<Tail>>
    : '';
type SnakeCase<T> = ReplaceGroup<ParseSnakeCase<Join<Words<T>, '_'>, false>, '_', '_'>;

type ParsePascalCase<T> = T extends [infer Head, ...infer Tail]
    ? [FirstCharUpperCase<Head>, ...ParsePascalCase<Tail>]
    : [];
export type PascalCase<T> = Join<ParsePascalCase<Words<T>>, Empty>;

export type CamelCase<T> = FirstCharLowerCase<PascalCase<T>>;

export type KebapCase<T> = Replace<SnakeCase<T>, '_', '-'>;

export type ToUpperCaseChar<T> = T extends LowerCaseChars
    ? ToString<LowerToUpperCaseMap[T]>
    : ToString<T>;
export type ToUppperCase<T extends String> = T extends `${infer Head}${infer Tail}`
    ? `${ToUpperCaseChar<Head>}${ToUppperCase<Tail>}`
    : ToString<T>;

export type FirstCharUpperCase<T> = Concat<ToUpperCaseChar<StringHead<T>>, StringTail<T>>;

export type ToLowerCaseChar<T> = T extends UpperCaseChars
    ? ToString<UpperLowerCharMap[T]>
    : ToString<T>;
export type ToLowerCase<T extends String> = T extends `${infer Head}${infer Tail}`
    ? `${ToLowerCaseChar<Head>}${ToLowerCase<Tail>}`
    : ToString<T>;
export type FirstCharLowerCase<T> = Concat<ToLowerCaseChar<StringHead<T>>, StringTail<T>>;

export type Replace<
    T,
    TSearch extends String,
    TReplace extends String
> = T extends `${infer Head}${TSearch}${infer Tail}`
    ? `${Head}${TReplace}${Replace<Tail, TSearch, TReplace>}`
    : T;

export type ReplaceGroup<
    T,
    TSearch extends String,
    TReplace extends String
> = T extends `${infer Head}${TSearch}${TSearch}${infer Tail}`
    ? ReplaceGroup<`${Head}${TSearch}${Tail}`, TSearch, TReplace>
    : Replace<T, TSearch, TReplace>;

export type Split<
    T,
    TSplit extends String,
    TAgg extends String = ''
> = T extends `${infer Head}${infer Tail}`
    ? Head extends TSplit
        ? [TAgg, ...Split<Tail, TSplit>]
        : Split<Tail, TSplit, `${TAgg}${Head}`>
    : [TAgg];

export type SplitEmpty<T> = T extends `${infer Head}${infer Tail}`
    ? [Head, ...SplitEmpty<Tail>]
    : [];

export type Join<T, TJoin extends String> = T extends [infer Head]
    ? ToString<Head>
    : T extends [infer Head, ...infer Tail]
    ? `${ToString<Head>}${TJoin}${Join<Tail, TJoin>}`
    : '';

export type TrimLeftChar<T, TChar extends String> = T extends `${TChar}${infer Tail}`
    ? ToString<TrimLeftChar<Tail, TChar>>
    : ToString<T>;

export type TrimRightChar<T, TChar extends String> = T extends `${infer Tail}${TChar}`
    ? ToString<TrimRightChar<Tail, TChar>>
    : ToString<T>;

export type TrimChar<T, TChar extends String> = TrimLeftChar<TrimRightChar<T, TChar>, TChar>;
export type Trim<T> = TrimLeftChar<TrimRightChar<T, WhitspaceChars>, WhitspaceChars>;

export type Intersection<U0 extends String, U1 extends String> = U0 & U1;

export type Union<U0 extends String, U1 extends String> = U0 | U1;
export type UnionToArr<U0 extends string> = {
    [key in U0]: Exclude<U0, key> extends never ? [key] : [key, ...UnionToArr<Exclude<U0, key>>];
}[U0];

export type Difference<U0 extends String, U1 extends String> = Union<U0, U1> extends infer Head
    ? Head extends Intersection<U0, U1>
        ? never
        : Head
    : never;

export type ToUnion<T> = T extends [infer Head, ...infer Tail] ? Head | ToUnion<Tail> : never;

export type Concat<T1 extends String, T2 extends String> = `${T1}${T2}`;

export type StringHead<T> = T extends `${infer Head}${string}` ? Head : '';
export type StringTail<T> = T extends `${string}${infer Tail}` ? Tail : '';

export type StringFilter<
    T,
    TFilter extends String
> = T extends `${infer Head}${TFilter}${infer Tail}`
    ? `${Head}${StringFilter<Tail, TFilter>}`
    : ToString<T>;

export type Words<T> = Remove<Split<T, AllSpecialChar>, Empty>;

type PadStart_<T extends String, TPad extends String, Diff extends TsNumber> = Diff extends never
    ? T
    : Concat<Repeat_<TPad, Diff>, T>;

export type PadStart<T extends String, TPad extends String, MaxLength extends Number> = PadStart_<
    T,
    TPad,
    Subtract<ParseTsNumber<MaxLength>, T>
>;

export type TakeString_<T, TCount extends TsNumber> = Join<Take_<SplitEmpty<T>, TCount>, ''>;
export type TakeString<T, TCount extends number> = TakeString_<T, ParseTsNumber<TCount>>;

type PadEnd_<T extends String, TPad extends String, Diff extends TsNumber> = Diff extends never
    ? T
    : Concat<T, TakeString_<Repeat_<TPad, Diff>, Diff>>;

export type PadEnd<T extends String, TPad extends String, MaxLength extends Number> = PadEnd_<
    T,
    TPad,
    Subtract<ParseTsNumber<MaxLength>, T>
>;

export type Repeat_<T extends String, TRepeat extends TsNumber> = TRepeat extends Zero
    ? ''
    : `${T}${Repeat_<T, Decrement<TRepeat>>}`;

export type Repeat<T extends String, TRepeat extends number> = Repeat_<T, ParseTsNumber<TRepeat>>;

export type Includes<T, TSearch extends String> = T extends `${string}${TSearch}${string}`
    ? true
    : false;

export type IndexOf<T, TSearch extends String> = T extends `${infer Head}${TSearch}${string}`
    ? GetStringLength<Head>
    : never;

const test = 'asdD' as const;
type TestString = typeof test;
type TestUnionToArray = UnionToArr<'d' | 's'>;

type TestIndexOf = IndexOf<TestString, 'sd'>;
type TestGetStringLength = GetStringLength<TestString>;
type TestRepeat = Repeat<TestString, 3>;
type Num2 = '00';
type Num4 = '0000';
type PadStartTest = PadStart<TestString, '0', 15>;
type PadEndTest = PadEnd<TestString, '0', 15>;

type TestSplit = Split<TestString, 'a'>;
type TestWords = Split<TestString, AllSpecialChar>;
type TestSnakeCase = SnakeCase<TestString>;
type TestPascalCase = PascalCase<TestString>;
type TestCamelCase = CamelCase<TestString>;
type TestKebapCase = KebapCase<TestString>;
type TestUnion = ToUnion<TestSplit>;
type JoinTest = Join<TestSplit, '___'>;
type ReplaceGroupTest = ReplaceGroup<JoinTest, '_', 'abc'>;
type TestUnion2 = ToUnion<Split<ReplaceGroupTest, 'b'>>;
type TestIntersection = Intersection<TestUnion2, TestUnion>;
type TestDifference = Difference<TestUnion2, TestUnion>;
type TestFlat = Flat<[['a', 'b', 's'], ['c', 's']]>;
type TestRemFilter = Words<'..asdad.asd.'>;
type TestFirstCharUpperCase = FirstCharUpperCase<'ssss'>;
type TestFirstCharLowerCase = FirstCharLowerCase<TestFirstCharUpperCase>;
