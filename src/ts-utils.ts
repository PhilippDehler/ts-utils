import { Keys } from "./ts-object-utils";

export type OmitDeep<T extends object, TKeys extends Keys<T>> = Omit<
  {
    [Key in Keys<T>]: T[Key] extends object
      ? OmitDeep<T[Key], Keys<T[Key]>>
      : T[Key];
  },
  TKeys
>;
export type PartialDeep<T extends object> = {
  [Key in Keys<T>]?: T[Key] extends object ? PartialDeep<T[Key]> : T[Key];
};

// type PartialDeepTest = PartialDeep<{ a: 's'; b: { b: 's' } }>;
// type OmitDeepTest = OmitDeep<{ a: { b: 's' }; b: { b: 's' } }, 'b'>;
export type Narrowable = string | number | bigint | boolean;
export type Narrow<A> =
  | (A extends Narrowable ? A : never)
  | (A extends [] ? [] : never)
  | {
      [K in keyof A]: A[K] extends Function ? A[K] : Narrow<A[K]>;
    };

export const throwNotImplemented = <T>(): T => {
  throw new Error("Not implemented yet!");
};

export type WidenStructure<T> = T extends string
  ? string
  : never | T extends number
  ? number
  : never | T extends bigint
  ? bigint
  : never | T extends boolean
  ? boolean
  : never | unknown extends T
  ? unknown
  : never | T extends any[]
  ? T extends [infer Head, ...infer Tail]
    ? [WidenStructure<Head>, ...WidenStructure<Tail>]
    : []
  :
      | never
      | {
          [K in keyof T]: T[K] extends Function ? T[K] : WidenStructure<T[K]>;
        };
