import { Core } from "../../core/functions";
import { Helper } from "../../helper";
import { TupleCore } from "../../tuples/core";

export declare namespace MathDefinition {
  //prettier-ignore
  type AddingTable={0:{0:{number:0;transfer:0;};1:{number:1;transfer:0;};2:{number:2;transfer:0;};3:{number:3;transfer:0;};4:{number:4;transfer:0;};5:{number:5;transfer:0;};6:{number:6;transfer:0;};7:{number:7;transfer:0;};8:{number:8;transfer:0;};9:{number:9;transfer:0;};};1:{0:{number:1;transfer:0;};1:{number:2;transfer:0;};2:{number:3;transfer:0;};3:{number:4;transfer:0;};4:{number:5;transfer:0;};5:{number:6;transfer:0;};6:{number:7;transfer:0;};7:{number:8;transfer:0;};8:{number:9;transfer:0;};9:{number:0;transfer:1;};};2:{0:{number:2;transfer:0;};1:{number:3;transfer:0;};2:{number:4;transfer:0;};3:{number:5;transfer:0;};4:{number:6;transfer:0;};5:{number:7;transfer:0;};6:{number:8;transfer:0;};7:{number:9;transfer:0;};8:{number:0;transfer:1;};9:{number:1;transfer:1;};};3:{0:{number:3;transfer:0;};1:{number:4;transfer:0;};2:{number:5;transfer:0;};3:{number:6;transfer:0;};4:{number:7;transfer:0;};5:{number:8;transfer:0;};6:{number:9;transfer:0;};7:{number:0;transfer:1;};8:{number:1;transfer:1;};9:{number:2;transfer:1;};};4:{0:{number:4;transfer:0;};1:{number:5;transfer:0;};2:{number:6;transfer:0;};3:{number:7;transfer:0;};4:{number:8;transfer:0;};5:{number:9;transfer:0;};6:{number:0;transfer:1;};7:{number:1;transfer:1;};8:{number:2;transfer:1;};9:{number:3;transfer:1;};};5:{0:{number:5;transfer:0;};1:{number:6;transfer:0;};2:{number:7;transfer:0;};3:{number:8;transfer:0;};4:{number:9;transfer:0;};5:{number:0;transfer:1;};6:{number:1;transfer:1;};7:{number:2;transfer:1;};8:{number:3;transfer:1;};9:{number:4;transfer:1;};};6:{0:{number:6;transfer:0;};1:{number:7;transfer:0;};2:{number:8;transfer:0;};3:{number:9;transfer:0;};4:{number:0;transfer:1;};5:{number:1;transfer:1;};6:{number:2;transfer:1;};7:{number:3;transfer:1;};8:{number:4;transfer:1;};9:{number:5;transfer:1;};};7:{0:{number:7;transfer:0;};1:{number:8;transfer:0;};2:{number:9;transfer:0;};3:{number:0;transfer:1;};4:{number:1;transfer:1;};5:{number:2;transfer:1;};6:{number:3;transfer:1;};7:{number:4;transfer:1;};8:{number:5;transfer:1;};9:{number:6;transfer:1;};};8:{0:{number:8;transfer:0;};1:{number:9;transfer:0;};2:{number:0;transfer:1;};3:{number:1;transfer:1;};4:{number:2;transfer:1;};5:{number:3;transfer:1;};6:{number:4;transfer:1;};7:{number:5;transfer:1;};8:{number:6;transfer:1;};9:{number:7;transfer:1;};};9:{0:{number:9;transfer:0;};1:{number:0;transfer:1;};2:{number:1;transfer:1;};3:{number:2;transfer:1;};4:{number:3;transfer:1;};5:{number:4;transfer:1;};6:{number:5;transfer:1;};7:{number:6;transfer:1;};8:{number:7;transfer:1;};9:{number:8;transfer:1;};};};
  //prettier-ignore
  type SubtractionTable={0:{0:{number:0;transfer:0;};1:{number:9;transfer:1;};2:{number:8;transfer:1;};3:{number:7;transfer:1;};4:{number:6;transfer:1;};5:{number:5;transfer:1;};6:{number:4;transfer:1;};7:{number:3;transfer:1;};8:{number:2;transfer:1;};9:{number:1;transfer:1;};};1:{0:{number:1;transfer:0;};1:{number:0;transfer:0;};2:{number:9;transfer:1;};3:{number:8;transfer:1;};4:{number:7;transfer:1;};5:{number:6;transfer:1;};6:{number:5;transfer:1;};7:{number:4;transfer:1;};8:{number:3;transfer:1;};9:{number:2;transfer:1;};};2:{0:{number:2;transfer:0;};1:{number:1;transfer:0;};2:{number:0;transfer:0;};3:{number:9;transfer:1;};4:{number:8;transfer:1;};5:{number:7;transfer:1;};6:{number:6;transfer:1;};7:{number:5;transfer:1;};8:{number:4;transfer:1;};9:{number:3;transfer:1;};};3:{0:{number:3;transfer:0;};1:{number:2;transfer:0;};2:{number:1;transfer:0;};3:{number:0;transfer:0;};4:{number:9;transfer:1;};5:{number:8;transfer:1;};6:{number:7;transfer:1;};7:{number:6;transfer:1;};8:{number:5;transfer:1;};9:{number:4;transfer:1;};};4:{0:{number:4;transfer:0;};1:{number:3;transfer:0;};2:{number:2;transfer:0;};3:{number:1;transfer:0;};4:{number:0;transfer:0;};5:{number:9;transfer:1;};6:{number:8;transfer:1;};7:{number:7;transfer:1;};8:{number:6;transfer:1;};9:{number:5;transfer:1;};};5:{0:{number:5;transfer:0;};1:{number:4;transfer:0;};2:{number:3;transfer:0;};3:{number:2;transfer:0;};4:{number:1;transfer:0;};5:{number:0;transfer:0;};6:{number:9;transfer:1;};7:{number:8;transfer:1;};8:{number:7;transfer:1;};9:{number:6;transfer:1;};};6:{0:{number:6;transfer:0;};1:{number:5;transfer:0;};2:{number:4;transfer:0;};3:{number:3;transfer:0;};4:{number:2;transfer:0;};5:{number:1;transfer:0;};6:{number:0;transfer:0;};7:{number:9;transfer:1;};8:{number:8;transfer:1;};9:{number:7;transfer:1;};};7:{0:{number:7;transfer:0;};1:{number:6;transfer:0;};2:{number:5;transfer:0;};3:{number:4;transfer:0;};4:{number:3;transfer:0;};5:{number:2;transfer:0;};6:{number:1;transfer:0;};7:{number:0;transfer:0;};8:{number:9;transfer:1;};9:{number:8;transfer:1;};};8:{0:{number:8;transfer:0;};1:{number:7;transfer:0;};2:{number:6;transfer:0;};3:{number:5;transfer:0;};4:{number:4;transfer:0;};5:{number:3;transfer:0;};6:{number:2;transfer:0;};7:{number:1;transfer:0;};8:{number:0;transfer:0;};9:{number:9;transfer:1;};};9:{0:{number:9;transfer:0;};1:{number:8;transfer:0;};2:{number:7;transfer:0;};3:{number:6;transfer:0;};4:{number:5;transfer:0;};5:{number:4;transfer:0;};6:{number:3;transfer:0;};7:{number:2;transfer:0;};8:{number:1;transfer:0;};9:{number:0;transfer:0;};};};
  //prettier-ignore
  type MultiplicationTable={0:{0:{number:0;transfer:0;};1:{number:0;transfer:0;};2:{number:0;transfer:0;};3:{number:0;transfer:0;};4:{number:0;transfer:0;};5:{number:0;transfer:0;};6:{number:0;transfer:0;};7:{number:0;transfer:0;};8:{number:0;transfer:0;};9:{number:0;transfer:0;};};1:{0:{number:0;transfer:0;};1:{number:1;transfer:0;};2:{number:2;transfer:0;};3:{number:3;transfer:0;};4:{number:4;transfer:0;};5:{number:5;transfer:0;};6:{number:6;transfer:0;};7:{number:7;transfer:0;};8:{number:8;transfer:0;};9:{number:9;transfer:0;};};2:{0:{number:0;transfer:0;};1:{number:2;transfer:0;};2:{number:4;transfer:0;};3:{number:6;transfer:0;};4:{number:8;transfer:0;};5:{number:0;transfer:1;};6:{number:2;transfer:1;};7:{number:4;transfer:1;};8:{number:6;transfer:1;};9:{number:8;transfer:1;};};3:{0:{number:0;transfer:0;};1:{number:3;transfer:0;};2:{number:6;transfer:0;};3:{number:9;transfer:0;};4:{number:2;transfer:1;};5:{number:5;transfer:1;};6:{number:8;transfer:1;};7:{number:1;transfer:2;};8:{number:4;transfer:2;};9:{number:7;transfer:2;};};4:{0:{number:0;transfer:0;};1:{number:4;transfer:0;};2:{number:8;transfer:0;};3:{number:2;transfer:1;};4:{number:6;transfer:1;};5:{number:0;transfer:2;};6:{number:4;transfer:2;};7:{number:8;transfer:2;};8:{number:2;transfer:3;};9:{number:6;transfer:3;};};5:{0:{number:0;transfer:0;};1:{number:5;transfer:0;};2:{number:0;transfer:1;};3:{number:5;transfer:1;};4:{number:0;transfer:2;};5:{number:5;transfer:2;};6:{number:0;transfer:3;};7:{number:5;transfer:3;};8:{number:0;transfer:4;};9:{number:5;transfer:4;};};6:{0:{number:0;transfer:0;};1:{number:6;transfer:0;};2:{number:2;transfer:1;};3:{number:8;transfer:1;};4:{number:4;transfer:2;};5:{number:0;transfer:3;};6:{number:6;transfer:3;};7:{number:2;transfer:4;};8:{number:8;transfer:4;};9:{number:4;transfer:5;};};7:{0:{number:0;transfer:0;};1:{number:7;transfer:0;};2:{number:4;transfer:1;};3:{number:1;transfer:2;};4:{number:8;transfer:2;};5:{number:5;transfer:3;};6:{number:2;transfer:4;};7:{number:9;transfer:4;};8:{number:6;transfer:5;};9:{number:3;transfer:6;};};8:{0:{number:0;transfer:0;};1:{number:8;transfer:0;};2:{number:6;transfer:1;};3:{number:4;transfer:2;};4:{number:2;transfer:3;};5:{number:0;transfer:4;};6:{number:8;transfer:4;};7:{number:6;transfer:5;};8:{number:4;transfer:6;};9:{number:2;transfer:7;};};9:{0:{number:0;transfer:0;};1:{number:9;transfer:0;};2:{number:8;transfer:1;};3:{number:7;transfer:2;};4:{number:6;transfer:3;};5:{number:5;transfer:4;};6:{number:4;transfer:5;};7:{number:3;transfer:6;};8:{number:2;transfer:7;};9:{number:1;transfer:8;};};};
  //prettier-ignore
  type CompareTable={0:{0:{gt:false;lt:false;eq:true;lte:true;gte:true};1:{gt:false;lt:true;eq:false;lte:true;gte:false};2:{gt:false;lt:true;eq:false;lte:true;gte:false};3:{gt:false;lt:true;eq:false;lte:true;gte:false};4:{gt:false;lt:true;eq:false;lte:true;gte:false};5:{gt:false;lt:true;eq:false;lte:true;gte:false};6:{gt:false;lt:true;eq:false;lte:true;gte:false};7:{gt:false;lt:true;eq:false;lte:true;gte:false};8:{gt:false;lt:true;eq:false;lte:true;gte:false};9:{gt:false;lt:true;eq:false;lte:true;gte:false};};1:{0:{gt:true;lt:false;eq:false;lte:false;gte:true};1:{gt:false;lt:false;eq:true;lte:true;gte:true};2:{gt:false;lt:true;eq:false;lte:true;gte:false};3:{gt:false;lt:true;eq:false;lte:true;gte:false};4:{gt:false;lt:true;eq:false;lte:true;gte:false};5:{gt:false;lt:true;eq:false;lte:true;gte:false};6:{gt:false;lt:true;eq:false;lte:true;gte:false};7:{gt:false;lt:true;eq:false;lte:true;gte:false};8:{gt:false;lt:true;eq:false;lte:true;gte:false};9:{gt:false;lt:true;eq:false;lte:true;gte:false};};2:{0:{gt:true;lt:false;eq:false;lte:false;gte:true};1:{gt:true;lt:false;eq:false;lte:false;gte:true};2:{gt:false;lt:false;eq:true;lte:true;gte:true};3:{gt:false;lt:true;eq:false;lte:true;gte:false};4:{gt:false;lt:true;eq:false;lte:true;gte:false};5:{gt:false;lt:true;eq:false;lte:true;gte:false};6:{gt:false;lt:true;eq:false;lte:true;gte:false};7:{gt:false;lt:true;eq:false;lte:true;gte:false};8:{gt:false;lt:true;eq:false;lte:true;gte:false};9:{gt:false;lt:true;eq:false;lte:true;gte:false};};3:{0:{gt:true;lt:false;eq:false;lte:false;gte:true};1:{gt:true;lt:false;eq:false;lte:false;gte:true};2:{gt:true;lt:false;eq:false;lte:false;gte:true};3:{gt:false;lt:false;eq:true;lte:true;gte:true};4:{gt:false;lt:true;eq:false;lte:true;gte:false};5:{gt:false;lt:true;eq:false;lte:true;gte:false};6:{gt:false;lt:true;eq:false;lte:true;gte:false};7:{gt:false;lt:true;eq:false;lte:true;gte:false};8:{gt:false;lt:true;eq:false;lte:true;gte:false};9:{gt:false;lt:true;eq:false;lte:true;gte:false};};4:{0:{gt:true;lt:false;eq:false;lte:false;gte:true};1:{gt:true;lt:false;eq:false;lte:false;gte:true};2:{gt:true;lt:false;eq:false;lte:false;gte:true};3:{gt:true;lt:false;eq:false;lte:false;gte:true};4:{gt:false;lt:false;eq:true;lte:true;gte:true};5:{gt:false;lt:true;eq:false;lte:true;gte:false};6:{gt:false;lt:true;eq:false;lte:true;gte:false};7:{gt:false;lt:true;eq:false;lte:true;gte:false};8:{gt:false;lt:true;eq:false;lte:true;gte:false};9:{gt:false;lt:true;eq:false;lte:true;gte:false};};5:{0:{gt:true;lt:false;eq:false;lte:false;gte:true};1:{gt:true;lt:false;eq:false;lte:false;gte:true};2:{gt:true;lt:false;eq:false;lte:false;gte:true};3:{gt:true;lt:false;eq:false;lte:false;gte:true};4:{gt:true;lt:false;eq:false;lte:false;gte:true};5:{gt:false;lt:false;eq:true;lte:true;gte:true};6:{gt:false;lt:true;eq:false;lte:true;gte:false};7:{gt:false;lt:true;eq:false;lte:true;gte:false};8:{gt:false;lt:true;eq:false;lte:true;gte:false};9:{gt:false;lt:true;eq:false;lte:true;gte:false};};6:{0:{gt:true;lt:false;eq:false;lte:false;gte:true};1:{gt:true;lt:false;eq:false;lte:false;gte:true};2:{gt:true;lt:false;eq:false;lte:false;gte:true};3:{gt:true;lt:false;eq:false;lte:false;gte:true};4:{gt:true;lt:false;eq:false;lte:false;gte:true};5:{gt:true;lt:false;eq:false;lte:false;gte:true};6:{gt:false;lt:false;eq:true;lte:true;gte:true};7:{gt:false;lt:true;eq:false;lte:true;gte:false};8:{gt:false;lt:true;eq:false;lte:true;gte:false};9:{gt:false;lt:true;eq:false;lte:true;gte:false};};7:{0:{gt:true;lt:false;eq:false;lte:false;gte:true};1:{gt:true;lt:false;eq:false;lte:false;gte:true};2:{gt:true;lt:false;eq:false;lte:false;gte:true};3:{gt:true;lt:false;eq:false;lte:false;gte:true};4:{gt:true;lt:false;eq:false;lte:false;gte:true};5:{gt:true;lt:false;eq:false;lte:false;gte:true};6:{gt:true;lt:false;eq:false;lte:false;gte:true};7:{gt:false;lt:false;eq:true;lte:true;gte:true};8:{gt:false;lt:true;eq:false;lte:true;gte:false};9:{gt:false;lt:true;eq:false;lte:true;gte:false};};8:{0:{gt:true;lt:false;eq:false;lte:false;gte:true};1:{gt:true;lt:false;eq:false;lte:false;gte:true};2:{gt:true;lt:false;eq:false;lte:false;gte:true};3:{gt:true;lt:false;eq:false;lte:false;gte:true};4:{gt:true;lt:false;eq:false;lte:false;gte:true};5:{gt:true;lt:false;eq:false;lte:false;gte:true};6:{gt:true;lt:false;eq:false;lte:false;gte:true};7:{gt:true;lt:false;eq:false;lte:false;gte:true};8:{gt:false;lt:false;eq:true;lte:true;gte:true};9:{gt:false;lt:true;eq:false;lte:true;gte:false};};9:{0:{gt:true;lt:false;eq:false;lte:false;gte:true};1:{gt:true;lt:false;eq:false;lte:false;gte:true};2:{gt:true;lt:false;eq:false;lte:false;gte:true};3:{gt:true;lt:false;eq:false;lte:false;gte:true};4:{gt:true;lt:false;eq:false;lte:false;gte:true};5:{gt:true;lt:false;eq:false;lte:false;gte:true};6:{gt:true;lt:false;eq:false;lte:false;gte:true};7:{gt:true;lt:false;eq:false;lte:false;gte:true};8:{gt:true;lt:false;eq:false;lte:false;gte:true};9:{gt:false;lt:false;eq:true;lte:true;gte:true};};};

  type COMPARE_KEY = "gt" | "lt" | "eq" | "lte" | "gte";
  type COMPARE_RESULT = { [K in COMPARE_KEY]: boolean };
  type INTERNAL_DIGIT = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | NaN | Infinity;
  type INTERNAL_NUMBER = INTERNAL_DIGIT[];

  const infinity: unique symbol;
  type Infinity = typeof infinity;

  const NaN: unique symbol;
  type NaN = typeof NaN;

  // prettier-ignore
  type NormalizeInfinity<T extends INTERNAL_NUMBER> = TupleCore.Includes<T, Infinity> extends true ? [Infinity] : T;
  interface NormalizeInfinityFn extends Core.Fn {
    return: NormalizeInfinity<this["arg0"]>;
  }
  interface $NormalizeInfinity<
    T extends INTERNAL_NUMBER | Core.unset = Core.unset,
  > extends Core.PartialApply<NormalizeInfinityFn, [T]> {}

  // prettier-ignore
  type NormalizeNaN<T extends INTERNAL_NUMBER> = TupleCore.Includes<T, NaN> extends true ? [NaN] : T;
  interface NormalizeNaNFn extends Core.Fn {
    return: NormalizeNaN<this["arg0"]>;
  }
  interface $NormalizeNaN<T extends INTERNAL_NUMBER | Core.unset = Core.unset>
    extends Core.PartialApply<NormalizeNaNFn, [T]> {}

  // prettier-ignore
  type NormalizeZero<T extends INTERNAL_NUMBER> = TupleCore.DropWhile<T,Helper.Extends<0>> extends infer Collapsed ? Collapsed extends [] ? [0] : Collapsed : T;
  interface NormalizeZeroFn extends Core.Fn {
    return: NormalizeZero<this["arg0"]>;
  }
  interface $NormalizeZero<T extends INTERNAL_NUMBER | Core.unset = Core.unset>
    extends Core.PartialApply<NormalizeZeroFn, [T]> {}

  // prettier-ignore
  type NormalizeInternalNumber<T extends INTERNAL_NUMBER> = Core.Apply<NormalizeInternalNumberFn, [T]>;

  type NormalizeInternalNumberFn = Core.ComposeLeft<
    [$NormalizeInfinity, $NormalizeNaN, $NormalizeZero]
  >;

  interface $NormalizeInternalNumber<
    T extends INTERNAL_NUMBER | Core.unset = Core.unset,
  > extends Core.PartialApply<NormalizeInternalNumberFn, [T]> {}

  type TableAccess<
    Table,
    A extends keyof Table | NaN | Infinity,
    B extends keyof Table | NaN | Infinity,
  > = A extends keyof Table
    ? B extends keyof Table[A]
      ? Table[A][B]
      : { number: B; transfer: 0 }
    : A extends NaN
    ? { number: NaN; transfer: 0 }
    : B extends NaN
    ? { number: NaN; transfer: 0 }
    : A extends Infinity
    ? { number: Infinity; transfer: 0 }
    : never;

  interface TableAccessFn<T> extends Core.Fn {
    return: TableAccess<T, this["arg0"], this["arg1"]>;
  }

  type IsNaN<T> = T extends NaN ? true : false;
  interface IsNaNFn extends Core.Fn {
    return: IsNaN<this["arg0"]>;
  }

  interface IsInfinityFn extends Core.Fn {
    return: this["arg0"] extends Infinity ? true : false;
  }

  type $TableAccess<
    Table,
    A extends keyof Table | Core.unset = Core.unset,
    B extends keyof Table | Core.unset = Core.unset,
  > = Core.PartialApply<TableAccessFn<Table>, [A, B]>;

  type $AddingTable<
    A extends INTERNAL_DIGIT | Core.unset = Core.unset,
    B extends INTERNAL_DIGIT | Core.unset = Core.unset,
  > = Core.PartialApply<$TableAccess<AddingTable>, [A, B]>;

  type $SubtractingTable<
    A extends INTERNAL_DIGIT | Core.unset = Core.unset,
    B extends INTERNAL_DIGIT | Core.unset = Core.unset,
  > = Core.PartialApply<$TableAccess<SubtractionTable>, [A, B]>;

  type $MultiplyingTable<
    A extends INTERNAL_DIGIT | Core.unset = Core.unset,
    B extends INTERNAL_DIGIT | Core.unset = Core.unset,
  > = Core.PartialApply<$TableAccess<MultiplicationTable>, [A, B]>;

  type __CompareTable<
    A extends INTERNAL_DIGIT,
    B extends INTERNAL_DIGIT,
  > = A extends keyof CompareTable
    ? B extends keyof CompareTable[A]
      ? CompareTable[A][B]
      : B extends NaN
      ? { gt: false; lt: false; eq: false; lte: false; gte: false }
      : { gt: false; lt: true; eq: false; lte: false; gte: false }
    : A extends NaN
    ? { gt: false; lt: false; eq: false; lte: false; gte: false }
    : { gt: true; lt: false; eq: false; lte: false; gte: false };

  interface CompareTableFn extends Core.Fn {
    return: __CompareTable<this["arg0"], this["arg1"]>;
  }

  type $CompareTable<
    A extends INTERNAL_DIGIT | Core.unset = Core.unset,
    B extends INTERNAL_DIGIT | Core.unset = Core.unset,
  > = Core.PartialApply<CompareTableFn, [A, B]>;
}
