import { Core } from "../core/functions";
import { ObjectCore } from "./core";

export declare namespace Objects {
  interface KeyValueTupleFn extends Core.Fn {
    return: [this["arg0"], this["arg1"]];
  }

  interface $KeyValeTuple<
    Key extends PropertyKey | Core.unset = Core.unset,
    Value extends unknown | Core.unset = Core.unset,
  > extends Core.PartialApply<KeyValueTupleFn, [Key, Value]> {}

  interface KeyValueFromTupleFn extends Core.Fn {
    return: { [K in this["arg0"]]: this["arg1"] };
  }

  interface $KeyValueFromTuple<
    T extends ObjectCore.KeyValueTuple | Core.unset = Core.unset,
  > extends Core.PartialApply<KeyValueFromTupleFn, [T]> {}

  interface KeysFn extends Core.Fn {
    return: keyof this["arg0"];
  }

  interface $Keys<T extends object | Core.unset = Core.unset>
    extends Core.PartialApply<KeysFn, [T]> {}

  interface EntriesFn extends Core.Fn {
    return: {
      [K in keyof this["arg0"]]: [K, this["arg0"][K]];
    }[keyof this["arg0"]];
  }

  interface $Entries<T extends object | Core.unset = Core.unset>
    extends Core.PartialApply<EntriesFn, [T]> {}

  interface FromEntriesFn extends Core.Fn {
    return: ObjectCore.FromEntries<this["arg0"]>;
  }

  interface $FromEntries<
    T extends Array<ObjectCore.KeyValueTuple> | Core.unset = Core.unset,
  > extends Core.PartialApply<FromEntriesFn, [T]> {}

  interface ValuesFn extends Core.Fn {
    return: this["arg0"][keyof this["arg0"]];
  }

  interface $Values<T extends object | Core.unset = Core.unset>
    extends Core.PartialApply<ValuesFn, [T]> {}

  interface GetPropertyFn extends Core.Fn {
    return: this["arg0"][this["arg1"]];
  }

  interface $GetProperty<
    T extends object | Core.unset = Core.unset,
    K extends keyof T | Core.unset = Core.unset,
  > extends Core.PartialApply<GetPropertyFn, [T, K]> {}

  interface SetPropertyFn extends Core.Fn {
    return: {
      [P in keyof this["arg0"]]: P extends this["arg1"]
        ? this["arg2"]
        : this["arg0"][P];
    };
  }

  interface $SetProperty<
    T extends object | Core.unset = Core.unset,
    K extends keyof T | Core.unset = Core.unset,
    V extends unknown | Core.unset = Core.unset,
  > extends Core.PartialApply<SetPropertyFn, [T, K, V]> {}

  interface HasPropertyFn extends Core.Fn {
    return: this["arg1"] extends keyof this["arg0"] ? true : false;
  }

  interface $HasProperty<
    T extends object | Core.unset = Core.unset,
    K extends keyof T | Core.unset = Core.unset,
  > extends Core.PartialApply<HasPropertyFn, [T, K]> {}

  interface DeepPartialFn extends Core.Fn {
    return: ObjectCore.DeepPartial<this["arg0"]>;
  }

  interface $DeepPartial<T extends object | Core.unset = Core.unset>
    extends Core.PartialApply<DeepPartialFn, [T]> {}

  interface DeepRequiredFn extends Core.Fn {
    return: ObjectCore.DeepRequired<this["arg0"]>;
  }

  interface $DeepRequired<T extends object | Core.unset = Core.unset>
    extends Core.PartialApply<DeepRequiredFn, [T]> {}

  interface DeepReadonlyFn extends Core.Fn {
    return: ObjectCore.DeepReadonly<this["arg0"]>;
  }

  interface $DeepReadonly<T extends object | Core.unset = Core.unset>
    extends Core.PartialApply<DeepReadonlyFn, [T]> {}

  interface DeepWritableFn extends Core.Fn {
    return: ObjectCore.DeepWritable<this["arg0"]>;
  }

  interface $DeepWritable<T extends object | Core.unset = Core.unset>
    extends Core.PartialApply<DeepWritableFn, [T]> {}

  interface DeepNonNullableFn extends Core.Fn {
    return: ObjectCore.DeepNonNullable<this["arg0"]>;
  }

  interface $DeepNonNullable<T extends object | Core.unset = Core.unset>
    extends Core.PartialApply<DeepNonNullableFn, [T]> {}

  interface DeepOmitFn extends Core.Fn {
    return: ObjectCore.DeepOmit<this["arg0"], this["arg1"]>;
  }

  interface $DeepOmit<
    T extends object | Core.unset = Core.unset,
    K extends keyof T | Core.unset = Core.unset,
  > extends Core.PartialApply<DeepOmitFn, [T, K]> {}

  type MapValues<T extends object, L extends Core.Fn> = {
    [K in keyof T]: Core.Apply<L, [T[K]]>;
  };

  interface MapValuesFn extends Core.Fn {
    return: Objects.MapValues<this["arg0"], this["arg1"]>;
  }

  interface $MapValues<
    L extends Core.Fn | Core.unset = Core.unset,
    T extends object | Core.unset = Core.unset,
  > extends Core.PartialApply<MapValuesFn, [T, L]> {}

  type MapValuesDeep<T extends object, L extends Core.Fn> = {
    [K in keyof T]: T[K] extends object
      ? Objects.MapValuesDeep<T[K], L>
      : Core.Apply<L, [T[K]]>;
  };

  interface MapValuesDeepFn extends Core.Fn {
    return: Objects.MapValuesDeep<this["arg0"], this["arg1"]>;
  }

  interface $MapValuesDeep<
    L extends Core.Fn | Core.unset = Core.unset,
    T extends object | Core.unset = Core.unset,
  > extends Core.PartialApply<MapValuesDeepFn, [T, L]> {}

  type MapValuesBy<
    T extends object,
    Predicate extends Core.Fn,
    Callback extends Core.Fn,
  > = {
    [K in keyof T]: Core.Apply<Predicate, [T[K]]> extends true
      ? Core.Apply<Callback, [T[K]]>
      : T[K];
  };

  interface MapValuesByFn extends Core.Fn {
    return: Objects.MapValuesBy<this["arg0"], this["arg1"], this["arg2"]>;
  }

  interface $MapValuesBy<
    Predicate extends Core.Fn | Core.unset = Core.unset,
    Callback extends Core.Fn | Core.unset = Core.unset,
    T extends object | Core.unset = Core.unset,
  > extends Core.PartialApply<MapValuesByFn, [T, Predicate, Callback]> {}

  type MapValuesByDeep<
    T extends object,
    Predicate extends Core.Fn,
    Callback extends Core.Fn,
  > = {
    [K in keyof T]: Core.Apply<Predicate, [T[K]]> extends true
      ? Core.Apply<Callback, [T[K]]>
      : T[K] extends object
      ? Objects.MapValuesByDeep<T[K], Predicate, Callback>
      : T[K];
  };

  interface MapValuesByDeepFn extends Core.Fn {
    return: Objects.MapValuesByDeep<this["arg0"], this["arg1"], this["arg2"]>;
  }

  interface $MapValuesByDeep<
    Predicate extends Core.Fn | Core.unset = Core.unset,
    Callback extends Core.Fn | Core.unset = Core.unset,
    T extends object | Core.unset = Core.unset,
  > extends Core.PartialApply<MapValuesByDeepFn, [T, Predicate, Callback]> {}

  type MapKeys<T extends object, L extends Core.Fn> = {
    [K in keyof T as Core.Apply<L, [K]> & PropertyKey]: T[K];
  };

  interface MapKeysFn extends Core.Fn {
    return: Objects.MapKeys<this["arg0"], this["arg1"]>;
  }

  interface $MapKeys<
    L extends Core.Fn | Core.unset = Core.unset,
    T extends object | Core.unset = Core.unset,
  > extends Core.PartialApply<MapKeysFn, [T, L]> {}

  type MapKeysDeep<T extends object, L extends Core.Fn> = {
    [K in keyof T as Core.Apply<L, [K]> & PropertyKey]: T[K] extends object
      ? Objects.MapKeysDeep<T[K], L>
      : T[K];
  };

  interface MapKeysDeepFn extends Core.Fn {
    return: Objects.MapKeysDeep<this["arg0"], this["arg1"]>;
  }

  interface $MapKeysDeep<
    L extends Core.Fn | Core.unset = Core.unset,
    T extends object | Core.unset = Core.unset,
  > extends Core.PartialApply<MapKeysDeepFn, [T, L]> {}
}
