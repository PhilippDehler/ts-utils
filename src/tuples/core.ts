import { Core } from "../core/functions";
import { Helper } from "../helper";
import { Maths } from "../numbers";
import { Strings } from "../strings";

export declare namespace TupleCore {
  export type Map<T extends unknown[], L extends Core.Fn> = T extends [
    infer H,
    ...infer T,
  ]
    ? [Core.Apply<L, [H]>, ...Map<T, L>]
    : [];

  export type Length<T extends unknown[]> = T["length"];

  export type Tail<T extends unknown[]> = T extends [unknown, ...infer T]
    ? T
    : [];
  export type Head<T extends unknown[]> = T extends [infer H, ...unknown[]]
    ? H
    : never;
  export type Last<T extends unknown[]> = T extends [...unknown[], infer L]
    ? L
    : never;
  export type Init<T extends unknown[]> = T extends [...infer I, unknown]
    ? I
    : [];
  export type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U];
  export type Prepend<T extends unknown, U extends unknown[]> = [T, ...U];
  export type Append<T extends unknown, U extends unknown[]> = [...U, T];
  export type Reverse<T extends unknown[]> = T extends [infer H, ...infer T]
    ? [...Reverse<T>, H]
    : T;

  export type Reduce<
    T extends unknown[],
    L extends Core.Fn,
    Aggregator,
  > = T extends [infer H, ...infer Tail]
    ? Reduce<Tail, L, Core.Apply<L, [Aggregator, H]>>
    : Aggregator;

  export type ReduceRight<
    T extends unknown[],
    L extends Core.Fn,
    Aggregator,
  > = T extends [...infer Init, infer Last]
    ? ReduceRight<Init, L, Core.Apply<L, [Aggregator, Last]>>
    : Aggregator;

  // prettier-ignore
  export type Zip<
    A extends unknown[],
    B extends unknown[],
    AFallback = never,
    BFallback = never,
  > =  A extends [infer HA, ...infer TA]
        ? B extends [infer HB, ...infer TB]
          ? [[HA, HB], ...Zip<TA, TB, AFallback, BFallback>]
          : OnNever<BFallback, [], [[HA, BFallback], ...Zip<TA, [], AFallback, BFallback>]>
        : B extends [infer HB, ...infer TB]
          ? OnNever<AFallback, [], [[AFallback, HB], ...Zip<[], TB, AFallback, BFallback>]>
          : []

  // prettier-ignore
  export type ZipWith<
    A extends unknown[],
    B extends unknown[],
    L extends Core.Fn,
    AFallback = never,
    BFallback = never,
  > = 
  A extends [infer HA, ...infer TA]
  ? B extends [infer HB, ...infer TB]
    ? [Core.Apply<L,[[HA, HB]]>, ...ZipWith<TA, TB, L, AFallback, BFallback>]
    : OnNever<BFallback, [], [Core.Apply<L, [[HA, BFallback]]>, ...ZipWith<TA, [], L, AFallback, BFallback>]>
  : B extends [infer HB, ...infer TB]
    ? OnNever<AFallback, [], [Core.Apply<L, [[AFallback, HB]]>, ...ZipWith<[], TB, L, AFallback, BFallback>]>
    : []

  // prettier-ignore
  export type ZipRight<
  A extends unknown[],
  B extends unknown[],
  AFallback = never,
  BFallback = never,
> =   
A extends [...infer IA, infer LA]
? B extends [...infer IB, infer LB]
  ? [...ZipRight<IA, IB,  AFallback, BFallback>, [LA, LB]]
  : OnNever<BFallback, [], [...ZipRight<IA, [],  AFallback, BFallback>, [LA, BFallback]]>
: B extends [infer HB, ...infer TB]
  ? OnNever<AFallback, [], [...ZipRight<[], TB,  AFallback, BFallback>, [AFallback, HB]]>
  : []

  // prettier-ignore
  export type ZipWithRight<
    A extends unknown[],
    B extends unknown[],
    L extends Core.Fn,
    AFallback = never,
    BFallback = never,
  > =   
  A extends [...infer IA, infer LA]
  ? B extends [...infer IB, infer LB]
    ? [...ZipWithRight<IA, IB, L, AFallback, BFallback>, Core.Apply<L, [[LA, LB]]>,]
    : OnNever<BFallback, [], [...ZipWithRight<IA, [], L, AFallback, BFallback>, Core.Apply<L, [[LA, BFallback]]>]>
  : B extends [infer HB, ...infer TB]
    ? OnNever<AFallback, [], [...ZipWithRight<[], TB, L, AFallback, BFallback>, Core.Apply<L, [[AFallback, HB]]>]>
    : []

  type OnNever<T, If, Then> = [T] extends [never] ? If : Then;
  // prettier-ignore
  export type ZipReduce<
    A extends unknown[],
    B extends unknown[],
    L extends Core.Fn,
    Aggregator,
    AFallback = never,
    BFallback = never,
  > = A extends [infer HA, ...infer TA]
    ? B extends [infer HB, ...infer TB]
      ? ZipReduce<TA, TB, L, Core.Apply<L, [Aggregator, [HA, HB]]>, AFallback, BFallback>
      : OnNever<BFallback, Aggregator, ZipReduce<TA, [], L, Core.Apply<L, [Aggregator, [HA, BFallback]]>, AFallback, BFallback>>
    : B extends [infer HB, ...infer TB]
    ? OnNever<AFallback, Aggregator, ZipReduce<[], TB, L, Core.Apply<L, [Aggregator, [AFallback, HB]]>, AFallback, BFallback>>  
    : Aggregator;

  // prettier-ignore
  export type ZipReduceRight<
    A extends unknown[],
    B extends unknown[],
    L extends Core.Fn,
    Aggregator,
    AFallback = never,
    BFallback = never,
  > = A extends [...infer IA, infer LA]
    ? B extends [...infer IB, infer LB]
      ? ZipReduceRight<IA, IB, L, Core.Apply<L, [Aggregator, [LA, LB]]>, AFallback, BFallback>
      : OnNever<BFallback, Aggregator, ZipReduceRight<IA, [], L, Core.Apply<L, [Aggregator, [LA, BFallback]]>, AFallback, BFallback>>
    : B extends [...infer IB, infer LB]
      ? OnNever<AFallback, Aggregator, ZipReduceRight<[], IB, L, Core.Apply<L, [Aggregator, [AFallback, LB]]>, AFallback, BFallback>>
      : Aggregator;

  interface ConcatStr extends Core.Fn {
    return: this["arg0"] extends [
      infer Agg extends string,
      [infer A extends string, infer B extends string],
    ]
      ? `${Agg}${A}${B}`
      : never;
  }

  export type RotateForwards<
    T extends unknown[],
    Count extends unknown[],
  > = Count["length"] extends 0
    ? T
    : RotateForwards<[...Tail<T>, Head<T>], Tail<Count>>;

  export type RotateBackwards<
    T extends unknown[],
    Count extends unknown[],
  > = Count["length"] extends 0
    ? T
    : RotateBackwards<[Last<T>, ...Init<T>], Tail<Count>>;

  export type FlatMap<T extends unknown[], L extends Core.Fn> = T extends [
    infer Head,
    ...infer Tail,
  ]
    ? Core.Apply<L, [Head]> extends any[]
      ? [...Core.Apply<L, [Head]>, ...FlatMap<Tail, L>]
      : [Core.Apply<L, [Head]>, ...FlatMap<Tail, L>]
    : [];

  export type Filter<T extends unknown[], L extends Core.Fn> = T extends [
    infer Head,
    ...infer Tail,
  ]
    ? Core.Apply<L, [Head]> extends true
      ? [Head, ...Filter<Tail, L>]
      : Filter<Tail, L>
    : [];

  export type DropWhile<T extends unknown[], L extends Core.Fn> = T extends [
    infer Head,
    ...infer Tail,
  ]
    ? Core.Apply<L, [Head]> extends true
      ? DropWhile<Tail, L>
      : T
    : [];

  export type Drop<
    T extends unknown[],
    Count extends number,
    N extends unknown[] = [],
  > = T extends [any, ...infer Tail]
    ? N["length"] extends Count
      ? T
      : Drop<Tail, Count, [...N, 0]>
    : [];

  export type Take<
    T extends unknown[],
    Count extends number,
    Agg extends unknown[] = [],
  > = T extends [infer Head, ...infer Tail]
    ? Agg["length"] extends Count
      ? Agg
      : Take<Tail, Count, [...Agg, Head]>
    : Agg;

  export type TakeWhile<T extends unknown[], L extends Core.Fn> = T extends [
    infer Head,
    ...infer Tail,
  ]
    ? Core.Apply<L, [Head]> extends true
      ? [Head, ...TakeWhile<Tail, L>]
      : []
    : [];

  export type Includes<T extends unknown[], V extends unknown> = T extends [
    infer Head,
    ...infer Tail,
  ]
    ? [Head] extends [V]
      ? true
      : Includes<Tail, V>
    : false;

  export type Range<
    Start extends number,
    End extends number,
    IndexCount extends unknown[] = [],
    Agg extends number[] = [],
  > = IndexCount["length"] extends Start
    ? IndexCount["length"] extends End
      ? Agg
      : Range<
          [...IndexCount, 0]["length"] & number,
          End,
          [...IndexCount, 0],
          [...Agg, IndexCount["length"]]
        >
    : Range<Start, End, [...IndexCount, 0], Agg>;

  type Fill<T extends unknown[], V extends unknown> = T extends [
    any,
    ...infer Tail,
  ]
    ? [V, ...Fill<Tail, V>]
    : [];

  type CopyIntoTuple<
    T extends Maths.NumberInput,
    V extends unknown,
    Agg extends unknown[] = [],
  > = Maths.GTE<T, Agg["length"]> extends true
    ? Agg
    : CopyIntoTuple<T, V, [...Agg, V]>;
}

/// tests

type Res0 = TupleCore.Range<0, 10>;
//   ^?
type Test0 = Helper.Test<Res0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]>;
//   ^?

type Res1 = TupleCore.Range<0, 0>;
//   ^?
type Test1 = Helper.Test<Res1, []>;
//   ^?

type Res2 = TupleCore.Reduce<["a", "b"], Strings.$Concat, "">;
//   ^?
type Test2 = Helper.Test<Res2, "ab">;
//   ^?
