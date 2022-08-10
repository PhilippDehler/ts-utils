import { Map } from "../ts-array-utils";
import { Args, Lambda } from "../ts-lambda";
import { Join } from "../ts-string-utils";
import {
  eight,
  ExoticNumber,
  five,
  four,
  Negative,
  nine,
  one,
  seven,
  six,
  three,
  two,
  zero,
} from "./constants";

interface $DigitNumberTable extends Lambda {
  return: Args<this> extends keyof DigitNumberTable
    ? DigitNumberTable[Args<this>]
    : never;
}
type DigitNumberTable = {
  [one]: "1";
  [two]: "2";
  [three]: "3";
  [four]: "4";
  [five]: "5";
  [six]: "6";
  [seven]: "7";
  [eight]: "8";
  [nine]: "9";
  [zero]: "0";
};
export type SerializeNumber<T extends ExoticNumber> =
  `${T["sign"] extends Negative ? "-" : ""}${Join<
    Map<T["value"], $DigitNumberTable>,
    ""
  >}`;
