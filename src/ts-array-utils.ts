import { Hkt, HKT } from './ts-hkt';
import { Decrement, ParseTsNumber, TsNumber, Zero } from './ts-number-system';

export type Length<T> = T extends { length: infer Length } ? Length : never;

export type Flat<T> = T extends [infer Head, ...infer Tail]
    ? Head extends unknown[]
        ? Flat<[...Head, ...Tail]>
        : [Head, ...Flat<Tail>]
    : [];

export type Filter<T, TFilter> = T extends [infer Head, ...infer Tail]
    ? Head extends TFilter
        ? [Head, ...Filter<Tail, TFilter>]
        : Filter<Tail, TFilter>
    : [];

export type Remove<T, TFilter> = T extends [infer Head, ...infer Tail]
    ? Head extends TFilter
        ? Remove<Tail, TFilter>
        : [Head, ...Remove<Tail, TFilter>]
    : [];

export type Tail<T> = T extends [any, ...infer Tail] ? Tail : [];
export type Head<T> = T extends [infer Head, ...any] ? Head : never;

export type Last<T> = T extends [...any, infer Last] ? Last : never;
export type Init<T> = T extends [...infer Init, any] ? Init : [];

type DropWhile_<T, TCount extends TsNumber> = TCount extends Zero
    ? T
    : DropWhile_<Tail<T>, Decrement<TCount>>;
export type DropWhile<T, TCount extends number> = DropWhile_<T, ParseTsNumber<TCount>>;

export type Take_<T, TCount extends TsNumber> = TCount extends Zero
    ? []
    : [Head<T>, ...Take_<Tail<T>, Decrement<TCount>>];
export type Take<T, TCount extends number> = Take_<T, ParseTsNumber<TCount>>;

export type Reverse<T> = T extends [...infer Init, infer Last] ? [Last, ...Reverse<Init>] : [];

export type Zip<A0, A1> = Length<A0> extends Length<A1>
    ? {
          [key in keyof A0]: key extends keyof A1 ? [A0[key], A1[key]] : never;
      }
    : never;

export type ValuesOf<T extends Array<unknown>> = T[number];

export type Every<T, M extends HKT> = T extends []
    ? true
    : T extends [infer Head, ...infer Tail]
    ? true extends Hkt.Output<M, Head>
        ? Every<Tail, M>
        : false
    : never;

export type Some<T, M extends HKT> = T extends []
    ? false
    : T extends [infer Head, ...infer Tail]
    ? true extends Hkt.Output<M, Head>
        ? true
        : Some<Tail, M>
    : never;

export type ZipWith<A0, A1, M extends HKT> = Length<A0> extends Length<A1>
    ? {
          [key in keyof A0]: key extends keyof A1 ? Hkt.Output<M, [A0[key], A1[key]]> : never;
      }
    : never;

export type Map<T extends Array<unknown>, M extends HKT> = T extends [infer Head, ...infer Tail]
    ? [Hkt.Output<M, Head>, ...Map<Tail, M>]
    : [];

export type RangeInner<
    TStart extends number,
    TEnd extends number,
    TAgg extends Array<unknown>,
    TFillFlag extends boolean
> = TAgg extends { length: infer L }
    ? L extends TStart
        ? RangeInner<TStart, TEnd, [...TAgg, L], true>
        : L extends TEnd
        ? TAgg
        : TFillFlag extends true
        ? RangeInner<TStart, TEnd, [...TAgg, L], TFillFlag>
        : RangeInner<TStart, TEnd, [...TAgg, 'empty'], TFillFlag>
    : never;

export type Range<TStart extends number, TEnd extends number> = Remove<
    RangeInner<TStart, TEnd, [], false>,
    'empty'
>;

// type RangeTest = Range<1, 10>;

// type TestBin = [true, true, false, false];

// type TestSome = Some<TestBin, IsTrueHKT>;
// type TestSome1 = Some<[false, false], IsTrueHKT>;
// type TestEvery = Every<TestBin, IsTrueHKT>;
// type TestEvery1 = Every<[true, true], IsTrueHKT>;
// type TestMap = Map<['any', 'thing', true], IsTrueHKT>;
// type TestRemove = Remove<['', 'a', Empty, Empty], Empty>;
// type TestTail = Tail<['d', 'd', 'E', 'd', 'd', 'd']>;
// type TestHead = Head<['d', 'd', 'E', 'd', 'd', 'd']>;
// type TestInit = Init<['d', 'd', 'E', 'd', 'd', 'd']>;
// type TestLast = Last<['d', 'd', 'E', 'd', 'd', 'd']>;

// type TestReverse = Reverse<['s', 'v', 'a', 'v', 'a', 'v', 'a', 'a', 'v', 'a', 'v']>;
// type TestReverse = Zip<
//     ['s', 'v', 'a', 'v', 'a', 'v', 'a', 'a', 'v', 'a', 'v', 'X'],
//     ['s', 'v', 'a', 'v', 'a', 'v', 'a', 'a', 'v', 'a', 'v', 's']
// >;
// type TestDropWile = DropWhile<['a', 'v', 'a', 'v', 'a', 'v', 'a', 'a', 'v', 'a', 'v'], 10>;
// type TestTake = Take<['a', 'v', 'a', 'v', 'a', 'v', 'a', 'a', 'v', 'a', 'v'], 2>;
