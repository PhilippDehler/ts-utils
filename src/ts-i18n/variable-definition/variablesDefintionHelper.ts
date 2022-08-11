export type PickVariablesValueByKey<T, Key> = T extends [infer Head, ...infer Tail]
  ? Key extends keyof Head
    ? [Head[Key], ...PickVariablesValueByKey<Tail, Key>]
    : PickVariablesValueByKey<Tail, Key>
  : [];

export type PickRequired<T> = T extends [infer Head, ...infer Tail]
  ? "required" extends keyof Head
    ? Head["required"] extends true
      ? "name" extends keyof Head
        ? [Head["name"], ...PickRequired<Tail>]
        : PickRequired<Tail>
      : PickRequired<Tail>
    : PickRequired<Tail>
  : [];

export type PickOptional<T> = T extends [infer Head, ...infer Tail]
  ? "required" extends keyof Head
    ? Head["required"] extends false
      ? "name" extends keyof Head
        ? [Head["name"], ...PickRequired<Tail>]
        : PickOptional<Tail>
      : PickOptional<Tail>
    : PickOptional<Tail>
  : [];
