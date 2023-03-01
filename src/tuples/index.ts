import { Core } from "../core/functions";
import { Strings } from "../strings";
import { TupleCore } from "./core";

export declare namespace Tuples {
  export interface MapFn extends Core.Fn {
    return: TupleCore.Map<this["arg1"], this["arg0"]>;
  }
  export interface $Map<
    Callback extends Core.Fn | Core.unset = Core.unset,
    T extends unknown[] | Core.unset = Core.unset,
  > extends Core.PartialApply<MapFn, [Callback, T]> {}

  export interface ReduceFn extends Core.Fn {
    return: TupleCore.Reduce<this["arg0"], this["arg1"], this["arg2"]>;
  }

  export interface $Reduce<
    L extends Core.Fn | Core.unset = Core.unset,
    Aggregator = Core.unset,
    T extends unknown[] | Core.unset = Core.unset,
  > extends Core.PartialApply<ReduceFn, [T, L, Aggregator]> {}

  interface Aggregate extends Core.Fn {
    return: this["arg0"] extends infer B
      ? B extends {
          agg: infer Agg extends any[];
          res: infer Res extends any[];
        }
        ? this["arg1"] extends infer A
          ? { agg: [...Agg, B]; res: [...Res, A] }
          : never
        : never
      : never;
  }

  export interface ReduceRightFn extends Core.Fn {
    return: TupleCore.ReduceRight<this["arg0"], this["arg1"], this["arg2"]>;
  }

  export interface $ReduceRight<
    L extends Core.Fn | Core.unset = Core.unset,
    Aggregator = Core.unset,
    T extends unknown[] | Core.unset = Core.unset,
  > extends Core.PartialApply<ReduceRightFn, [T, L, Aggregator]> {}

  export interface ZipFn<AFallback = never, BFallback = never> extends Core.Fn {
    return: TupleCore.Zip<this["arg0"], this["arg1"], AFallback, BFallback>;
  }

  export interface $Zip<
    AFallback = never,
    BFallback = never,
    A extends unknown[] | Core.unset = Core.unset,
    B extends unknown[] | Core.unset = Core.unset,
  > extends Core.PartialApply<ZipFn<AFallback, BFallback>, [A, B]> {}

  export interface ZipRightFn<AFallback = never, BFallback = never>
    extends Core.Fn {
    return: TupleCore.ZipRight<
      this["arg0"],
      this["arg1"],
      AFallback,
      BFallback
    >;
  }

  export interface $ZipRight<
    AFallback = Core.unset,
    BFallback = Core.unset,
    A extends unknown[] | Core.unset = Core.unset,
    B extends unknown[] | Core.unset = Core.unset,
  > extends Core.PartialApply<ZipRightFn<AFallback, BFallback>, [A, B]> {}

  export interface ZipWithFn<AFallback = Core.unset, BFallback = Core.unset>
    extends Core.Fn {
    return: TupleCore.ZipWith<
      this["arg0"],
      this["arg1"],
      this["arg2"],
      AFallback,
      BFallback
    >;
  }

  export interface $ZipWith<
    L extends Core.Fn | Core.unset = Core.unset,
    AFallback = Core.unset,
    BFallback = Core.unset,
    A extends unknown[] | Core.unset = Core.unset,
    B extends unknown[] | Core.unset = Core.unset,
  > extends Core.PartialApply<ZipWithFn<AFallback, BFallback>, [A, B, L]> {}

  export interface ZipWithReduceFn<
    Aggregator,
    AFallback = Core.unset,
    BFallback = Core.unset,
  > extends Core.Fn {
    return: TupleCore.ZipReduce<
      this["arg0"],
      this["arg1"],
      this["arg2"],
      Aggregator,
      AFallback,
      BFallback
    >;
  }

  export interface $ZipWithReduce<
    L extends Core.Fn | Core.unset = Core.unset,
    Aggregator = Core.unset,
    AFallback = Core.unset,
    BFallback = Core.unset,
    A extends unknown[] | Core.unset = Core.unset,
    B extends unknown[] | Core.unset = Core.unset,
  > extends Core.PartialApply<
      ZipWithReduceFn<Aggregator, AFallback, BFallback>,
      [A, B, L]
    > {}

  export interface ZipWithReduceRightFn<
    Aggregator,
    AFallback = never,
    BFallback = never,
  > extends Core.Fn {
    return: TupleCore.ZipReduceRight<
      this["arg0"],
      this["arg1"],
      this["arg2"],
      Aggregator,
      AFallback,
      BFallback
    >;
  }

  export interface $ZipReduceRight<
    L extends Core.Fn | Core.unset = Core.unset,
    Aggregator = never,
    AFallback = never,
    BFallback = never,
    A extends unknown[] | Core.unset = Core.unset,
    B extends unknown[] | Core.unset = Core.unset,
  > extends Core.PartialApply<
      ZipWithReduceRightFn<Aggregator, AFallback, BFallback>,
      [A, B, L]
    > {}

  export interface FlatMapFn extends Core.Fn {
    return: TupleCore.FlatMap<this["arg0"], this["arg1"]>;
  }

  export interface $FlatMap<
    L extends Core.Fn | Core.unset = Core.unset,
    T extends unknown[] | Core.unset = Core.unset,
  > extends Core.PartialApply<FlatMapFn, [T, L]> {}

  export interface FilterFn extends Core.Fn {
    return: TupleCore.Filter<this["arg0"], this["arg1"]>;
  }

  export interface $Filter<
    L extends Core.Fn | Core.unset = Core.unset,
    T extends unknown[] | Core.unset = Core.unset,
  > extends Core.PartialApply<FilterFn, [T, L]> {}

  export interface DropWhileFn extends Core.Fn {
    return: TupleCore.DropWhile<this["arg0"], this["arg1"]>;
  }

  export interface $DropWhile<
    L extends Core.Fn | Core.unset = Core.unset,
    T extends unknown[] | Core.unset = Core.unset,
  > extends Core.PartialApply<DropWhileFn, [T, L]> {}

  export interface TakeWhileFn extends Core.Fn {
    return: TupleCore.TakeWhile<this["arg0"], this["arg1"]>;
  }

  export interface $TakeWhile<
    L extends Core.Fn | Core.unset = Core.unset,
    T extends unknown[] | Core.unset = Core.unset,
  > extends Core.PartialApply<TakeWhileFn, [T, L]> {}

  export interface IncludesFn<
    T extends unknown[] | Core.unset = Core.unset,
    V extends unknown | Core.unset = Core.unset,
  > extends Core.Fn {
    return: TupleCore.Includes<this["arg0"], this["arg1"]>;
  }

  export interface $Includes<
    V extends unknown | Core.unset = Core.unset,
    T extends unknown[] | Core.unset = Core.unset,
  > extends Core.PartialApply<IncludesFn<T, V>, [T, V]> {}

  export interface CopyIntoTupleFn extends Core.Fn {
    return: TupleCore.CopyIntoTuple<this["arg0"], this["arg1"]>;
  }

  export interface $CopyIntoTuple<
    V extends unknown | Core.unset = Core.unset,
    T extends unknown[] | Core.unset = Core.unset,
  > extends Core.PartialApply<CopyIntoTupleFn, [T, V]> {}

  export interface FillFn extends Core.Fn {
    return: TupleCore.Fill<this["arg0"], this["arg1"]>;
  }
  export interface $Fill<
    V extends unknown | Core.unset = Core.unset,
    T extends unknown[] | Core.unset = Core.unset,
  > extends Core.PartialApply<FillFn, [T, V]> {}
}

interface $ToString extends Core.Fn {
  return: this["arg0"] extends number ? `${this["arg0"]}` : never;
}

type MapTest = Core.Eval<Tuples.$Map<$ToString, [1, 2, 3]>>;
//   ^?

type ReduceTest = Core.Eval<Tuples.$Reduce<Strings.$Concat, "", [1, 2, 3]>>;
//   ^?
