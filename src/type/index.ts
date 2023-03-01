import { Core } from "../core/functions";

export declare namespace Types {
  export type Maybe<T> = T | undefined | null;
  export type Nullable<T> = T | null;

  export type Extends<T, Constraint> = T extends Constraint ? true : false;
  interface ExtendsFn extends Core.Fn {
    return: Extends<this["arg0"], this["arg1"]>;
  }

  export type $Extends<
    Constraint extends unknown | Core.unset = Core.unset,
    T extends unknown | Core.unset = Core.unset,
  > = Core.PartialApply<ExtendsFn, [T, Constraint]>;
  type Cast<T, Constraint> = T extends Constraint ? T : never;

  interface CastFn extends Core.Fn {
    return: Cast<this["arg0"], this["arg1"]>;
  }

  export type $Cast<
    Constraint extends unknown | Core.unset = Core.unset,
    T extends unknown | Core.unset = Core.unset,
  > = Core.PartialApply<CastFn, [T, Constraint]>;
}
