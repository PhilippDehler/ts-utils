import {
  ExoticNumber,
  Multiplication,
  OneExotic,
  ZeroExotic,
} from "./constants";
import { Calculate } from "./ts-number-calculator";
import { Decrement } from "./ts-number-subtraction";

export type Power<
  A extends ExoticNumber,
  B extends ExoticNumber,
  TAgg extends ExoticNumber = B,
> = B extends ZeroExotic
  ? OneExotic
  : B extends OneExotic
  ? TAgg
  : Power<A, Decrement<B>, Calculate<A, TAgg, Multiplication>>;
