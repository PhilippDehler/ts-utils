import { Args, Call, Lambda, Return } from "./ts-lambda";

export type ArrayOrEmpty<T> = T[] | [];
export type ValuesOf<T extends unknown[]> = T[number];
export type Length<T extends unknown[]> = T["length"];
export type TupleKeys<T extends unknown[]> = keyof {
  [K in keyof T as T[K] extends T[number]
    ? K extends "length" | number
      ? never
      : K
    : never]: T[K];
};
export interface $Length extends Lambda<unknown[]> {
  return: Length<Args<this>>;
}
export type Flat<T extends unknown[], TAgg extends unknown[] = []> = T extends [
  infer Head,
  ...infer Tail,
]
  ? Head extends unknown[]
    ? Flat<Tail, [...TAgg, ...Head]>
    : Flat<Tail, [...TAgg, Head]>
  : TAgg;

export type Filter<
  T extends unknown[],
  TFilter extends ValuesOf<T>,
  TAgg extends unknown[] = [],
> = T extends [infer Head, ...infer Tail]
  ? Head extends TFilter
    ? Filter<Tail, TFilter, [...TAgg, Head]>
    : Filter<Tail, TFilter, TAgg>
  : TAgg;

export type Remove<
  T extends unknown[],
  TRemove extends ValuesOf<T>,
  TAgg extends unknown[] = [],
> = T extends [infer Head, ...infer Tail]
  ? Head extends TRemove
    ? Remove<Tail, TRemove, TAgg>
    : Remove<Tail, TRemove, [...TAgg, Head]>
  : TAgg;
export type RemoveInit<T extends unknown[], TRemove> = T extends [
  TRemove,
  ...infer Tail,
]
  ? RemoveInit<Tail, TRemove>
  : T;

export type Tail<T extends unknown[]> = T extends [any, ...infer Tail]
  ? Tail
  : [];
export type Head<T extends unknown[]> = T extends [infer Head, ...any]
  ? Head
  : never;
export type Last<T extends unknown[]> = T extends [...any, infer Last]
  ? Last
  : never;
export type Init<T extends unknown[]> = T extends [...infer Init, any]
  ? Init
  : [];

export type Reverse<
  T extends unknown[],
  TAgg extends unknown[] = [],
> = T extends [infer Head, ...infer Tail]
  ? Reverse<Tail, [Head, ...TAgg]>
  : TAgg;

export type Zip<
  A0 extends unknown[],
  A1 extends unknown[],
> = Length<A0> extends Length<A1>
  ? {
      [Key in keyof A0]: Key extends keyof A1 ? [A0[Key], A1[Key]] : never;
    }
  : never;

export type ZipSoft<
  A extends unknown[],
  B extends unknown[],
  Default extends unknown = unknown,
  TAgg extends Pair[] = [],
> = A extends [...infer Init0, infer Last0]
  ? B extends [...infer Init1, infer Last1]
    ? ZipSoft<Init0, Init1, Default, [[Last0, Last1], ...TAgg]>
    : ZipSoft<Init0, [], Default, [[Last0, Default], ...TAgg]>
  : B extends [...infer Init1, infer Last1]
  ? ZipSoft<[], Init1, Default, [[Default, Last1], ...TAgg]>
  : TAgg;

export type GetLager<
  A extends unknown[],
  B extends unknown[],
> = keyof A extends keyof B
  ? keyof B extends keyof A
    ? A
    : B
  : keyof B extends keyof A
  ? B
  : never;
export interface $Every<$TPredicate extends Lambda> extends Lambda<unknown[]> {
  return: Args<this> extends [infer Head, ...infer Tail]
    ? Call<$TPredicate, Head> extends true
      ? Call<$Every<$TPredicate>, Tail>
      : false
    : true;
}
export interface $Some<$TPredicate extends Lambda> extends Lambda<unknown[]> {
  return: Args<this> extends [infer Head, ...infer Tail]
    ? Call<$TPredicate, Head> extends true
      ? true
      : Call<$Some<$TPredicate>, Tail>
    : false;
}

export interface Pair<Left = unknown, Right = unknown> {
  0: Left;
  1: Right;
}

export type $ZipWith<
  A0 extends unknown[],
  A1 extends unknown[],
  TCallBack extends Lambda<Pair>,
  TZipped = Zip<A0, A1>,
> = {
  [Index in keyof TZipped]: TZipped[Index] extends Pair
    ? Call<TCallBack, TZipped[Index]>
    : never;
};

export type Map<
  TItems extends Args<$TCallback>[],
  $TCallback extends Lambda<unknown>,
  TAgg extends Return<$TCallback>[] = [],
> = TItems extends [infer Head, ...infer Tail]
  ? Map<Tail, $TCallback, [...TAgg, Call<$TCallback, Head>]>
  : TAgg;

type CreateTuple<
  T extends number,
  TAgg extends unknown[] = [],
> = Length<TAgg> extends T ? TAgg : CreateTuple<T, [...TAgg, unknown]>;

type TupleIncremet<T extends any[]> = [...T, unknown];

export type Range<
  TStart extends number,
  TEnd extends number,
  TAgg extends any[] = [],
  CurrentCount extends any[] = CreateTuple<TStart>,
> = Length<CurrentCount> extends TEnd
  ? TAgg
  : Range<
      TStart,
      TEnd,
      [...TAgg, Length<CurrentCount>],
      TupleIncremet<CurrentCount>
    >;
export type FoldRight<
  Items extends unknown[],
  $CallBackFn extends Lambda<[currentValue: unknown, aggregator: unknown]>,
  TAgg = unknown,
> = Items extends [infer Head, ...infer Tail]
  ? FoldRight<Tail, $CallBackFn, Call<$CallBackFn, [Head, TAgg]>>
  : TAgg;
export type FoldLeft<
  Items extends unknown[],
  $CallBackFn extends Lambda<[currentValue: unknown, aggregator: unknown]>,
  TAgg = unknown,
> = Items extends [...infer init, infer Last]
  ? FoldLeft<init, $CallBackFn, Call<$CallBackFn, [Last, TAgg]>>
  : TAgg;
// type RangeTest = Range<1, 1000>;
type RemoveInitTest = RemoveInit<[1, 1, 2, 3], 1>;
// type TestBin = [true, true, false, false];
// type TestBin1 = [true, true, true, true];

// type TestEvery = Call<$Every<$IsTrue>, TestBin>;
// type TestEvery1 = Call<$Every<$IsTrue>, TestBin1>;

// type TestSome = Call<$Some<$IsTrue>, TestBin>;
// type TestSome1 = Call<$Some<$IsTrue>, TestBin1>;
// type TestSome2 = Call<$Some<$IsFalse>, TestBin1>;

// type TestFilter = Filter<TestBin1, true>;
// type TestRemove = Remove<TestBin1, true>;
// type MapTest = Map<[true, false], $IsFalse>;
// type ReverseTest = Reverse<[true, false]>;

// type TestZip = Zip<
//   ["s", "v", "a", "v", "a", "v", "a", "a", "v", "a", "v", "X"],
//   ["s", "v", "a", "v", "a", "v", "a", "a", "v", "a", "v", "s"]
// >;
// type ReverseTest2 = Reverse<TestZip>;

// type TestTupleKeys = TupleKeys<TestBin>;
