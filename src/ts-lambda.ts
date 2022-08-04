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

/**
 * Gets return type value from a Lambda type function
 */
export type Call<M extends Lambda, T> = (M & { args: T })["return"];
/**
 * Extracts the argument from a lambda function
 */
export type Args<M extends Lambda> = M["args"];

export type Return<M extends Lambda> = M["return"];
