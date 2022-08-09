import { RemoveInit } from "../ts-array-utils";
import { Number, Zero } from "./constants";

export type RemoveLeadingZeros<T extends Number> = RemoveInit<T, Zero>;
