import { Pair, ZipSoft } from "../ts-array-utils";
import { GT, LT, SAME, Zero } from "../ts-number-system/constants";
import { BitCompareTable } from "../ts-number-system/tables";
import { Bit, ByteArray } from "./constants";

export type Compare<A extends ByteArray, B extends ByteArray> = CompareSameSize<
  ZipSoft<A, B, Zero>
>;

type CompareSameSize<A extends Pair<Bit, Bit>[]> = A extends [
  infer P extends Pair<Bit, Bit>,
  ...infer RestP extends Pair<Bit, Bit>[],
]
  ? BitCompareTable[P[0]][P[1]] extends SAME
    ? CompareSameSize<RestP>
    : BitCompareTable[P[0]][P[1]]
  : SAME;

export type GTEComparision<
  A extends ByteArray,
  B extends ByteArray,
  Compared extends LT | GT | SAME = Compare<A, B>,
> = Compared extends GT | SAME ? true : false;

export type LTEComparision<
  A extends ByteArray,
  B extends ByteArray,
  Compared extends LT | GT | SAME = Compare<A, B>,
> = Compared extends LT | SAME ? true : false;
