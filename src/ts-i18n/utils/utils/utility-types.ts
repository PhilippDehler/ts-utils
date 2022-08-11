export type NestedObj<T> = { [key: string]: T | NestedObj<T> };
export type Concat<
  A extends string | number,
  B extends string | number,
  TDelimiter extends string = ".",
> = `${A extends "" ? A : `${A}${TDelimiter}`}${B}`;

export type ArrayToObject<T, TArray extends string[] = []> = {
  [key in TArray[number]]: T;
};

export type Narrowable = string | number | bigint | boolean;
export type Narrow<A> =
  | (A extends Narrowable ? A : never)
  | (A extends [] ? [] : never)
  | {
      [K in keyof A]: A[K] extends Function ? A[K] : Narrow<A[K]>;
    };

export function infer<T>(i: Narrow<T>) {
  return i;
}

export type Filter<T, TFilter, TAgg extends any[] = []> = T extends [
  infer Head,
  ...infer Tail,
]
  ? Head extends TFilter
    ? Filter<Tail, TFilter, TAgg>
    : Filter<Tail, TFilter, [...TAgg, Head]>
  : TAgg;

export type Remove<T, TFilter extends string[]> = T extends [
  infer Head,
  ...infer Tail,
]
  ? Head extends TFilter[number]
    ? Remove<Tail, TFilter>
    : [Head, ...Remove<Tail, TFilter>]
  : [];

export type TrimLeftChar<
  T,
  TChar extends string,
> = T extends `${TChar}${infer Tail}` ? TrimLeftChar<Tail, TChar> : T;

export type TrimRightChar<
  T,
  TChar extends string,
> = T extends `${infer Tail}${TChar}` ? TrimRightChar<Tail, TChar> : T;

export type TrimChar<T, TChar extends string> = TrimLeftChar<
  TrimRightChar<T, TChar>,
  TChar
>;
export type Trim<T> = TrimLeftChar<TrimRightChar<T, " " | "\n">, " " | "\n">;

export type TrimmedSplit<
  T extends string,
  Delimiter extends string,
  TAgg extends string[] = [],
> = T extends `${infer Start}${Delimiter}${infer Rest}`
  ? TrimmedSplit<
      Rest,
      Delimiter,
      [...TAgg, ...(Trim<Start> extends "" ? [] : [Trim<Start>])]
    >
  : [...TAgg, ...(Trim<T> extends "" ? [] : [Trim<T>])];
export type TrimmedSplitMultiple<
  T extends string,
  Delimiter extends string[],
  TAgg extends string[] = [],
> = T extends `${infer Start}${Delimiter[number]}${infer Rest}`
  ? TrimmedSplitMultiple<
      Rest,
      Delimiter,
      [...TAgg, ...(Start extends "" ? [] : [Trim<Start>])]
    >
  : [...TAgg, ...(T extends "" ? [] : [Trim<T>])];

export type KeyValuePair<Key extends string, Value> = { [K in Key]: Value };

export declare const lambda: unique symbol;

/**
 * Declares basic lambda function with an unique symbol
 * to force other interfaces extending from this type
 */
export interface Lambda {
  args: unknown;
  return: unknown;
  [lambda]: never;
}

/**
 * Composes two Lambda type functions and returns a new lambda function
 * JS-equivalent:
 *  const compose = (a,b) => (arg) => a(b(arg))
 *
 */
export interface Compose<
  A extends Lambda & { args: B["return"] },
  B extends Lambda,
  I extends Args<B> = Args<B>,
> extends Lambda {
  args: I;
  return: Call<A, Call<B, Args<this>>>;
}
export interface Chain<A extends Lambda & { args: Args<B> }, B extends Lambda>
  extends Lambda {
  args: Args<B>;
  return: Call<B, Args<this>> extends unknown
    ? Call<A, Args<this>>
    : Call<B, Args<this>>;
}

export interface EmptyLambda extends Lambda {
  return: Args<this>;
}

export type MapLambda<
  T extends unknown[],
  L extends Lambda & { args: T[number] },
  TAgg extends L["return"][] = [],
> = T extends [infer Head, ...infer Tail]
  ? MapLambda<Tail, L, [...TAgg, Call<L, Head>]>
  : TAgg;

export type FlatMapLambda<
  T extends unknown[],
  L extends Lambda & { args: T[number] },
  TAgg extends L["return"][] = [],
> = T extends [infer Head, ...infer Tail]
  ? Call<L, Head> extends infer O
    ? O extends any[]
      ? FlatMapLambda<Tail, L, [...TAgg, ...O]>
      : FlatMapLambda<Tail, L, [...TAgg, O]>
    : never
  : TAgg;

/**
 * Either:
 * if Call<A> extends never A will be replaced by B
 * TODO: BugInside
 *
 */
export interface Either<
  A extends Lambda,
  B extends Lambda & { args: Args<A> },
  I extends Args<A> = Args<A>,
> extends Lambda {
  args: I;
  left: Call<A, Args<this>> extends never ? this["right"] : Call<A, Args<this>>;
  right: Call<B, Args<this>>;
  return: this["left"];
}

/**
 * Gets return type value from a Lambda type function
 */
export type Call<M extends Lambda, T> = (M & { args: T })["return"];
/**
 * Extracts the argument from a lambda function
 */
export type Args<M extends Lambda> = M["args"];

export type Return<M extends Lambda> = M["return"];
