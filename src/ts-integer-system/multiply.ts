import { Map } from "../ts-array-utils";
import { Args, Lambda } from "../ts-lambda";
import { One, Zero } from "../ts-number-system/constants";
import { BitSum } from "./add";
import { Bit, BitMultiplikationTable, ByteArray } from "./constants";

interface $Multiplikation<B extends Bit> extends Lambda<Bit> {
  return: Args<this> extends Bit
    ? BitMultiplikationTable<Args<this>, B>
    : never;
}

type Multiplikation<
  A extends ByteArray,
  B extends ByteArray,
  TAgg extends ByteArray[] = [],
  TrailingZeros extends Zero[] = [],
> = B extends [...infer Init extends ByteArray, infer Last extends Bit]
  ? Multiplikation<
      A,
      Init,
      [[...MultiplySingleBit<A, Last>, ...TrailingZeros], ...TAgg],
      [...TrailingZeros, Zero]
    >
  : TAgg;

type Multiplier<A extends ByteArray, B extends ByteArray> = BitSum<
  Multiplikation<A, B>
>;

type X = Multiplier<[One, Zero], [One, Zero]>;

type MultiplySingleBit<A extends ByteArray, B extends Bit> = Map<
  A,
  $Multiplikation<B>
>;
type Y = Multiplikation<[One, Zero], [One, Zero]>;
