import { Decrement, ParseTsNumber, TsNumber, Zero } from './ts-number-system';

export type Length<T> = T extends { length: infer Length } ? Length : never;

export type Flat<T> = T extends [infer Head, ...infer Tail]
    ? Head extends Array<unknown>
        ? Flat<[...Head, ...Tail]>
        : [Head, ...Flat<Tail>]
    : [];

export type Filter<T, TFilter> = T extends [infer Head, ...infer Tail]
    ? Head extends TFilter
        ? [Head, ...Filter<Tail, TFilter>]
        : Filter<Tail, TFilter>
    : [];

// type TestFilter = Filter<['', 'a', Empty, Empty], Empty>;

export type Remove<T, TFilter> = T extends [infer Head, ...infer Tail]
    ? Head extends TFilter
        ? Remove<Tail, TFilter>
        : [Head, ...Remove<Tail, TFilter>]
    : [];
// type TestRemove = Remove<['', 'a', Empty, Empty], Empty>;

export type Tail<T> = T extends [any, ...infer Tail] ? Tail : [];
export type Head<T> = T extends [infer Head, ...any] ? Head : never;

export type Last<T> = T extends [...any, infer Last] ? Last : never;
export type Init<T> = T extends [...infer Init, any] ? Init : [];

// type TestTail = Tail<['d', 'd', 'E', 'd', 'd', 'd']>;
// type TestHead = Head<['d', 'd', 'E', 'd', 'd', 'd']>;
// type TestInit = Init<['d', 'd', 'E', 'd', 'd', 'd']>;
// type TestLast = Last<['d', 'd', 'E', 'd', 'd', 'd']>;

type DropWhile_<T, TCount extends TsNumber> = TCount extends Zero
    ? T
    : DropWhile_<Tail<T>, Decrement<TCount>>;
export type DropWhile<T, TCount extends number> = DropWhile_<T, ParseTsNumber<TCount>>;

export type Take_<T, TCount extends TsNumber> = TCount extends Zero
    ? []
    : [Head<T>, ...Take_<Tail<T>, Decrement<TCount>>];
export type Take<T, TCount extends number> = Take_<T, ParseTsNumber<TCount>>;

// type TestDropWile = DropWhile<['a', 'v', 'a', 'v', 'a', 'v', 'a', 'a', 'v', 'a', 'v'], 10>;
// type TestTake = Take<['a', 'v', 'a', 'v', 'a', 'v', 'a', 'a', 'v', 'a', 'v'], 2>;
