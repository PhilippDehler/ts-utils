import { Filter } from "../../ts-array-utils";

export type Print<T> = T extends string
  ? T
  : T extends null
  ? "null"
  : T extends true
  ? "true"
  : T extends false
  ? "false"
  : T extends any[]
  ? PrintArray<T>
  : T extends (...args: any) => any
  ? PrintError<"UNPRINTABLE", "Can't print function">
  : T extends Object
  ? PrintError<"UNPRINTABLE", "Can't print object">
  : never;

export type PrintError<
  TInfo extends string,
  TMsg extends string,
> = `[ERROR: ${TInfo}]: ${TMsg}`;
export type PrintInfo<
  TInfo extends string,
  TMsg extends string,
> = `[INFO: ${TInfo}]: ${TMsg}`;

export type PrintArray<
  Variables extends string[],
  TAgg extends string = "[",
> = Variables extends [infer Head, ...infer Tail]
  ? Tail extends string[]
    ? PrintArray<Tail, `${TAgg extends "[" ? TAgg : `${TAgg}, `}${Print<Head>}`>
    : never
  : `${TAgg}]`;

type HasPartialMatch<I extends string, T extends string[]> = T[number] &
  `${I}${string}`;
type PartialMatches<I extends string, T extends string[]> = HasPartialMatch<
  I,
  T
> extends never
  ? []
  : Filter<T, Exclude<T[number], HasPartialMatch<I, T>>>;

export type AutoComplete<
  Input extends string,
  AutoCompleteList extends any[],
  OnError extends string,
  TPartialMatches extends any[] = PartialMatches<Input, AutoCompleteList>,
> = AutoCompleteList extends []
  ? `${Input}${PrintError<"NOT DEFINED", OnError>}`
  : TPartialMatches extends []
  ? Input extends `${Exclude<AutoCompleteList[number], "">}${infer Rest}`
    ? Input extends `${infer Start}${Rest}`
      ? Start
      : "THIS SHOULD NEVER HAPPEN" & Input
    : `${Input}[ERROR NOT DEFINED]:${OnError}`
  : TPartialMatches[0];
