import { FoldLeft, Pair, ZipSoft } from "../ts-array-utils";
import { Args, Lambda } from "../ts-lambda";
import { One, Zero } from "../ts-number-system/constants";
import { Bit, BitAddTable, ByteArray } from "./constants";

interface $Add extends Lambda<[currentValue: Pair, aggregator: Pair]> {
  return: Args<this> extends [
    currentValue: Pair<Bit, Bit>,
    aggregator: Pair<ByteArray, Bit>,
  ]
    ? [
        [Add<Args<this>[0], Args<this>[1][1]>[0], ...Args<this>[1][0]],
        Add<Args<this>[0], Args<this>[1][1]>[1],
      ]
    : never;
}
type ResolveAdd<A extends Pair<ByteArray, Bit>> = [
  ...(A[1] extends Zero ? [] : [One]),
  ...A[0],
];
type Add<
  CurrentValue extends Pair<Bit, Bit>,
  Remainder extends Bit,
> = BitAddTable<CurrentValue[0], CurrentValue[1], Remainder>;

export type Adder<A extends ByteArray, B extends ByteArray> = ResolveAdd<
  FoldLeft<ZipSoft<A, B, Zero>, $Add, [[], Zero]>
>;

interface $BitSum extends Lambda<[currentValue: unknown, aggregator: unknown]> {
  return: Args<this> extends [currentValue: ByteArray, aggregator: ByteArray]
    ? Adder<Args<this>[0], Args<this>[1]>
    : never;
}
export type BitSum<A extends ByteArray[]> = FoldLeft<A, $BitSum, [Zero]>;

export type BitIncrement<A extends ByteArray> = Adder<A, [One]>;
// type Y = Adder<[One, Zero], []>;
// type X = BitSum<[[One], [One]]>;
