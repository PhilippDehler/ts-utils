import { ArrayToObject } from "../../ts-array-utils";
import { Concat } from "../../ts-string-utils";
import { throwNotImplemented } from "../../ts-utils";
import {
  PickOptional,
  PickVariablesValueByKey,
} from "./variable-definition/variablesDefintionHelper";

type BuildTranslatorArgs<
  MyPath extends string,
  Key extends keyof Object,
  Object,
> = {
  keyPath: Key extends string ? Concat<MyPath, Key> : never;
  value: ArrayToObject<
    string,
    PickVariablesValueByKey<Object[Key], "required">
  > &
    Partial<ArrayToObject<string, PickOptional<Object[Key]>>>;
};

/**
 * Helper type that generates an map of all keypath and variable values
 * { keyPath: string; value: string[] }
 */
export type TranslatorArgs<Object, MyPath extends string = ""> = {
  [Key in keyof Object]: Key extends string
    ? Object[Key] extends any[]
      ? BuildTranslatorArgs<MyPath, Key, Object>
      : TranslatorArgs<Object[Key], Concat<MyPath, Key>>
    : never;
}[keyof Object] & { keyPath: unknown; value: unknown };

export function createI18nTranslator<T>(
  schema: T,
): <Args extends TranslatorArgs<T>>(
  keys: Args["keyPath"],
  args: Args["value"],
) => string {
  return () => throwNotImplemented();
}
