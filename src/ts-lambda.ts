import { KeyValuePair } from "./ts-object-utils";
import { Narrow, WidenStructure } from "./ts-utils";

export declare const lambda: unique symbol;

/**
 * Declares basic lambda function with an unique symbol
 * to force other interfaces extending from this type
 */
export interface Lambda<Args = unknown, Return = unknown> {
  args: Args;
  return: Return;
  [lambda]: never;
}

/**
 * Composes two Lambda type functions and returns a new lambda function
 * JS-equivalent:
 *  const compose = (a,b) => (arg) => a(b(arg))
 *
 */
export interface Compose<
  A extends Lambda<WidenStructure<Return<B>>>,
  B extends Lambda<any, Args<A>>,
  I extends Args<B> = Args<B>,
> extends Lambda {
  args: I;
  intermediate: Call<B, Args<this>>;
  return: this["intermediate"] extends Args<A>
    ? Call<A, this["intermediate"]>
    : never;
}

export interface EmptyLambda<L extends unknown> extends Lambda<L> {
  return: Args<this>;
}
export interface $Override<L extends unknown> extends Lambda<unknown, L> {
  return: L;
}
/**
 * Gets return type value from a Lambda type function
 */
export type Call<M extends Lambda, T extends Args<M>> = (M & {
  args: T;
})["return"];
/**
 * Extracts the argument from a lambda function
 */
export type Args<M extends Lambda> = M["args"];

export type Return<M extends Lambda> = M["return"];

export type Primitve = string | number | bigint | boolean | null | undefined;

interface UpperCase extends Lambda<string> {
  return: Uppercase<Args<this>>;
}
interface LowerCase extends Lambda<string> {
  return: Lowercase<Args<this>>;
}

type Test = Call<UpperCase, "asd">; // "ASD"
type ComposeTest = Call<Compose<LowerCase, UpperCase>, "asdasd">; // "asdasd"

interface $Cache<$CachedFn extends Lambda, TChacheAgg extends unknown = {}>
  extends Lambda<{ key: unknown; value: unknown }> {
  cache: TChacheAgg;
  return: Args<this>["key"] extends keyof this["cache"]
    ? this["cache"][Args<this>["key"]]
    : Args<this>["key"] extends string
    ? $Cache<
        $CachedFn,
        Narrow<
          TChacheAgg &
            KeyValuePair<
              Args<this>["key"],
              Call<$CachedFn, Args<this>["value"]>
            >
        >
      >
    : never;
}
//sounds good doesn't work, because typescript is caching all args by default, but maybe it's working in a recursive stack. I don't knwo yet
type GetCache<TCache extends $Cache<Lambda>> = TCache["cache"];

export interface $Map<
  Callback extends Lambda<unknown>,
  TAgg extends unknown[] = [],
> extends Lambda {
  return: Args<this> extends [infer Head, ...infer Tail]
    ? Call<$Map<Callback, [...TAgg, Call<Callback, Head>]>, Tail>
    : TAgg;
}

export interface $FoldOperation extends Lambda<FoldCallbackArgs> {
  agg: Args<this>["agg"] extends any[]
    ? Args<this>["agg"]
    : [Args<this>["agg"]];
}

export interface FoldCallbackArgs<
  TCurr = unknown,
  TAgg = unknown,
  TArray = unknown,
> {
  curr: TCurr;
  agg: TAgg;
  arr: TArray;
}
export interface $FoldRight<
  $Callback extends Lambda<FoldCallbackArgs>,
  Inital extends unknown,
  TArray extends unknown[] = [],
> extends Lambda {
  return: Args<this> extends [infer Head, ...infer Tail]
    ? Args<this> extends infer Args
      ? Call<
          $FoldRight<
            $Callback,
            Call<
              $Callback,
              {
                curr: Head;
                agg: Inital;
                arr: TArray extends [] ? Args : TArray;
              }
            >,
            TArray extends [] ? Args : TArray
          >,
          Tail
        >
      : never
    : Inital;
}
export interface $FoldLeft<
  $Callback extends Lambda<FoldCallbackArgs>,
  Inital extends unknown,
  TArray extends unknown[] = [],
> extends Lambda {
  return: Args<this> extends [...infer Init, infer Last]
    ? Args<this> extends infer Args
      ? Call<
          $FoldRight<
            $Callback,
            Call<
              $Callback,
              {
                curr: Last;
                agg: Inital;
                arr: TArray extends [] ? Args : TArray;
              }
            >,
            TArray extends [] ? Args : TArray
          >,
          Init
        >
      : never
    : Inital;
}

// export type TokenizeParenthensis<
//   T extends string,
//   Splitted extends unknown[] = SplitParenthensisInput<T>,
//   Stack extends unknown[][] = [[]],
//   Result extends unknown[] = [],
//   Counter extends unknown[] = [],
// > = Splitted extends [infer Head, ...infer Tail]
//   ? Head extends "{"
//     ? TokenizeParenthensis<
//         T,
//         Tail,
//         Push<
//           Push<
//             Init<Stack>,
//             Push<
//               Init<LastExt<Stack, unknown[]>>,
//               Join<
//                 [
//                   `UNIQUE${Length<Counter>}`,
//                   LastExt<LastExt<Stack, unknown[]>, string>,
//                 ],
//                 "||"
//               >
//             >
//           >,
//           [`UNIQUE${Length<Counter>}`]
//         >,
//         Result,
//         Increment<Counter>
//       >
//     : Head extends "}"
//     ? TokenizeParenthensis<
//         T,
//         Tail,
//         Init<Stack>,
//         Push<Result, Join<LastExt<Stack, string[]>, "%">>,
//         Increment<Counter>
//       >
//     : TokenizeParenthensis<
//         T,
//         Tail,
//         Push<Init<Stack>, Push<LastExt<Stack, string[]>, Head>>,
//         Result,
//         Counter
//       >
//   : [...Map<Stack, $Join<"%">>, ...Result];
