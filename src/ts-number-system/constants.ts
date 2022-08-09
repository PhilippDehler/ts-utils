export declare const one: unique symbol;
export declare const two: unique symbol;
export declare const three: unique symbol;
export declare const four: unique symbol;
export declare const five: unique symbol;
export declare const six: unique symbol;
export declare const seven: unique symbol;
export declare const eight: unique symbol;
export declare const nine: unique symbol;
export declare const zero: unique symbol;

export declare const same: unique symbol;
export declare const gt: unique symbol;
export declare const lt: unique symbol;

export type GT = typeof gt;
export type LT = typeof lt;
export type SAME = typeof same;

export declare const positive: unique symbol;
export declare const negative: unique symbol;
export type Negative = typeof negative;
export type Positive = typeof positive;
export type Signs = Positive | Negative;

export declare const plus: unique symbol;
export declare const minus: unique symbol;
export type Plus = typeof plus;
export type Minus = typeof minus;
export type Operations = Plus | Minus;

export type One = typeof one;
export type Two = typeof two;
export type Three = typeof three;
export type Four = typeof four;
export type Five = typeof five;
export type Six = typeof six;
export type Seven = typeof seven;
export type Eight = typeof eight;
export type Nine = typeof nine;
export type Zero = typeof zero;

export type Digit =
  | One
  | Two
  | Three
  | Four
  | Five
  | Six
  | Seven
  | Eight
  | Nine
  | Zero;

export type Number = Digit[];

export type ExoticNumber = {
  value: Number;
  sign: typeof positive | typeof negative;
};
