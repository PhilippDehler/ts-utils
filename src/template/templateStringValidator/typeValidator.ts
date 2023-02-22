import { TestSchema } from "../test";
import {
  HasPartialMatch,
  NeedsSuggestions,
  SuggestionMsg,
} from "../utilityTypes";
import { test } from "../utils";

export type ValidateType<
  Type extends string,
  TypeLookUp extends Record<
    string,
    { parseValue: (value: string) => unknown; isDefault: boolean }
  >,
> = NeedsSuggestions<Type> extends true
  ? SuggestionMsg<keyof TypeLookUp & string>
  : HasPartialMatch<Type, keyof TypeLookUp & string> extends true
  ? SuggestionMsg<keyof TypeLookUp & string & `${Type}${string}`>
  : SuggestionMsg<keyof TypeLookUp & string>;

test<TestValidateType0>("date");
type TestValidateType0 = ValidateType<"dat", TestSchema["typeDefinition"]>;
test<TestValidateType1>("date");
test<TestValidateType1>("DEFAULT");
test<TestValidateType1>("string");
type TestValidateType1 = ValidateType<"datee", TestSchema["typeDefinition"]>;
test<TestValidateType2>("string");
type TestValidateType2 = ValidateType<"date?", TestSchema["typeDefinition"]>;
