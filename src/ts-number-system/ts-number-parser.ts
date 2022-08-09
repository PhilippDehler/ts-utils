import { Args, Lambda } from "../ts-lambda";
import { SplitEmpty } from "../ts-string-utils";
import {
  eight,
  five,
  four,
  Negative,
  nine,
  one,
  Positive,
  seven,
  six,
  three,
  two,
  zero,
} from "./constants";

export type NumberDigitTable = {
  "1": typeof one;
  "2": typeof two;
  "3": typeof three;
  "4": typeof four;
  "5": typeof five;
  "6": typeof six;
  "7": typeof seven;
  "8": typeof eight;
  "9": typeof nine;
  "0": typeof zero;
};
interface $NumberDigitTable extends Lambda {
  return: Args<this> extends keyof NumberDigitTable
    ? NumberDigitTable[Args<this>]
    : never;
}

export type ParseNumber<T extends string> = T extends `-${infer Number}`
  ? { value: Map<SplitEmpty<Number>, $NumberDigitTable>; sign: Negative }
  : { value: Map<SplitEmpty<T>, $NumberDigitTable>; sign: Positive };
