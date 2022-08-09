import { $ZipWith, Pair } from "./ts-array-utils";
import { Args, Call, Compose, Lambda } from "./ts-lambda";
import { Empty } from "./ts-string-constants";

export type Binary = boolean[];
export type BinaryPair = { 0: boolean; 1: boolean };

export type ToString<B extends boolean> = B extends true ? "1" : "0";
export type ShowBinary<B extends Binary> = B extends [infer Head, ...infer Tail]
  ? `${Head extends boolean ? ToString<Head> : Empty}${Tail extends Binary
      ? ShowBinary<Tail>
      : Empty}`
  : Empty;

export interface $IsTrue extends Lambda<boolean> {
  return: Args<this> extends true ? true : false;
}
export interface $IsFalse extends Lambda<boolean> {
  return: Args<this> extends false ? true : false;
}
export interface $Not extends Lambda<boolean> {
  return: Args<this> extends true ? false : true;
}

export interface $And extends Lambda<BinaryPair> {
  return: true extends Args<this>[0] & Args<this>[1] ? true : false;
}
export interface $Or extends Lambda<BinaryPair> {
  return: true extends Args<this>[0] | Args<this>[1] ? true : false;
}

export interface $XOr extends Lambda<BinaryPair> {
  return: Call<$And, [Call<$Or, Args<this>>, Call<$NAnd, Args<this>>]>;
}

export type $CompareBinary<
  A0 extends Binary,
  B0 extends Binary,
  $Compare extends Lambda<Pair>,
> = $ZipWith<A0, B0, $Compare>;

export type $NAnd = Compose<$Not, $And>;
export type $NOr = Compose<$Not, $Or>;
export type $NXor = Compose<$Not, $XOr>;

export type $NegateBin<T extends Binary> = Map<T, $Not>;

// type Bin1 = [true, true, false, false];
// type Bin2 = [true, false, true, false];

// type TestAnd = $CompareBinary<Bin1, Bin2, $And>;
// type TestNAnd = $CompareBinary<Bin1, Bin2, $NAnd>;
// type TestOr = $CompareBinary<Bin1, Bin2, $Or>;
// type TestXOr = $CompareBinary<Bin1, Bin2, $XOr>;
// type TestNOr = $CompareBinary<Bin1, Bin2, $NOr>;
// type TestNXor = $CompareBinary<Bin1, Bin2, $NXor>;
