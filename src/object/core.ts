import { Types } from "../type";

export declare namespace ObjectCore {
  type KeyValueTuple<Key extends PropertyKey = PropertyKey, Value = unknown> = [
    Key,
    Value,
  ];
  type KeyValueFromTuple<T extends KeyValueTuple> = { [K in T[0]]: T[1] };
  type Keys<T extends object> = keyof T;
  type Entries<T extends object> = { [K in keyof T]: [K, T[K]] }[keyof T];

  // prettier-ignore
  type FromEntries<
    T extends Array<KeyValueTuple>,
    Aggregator = {},
  > = T extends [infer H extends KeyValueTuple, ...infer Tail extends Array<KeyValueTuple>]
    ? FromEntries<Tail, Aggregator & KeyValueFromTuple<H>>
    : Aggregator;

  type Values<T extends object> = T[keyof T];
  type GetProperty<T extends object, K extends keyof T> = T[K];
  type SetProperty<T extends object, K extends keyof T, V> = {
    [P in keyof T]: P extends K ? V : T[P];
  };
  type HasProperty<T extends object, K extends keyof T> = K extends keyof T
    ? true
    : false;

  type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
  };

  type DeepRequired<T> = {
    [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
  };

  type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
  };

  type DeepWritable<T> = {
    -readonly [P in keyof T]: T[P] extends object ? DeepWritable<T[P]> : T[P];
  };

  type DeepNonNullable<T> = {
    [P in keyof T]: T[P] extends object
      ? DeepNonNullable<T[P]>
      : NonNullable<T[P]>;
  };

  type DeepNullable<T> = {
    [P in keyof T]: T[P] extends object
      ? DeepNullable<T[P]>
      : Types.Nullable<T[P]>;
  };

  type DeepMaybe<T> = {
    [P in keyof T]: T[P] extends object ? DeepMaybe<T[P]> : Types.Maybe<T[P]>;
  };

  type Assign<Target, Source> = {
    [P in keyof Target | keyof Source]: P extends keyof Source
      ? Source[P]
      : P extends keyof Target
      ? Target[P]
      : never;
  };

  type DeepOmit<T extends object, Key extends PropertyKey> = Omit<
    {
      [K in keyof T]: T[K] extends object ? DeepOmit<T[K], K> : T[K];
    },
    Key
  >;
}
