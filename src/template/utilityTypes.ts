export type NeedsSuggestions<T extends string> = T extends `${string}?${string}`
  ? true
  : false;

export type HasPartialMatch<I extends string, B extends string> = [
  B & `${I}${string}`,
] extends [`${infer A}`]
  ? [A] extends [never]
    ? false
    : true
  : false;

export type ErrorMsg<Msg extends string> = `[Error:${Msg}]`;
export type SuggestionMsg<Msg extends string> = `${Msg}`;
