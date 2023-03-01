import { Helper } from "../helper";

// stolen from https://github.com/gvergnaud/hotscript
export declare namespace Core {
  export const lambda: unique symbol;

  type OnNever<A, If, Then> = [A] extends [never] ? If : Then;

  const rawArgs: unique symbol;
  const fn: unique symbol;
  // prettier-ignore
  export interface Fn {
    [rawArgs]: unknown;
    args: this[typeof rawArgs] extends infer args extends unknown[] ? args : never;
    arg0: this[typeof rawArgs] extends [infer arg, ...any] ? arg : never;
    arg1: this[typeof rawArgs] extends [any, infer arg, ...any] ? arg : never;
    arg2: this[typeof rawArgs] extends [any, any, infer arg, ...any] ? arg : never;
    arg3: this[typeof rawArgs] extends [any, any, any, infer arg, ...any] ? arg : never;
    return: unknown;
  }

  /**
   * A placeholder type that can be used to indicate that a parameter is not set.
   */
  export type unset = "@unset";

  /**
   * A placeholder type that can be used to indicate that a parameter is to partially applied.
   */
  export type _ = "@placeholder";

  export interface arg<Index extends number, Constraint = unknown> extends Fn {
    return: this["args"][Index] extends infer arg extends Constraint
      ? arg
      : never;
  }

  export interface args<Constraint extends unknown[] = unknown[]> extends Fn {
    return: this["args"] extends infer args extends Constraint ? args : never;
  }

  export type arg0<Constraint = unknown> = arg<0, Constraint>;
  export type arg1<Constraint = unknown> = arg<1, Constraint>;
  export type arg2<Constraint = unknown> = arg<2, Constraint>;
  export type arg3<Constraint = unknown> = arg<3, Constraint>;

  export type Apply<fn extends Fn, args extends unknown[]> = (fn & {
    [rawArgs]: args;
  })["return"];

  export type Call<fn extends Fn, arg1> = (fn & {
    [rawArgs]: [arg1];
  })["return"];
  export type Eval<fn extends Fn> = (fn & {
    [rawArgs]: [];
  })["return"];

  export type Call2<fn extends Fn, arg1, arg2> = (fn & {
    [rawArgs]: [arg1, arg2];
  })["return"];
  export type Call3<fn extends Fn, arg1, arg2, arg3> = (fn & {
    [rawArgs]: [arg1, arg2, arg3];
  })["return"];
  export type Call4<fn extends Fn, arg1, arg2, arg3, arg4> = (fn & {
    [rawArgs]: [arg1, arg2, arg3, arg4];
  })["return"];
  export type Call5<fn extends Fn, arg1, arg2, arg3, arg4, arg5> = (fn & {
    args: [arg1, arg2, arg3, arg4, arg5];
  })["return"];

  export type Pipe<acc, xs extends Fn[]> = xs extends [
    infer first extends Fn,
    ...infer rest extends Fn[],
  ]
    ? Pipe<Call<first, acc>, rest>
    : acc;

  export type PipeRight<xs extends Fn[], acc> = xs extends [
    ...infer rest extends Fn[],
    infer last extends Fn,
  ]
    ? PipeRight<rest, Call<last, acc>>
    : acc;

  export interface Identity extends Fn {
    return: this["arg0"];
  }

  export interface Constant<T> extends Fn {
    return: T;
  }
  export interface Compose<fns extends Fn[]> extends Fn {
    return: ComposeImpl<fns, this["args"]>;
  }

  type ComposeImpl<fns extends Fn[], args extends any[]> = fns extends [
    ...infer rest extends Fn[],
    infer last extends Fn,
  ]
    ? ComposeImpl<rest, [Apply<last, args>]>
    : Helper.Head<args>;
  export interface ComposeLeft<fns extends Fn[]> extends Fn {
    return: ComposeLeftImpl<fns, this["args"]>;
  }

  type ComposeLeftImpl<fns extends Fn[], args extends any[]> = fns extends [
    infer first extends Fn,
    ...infer rest extends Fn[],
  ]
    ? ComposeLeftImpl<rest, [Apply<first, args>]>
    : Helper.Head<args>;

  export interface PartialApply<fn extends Fn, partialArgs extends unknown[]>
    extends Fn {
    return: MergeArgs<
      this["args"],
      partialArgs
    > extends infer args extends unknown[]
      ? Apply<fn, args>
      : never;
  }

  export type IsNever<T> = [T] extends [never] ? true : false;

  type ExcludePlaceholders<xs, output extends any[] = []> = xs extends [
    infer first,
    ...infer rest,
  ]
    ? first extends _
      ? ExcludePlaceholders<rest, output>
      : ExcludePlaceholders<rest, [...output, first]>
    : output;

  type MergeArgsRec<
    pipedArgs extends any[],
    partialArgs extends any[],
    output extends any[] = [],
  > = partialArgs extends [infer partialFirst, ...infer partialRest]
    ? IsNever<partialFirst> extends true
      ? MergeArgsRec<pipedArgs, partialRest, [...output, partialFirst]>
      : [partialFirst] extends [_]
      ? pipedArgs extends [infer pipedFirst, ...infer pipedRest]
        ? MergeArgsRec<pipedRest, partialRest, [...output, pipedFirst]>
        : [...output, ...ExcludePlaceholders<partialRest>]
      : MergeArgsRec<pipedArgs, partialRest, [...output, partialFirst]>
    : [...output, ...pipedArgs];

  type EmptyIntoPlaceholder<x> = IsNever<x> extends true
    ? never
    : [x] extends [unset]
    ? _
    : x;

  type MapEmptyIntoPlaceholder<xs, output extends any[] = []> = xs extends [
    infer first,
    ...infer rest,
  ]
    ? MapEmptyIntoPlaceholder<rest, [...output, EmptyIntoPlaceholder<first>]>
    : output;

  export type MergeArgs<
    Args extends any[],
    PartialArgs extends any[],
  > = MergeArgsRec<Args, MapEmptyIntoPlaceholder<PartialArgs>>;
}
