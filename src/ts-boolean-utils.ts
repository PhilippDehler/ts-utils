import { Map, Zip } from './ts-array-utils';
import { Hkt, HKT } from './ts-hkt';
import { Empty } from './ts-string-constants';

export type Binary = boolean[];
export type BinaryTuple = { 0: boolean; 1: boolean };

export type ToString<B extends boolean> = B extends true ? '1' : '0';
export type ShowBinary<B extends Binary> = B extends [infer Head, ...infer Tail]
    ? `${Head extends boolean ? ToString<Head> : Empty}${Tail extends Binary
          ? ShowBinary<Tail>
          : Empty}`
    : Empty;

export type IsTrue<T> = T extends true ? true : false;
export type IsFalse<T> = NOT<IsTrue<T>>;
export interface IsTrueHKT extends HKT<unknown, IsTrue<any>> {
    [Hkt.output]: IsTrue<Hkt.Input<this>>;
}
export interface IsFalseHKT extends HKT<unknown, IsFalse<any>> {
    [Hkt.output]: IsFalse<Hkt.Input<this>>;
}

export type CompareBinaryFn<T, Monad extends HKT> = T extends [infer Head, ...infer Tail]
    ? Head extends BinaryTuple
        ? [Hkt.Output<Monad, Head>, ...CompareBinaryFn<Tail, Monad>]
        : []
    : [];

export type AND<T0, T1> = true extends T0 & T1 ? true : false;
export type ANDTup<T> = T extends BinaryTuple ? AND<T[0], T[1]> : never;
export interface ANDHKT extends HKT<BinaryTuple, ANDTup<any>> {
    [Hkt.output]: ANDTup<Hkt.Input<this>>;
}
export type ANDBin<T0 extends BinaryTuple[]> = CompareBinaryFn<T0, ANDHKT>;

export type NOT<T> = T extends true ? false : true;
export interface NOTHKT extends HKT<boolean, NOT<any>> {
    [Hkt.output]: NOT<Hkt.Input<this>>;
}
export type NegateBin<T extends Binary> = Map<T, NOTHKT>;

export type NAND<T0, T1> = NOT<AND<T0, T1>>;
export type NANDTup<T> = T extends BinaryTuple ? NOT<ANDTup<T>> : never;
export interface NANDHKT extends HKT<BinaryTuple, NANDTup<any>> {
    [Hkt.output]: NANDTup<Hkt.Input<this>>;
}
export type NANDBin<T0 extends BinaryTuple[]> = CompareBinaryFn<T0, NANDHKT>;

export type OR<T0, T1> = true extends T0 | T1 ? true : false;
export type ORTup<T> = T extends BinaryTuple ? OR<T[0], T[1]> : never;
export interface ORHKT extends HKT<BinaryTuple, ORTup<any>> {
    [Hkt.output]: ORTup<Hkt.Input<this>>;
}
export type ORBin<T0 extends BinaryTuple[]> = CompareBinaryFn<T0, ORHKT>;

export type XOR<T0, T1> = AND<NAND<T0, T1>, OR<T0, T1>>;
export type XORTup<T> = T extends BinaryTuple ? AND<NAND<T[0], T[1]>, OR<T[0], T[1]>> : never;
export interface XORHKT extends HKT<BinaryTuple, XORTup<any>> {
    [Hkt.output]: XORTup<Hkt.Input<this>>;
}
export type XORBin<T0 extends BinaryTuple[]> = CompareBinaryFn<T0, XORHKT>;

export type NOR<T0, T1> = NOT<OR<T0, T1>>;
export type NORTup<T> = T extends BinaryTuple ? NOT<ORTup<T>> : never;
export interface NORHKT extends HKT<BinaryTuple, NORTup<any>> {
    [Hkt.output]: NORTup<Hkt.Input<this>>;
}
export type NORBin<T0 extends BinaryTuple[]> = CompareBinaryFn<T0, NORHKT>;

export type XNOR<T0, T1> = NOT<XOR<T0, T1>>;
export type XNORTup<T> = T extends BinaryTuple ? NOT<XORTup<T>> : never;
export interface XNORHKT extends HKT<BinaryTuple, XNORTup<any>> {
    [Hkt.output]: XNORTup<Hkt.Input<this>>;
}
export type XNORBin<T0 extends BinaryTuple[]> = CompareBinaryFn<T0, XNORHKT>;

// type TestXNOR = XNOR<false, false>;

type TestAND = ShowBinary<ANDBin<Zip<Bin1, Bin2>>>;
type TestNAND = ShowBinary<NANDBin<Zip<Bin1, Bin2>>>;
type TestOR = ShowBinary<ORBin<Zip<Bin1, Bin2>>>;
type TestNOR = ShowBinary<NORBin<Zip<Bin1, Bin2>>>;
type TestXOR = ShowBinary<XORBin<Zip<Bin1, Bin2>>>;
type TestXNOR = ShowBinary<XNORBin<Zip<Bin1, Bin2>>>;
type TestNegate = ShowBinary<NegateBin<Bin1>>;
type Bin1 = [true, true, false, false];
type Bin2 = [true, false, true, false];
