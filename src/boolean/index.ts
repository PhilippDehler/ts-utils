import { Core } from "../core/functions";

export declare namespace Booleans {
  type NOT<T extends boolean> = T extends true ? false : true;

  interface NOTFn extends Core.Fn {
    return: NOT<this["arg0"]>;
  }

  type $NOT<T extends boolean | Core.unset = Core.unset> = Core.PartialApply<
    NOTFn,
    [T]
  >;
  type AND<A extends boolean, B extends boolean> = A extends true ? B : false;

  interface ANDFn extends Core.Fn {
    return: AND<this["arg0"], this["arg1"]>;
  }

  type $AND<
    A extends boolean | Core.unset = Core.unset,
    B extends boolean | Core.unset = Core.unset,
  > = Core.PartialApply<ANDFn, [A, B]>;

  type OR<A extends boolean, B extends boolean> = A extends true ? true : B;

  interface ORFn extends Core.Fn {
    return: OR<this["arg0"], this["arg1"]>;
  }

  type $OR<
    A extends boolean | Core.unset = Core.unset,
    B extends boolean | Core.unset = Core.unset,
  > = Core.PartialApply<ORFn, [A, B]>;

  type XOR<A extends boolean, B extends boolean> = A extends true ? NOT<B> : B;

  interface XORFn extends Core.Fn {
    return: XOR<this["arg0"], this["arg1"]>;
  }

  type $XOR<
    A extends boolean | Core.unset = Core.unset,
    B extends boolean | Core.unset = Core.unset,
  > = Core.PartialApply<XORFn, [A, B]>;

  type XNOR<A extends boolean, B extends boolean> = NOT<XOR<A, B>>;
  interface XNORFn extends Core.Fn {
    return: XNOR<this["arg0"], this["arg1"]>;
  }

  type $XNOR<
    A extends boolean | Core.unset = Core.unset,
    B extends boolean | Core.unset = Core.unset,
  > = Core.PartialApply<XNORFn, [A, B]>;

  type NAND<A extends boolean, B extends boolean> = NOT<AND<A, B>>;
  interface NANDFn extends Core.Fn {
    return: NAND<this["arg0"], this["arg1"]>;
  }

  type $NAND<
    A extends boolean | Core.unset = Core.unset,
    B extends boolean | Core.unset = Core.unset,
  > = Core.PartialApply<NANDFn, [A, B]>;

  type NOR<A extends boolean, B extends boolean> = NOT<OR<A, B>>;
  interface NORFn extends Core.Fn {
    return: NOR<this["arg0"], this["arg1"]>;
  }

  type $NOR<
    A extends boolean | Core.unset = Core.unset,
    B extends boolean | Core.unset = Core.unset,
  > = Core.PartialApply<NORFn, [A, B]>;

  type If<Condition extends boolean, Then, Else> = Condition extends true
    ? Then
    : Else;

  interface IfFn extends Core.Fn {
    return: If<this["arg0"], this["arg1"], this["arg2"]>;
  }

  type $If<
    Condition extends Core.Fn | Core.unset = Core.unset,
    Then = Core.unset,
    Else = Core.unset,
  > = Core.PartialApply<IfFn, [Condition, Then, Else]>;
}
