import { Empty } from './ts-string-constants';

export type ToString<B extends boolean> = B extends true ? '1' : '0';
export type Binary = boolean[];
export type BinaryTup = { 0: boolean; 1: boolean };

export type ShowBinary<B extends Binary> = B extends [infer Head, ...infer Tail]
    ? `${Head extends boolean ? ToString<Head> : Empty}${Tail extends Binary
          ? ShowBinary<Tail>
          : Empty}`
    : Empty;

export type NOT<T> = T extends true ? false : true;
export type NOTBin<T extends Binary> = T extends [infer Head, infer Tail]
    ? Head extends true
        ? Tail extends Binary
            ? [false, ...NOTBin<Tail>]
            : [false]
        : Tail extends Binary
        ? [true, ...NOTBin<Tail>]
        : true
    : [];

export type AND<T0, T1> = true extends T0 & T1 ? true : false;
export type ANDTup<T extends BinaryTup> = AND<T[0], T[1]>;

export type ANDBin<T0 extends BinaryTup[]> = T0 extends [infer Head, ...infer Tail]
    ? Head extends BinaryTup
        ? [ANDTup<Head>, ...(Tail extends BinaryTup[] ? ANDBin<Tail> : [])]
        : []
    : [];

export type NAND<T0, T1> = NOT<AND<T0, T1>>;
export type NANDTup<T extends BinaryTup> = NOT<ANDTup<T>>;
export type NANDBin<T0 extends BinaryTup[]> = NOTBin<ANDBin<T0>>;

export type OR<T0, T1> = true extends T0 | T1 ? true : false;
export type ORTup<T extends BinaryTup> = OR<T[0], T[1]>;
export type ORBin<T0 extends BinaryTup[]> = T0 extends [infer Head, ...infer Tail]
    ? Head extends BinaryTup
        ? [ORTup<Head>, ...(Tail extends BinaryTup[] ? ORBin<Tail> : [])]
        : []
    : [];

export type NOR<T0, T1> = NOT<OR<T0, T1>>;
export type NORTup<T extends BinaryTup> = NOT<ORTup<T>>;
export type NORBin<T0 extends BinaryTup[]> = NOTBin<ORBin<T0>>;

export type XOR<T0, T1> = AND<NAND<T0, T1>, OR<T0, T1>>;
export type XORTup<T extends BinaryTup> = AND<NAND<T[0], T[1]>, OR<T[0], T[1]>>;

export type XNOR<T0, T1> = NOT<XOR<T0, T1>>;
export type XNORTup<T extends BinaryTup> = NOT<XORTup<T>>;
export type XNORBin<T0 extends BinaryTup[]> = NOTBin<XORBin<T0>>;

export type INT8 = [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean];

// type TestXNOR = XNOR<false, false>;
// type Bin1 = [true, true, false, false];
// type Bin2 = [true, false, true, false];
// type TestAND = ShowBinary<ANDBin<Zip<Bin1, Bin2>>>;
// type TestNAND = ShowBinary<NANDBin<Zip<Bin1, Bin2>>>;
// type TestOR = ShowBinary<ORBin<Zip<Bin1, Bin2>>>;
// type TestNOR = ShowBinary<NORBin<Zip<Bin1, Bin2>>>;
// type TestXOR = ShowBinary<XORBin<Zip<Bin1, Bin2>>>;
// type TestXNOR = ShowBinary<XNORBin<Zip<Bin1, Bin2>>>;

export type XORBin<T0 extends BinaryTup[]> = T0 extends [infer Head, ...infer Tail]
    ? Head extends BinaryTup
        ? [XORTup<Head>, ...(Tail extends BinaryTup[] ? XORBin<Tail> : [])]
        : []
    : [];
