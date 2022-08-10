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
  A extends Lambda<ForceWidening<Return<B>>>,
  B extends Lambda<any, Args<A>>,
  I extends Args<B> = Args<B>,
> extends Lambda {
  args: I;
  return: Call<A, Call<B, Args<this>>>;
}

export interface EmptyLambda extends Lambda {}
/**
 * Gets return type value from a Lambda type function
 */
export type Call<M extends Lambda, T> = (M & { args: T })["return"];
/**
 * Extracts the argument from a lambda function
 */
export type Args<M extends Lambda> = M["args"];

export type Return<M extends Lambda> = M["return"];

export type ForceWidening<T> = T extends string
  ? string
  : never | T extends number
  ? number
  : never | T extends bigint
  ? bigint
  : never | T extends boolean
  ? boolean
  : never | T extends any[]
  ? T extends [infer Head, ...infer Tail]
    ? [ForceWidening<Head>, ...ForceWidening<Tail>]
    : []
  :
      | never
      | {
          [K in keyof T]: T[K] extends Function ? T[K] : ForceWidening<T[K]>;
        };

export type Primitve = string | number | bigint | boolean | null | undefined;

interface $Cache<$CachedFn extends Lambda, TChacheAgg extends unknown = {}>
  extends Lambda<{ key: unknown; value: unknown }> {
  cache: TChacheAgg;
  return: Args<this>["key"] extends keyof this["cache"]
    ? this["cache"][Args<this>["key"]]
    : Args<this>["key"] extends string
    ? $Cache<
        $CachedFn,
        TChacheAgg & {
          [K in Args<this>["key"]]: Call<$CachedFn, Args<this>["value"]>;
        }
      >
    : never;
}
//sounds good doesn't work
type GetCache<TCache extends $Cache<Lambda>> = TCache["cache"];
