import { ArgDefinition, ValidateArgs } from "./argsValidator";

import {
  ErrorMsg,
  HasPartialMatch,
  NeedsSuggestions,
  SuggestionMsg,
} from "../utilityTypes";

import { TypeDefinitions } from "../schemaBuilder/typeSchemaBuilder";
import { TestSchema } from "../test";
import { test } from "../utils";

type FirstAndRest<
  T extends string,
  TSplit extends string,
> = T extends `${infer First}${TSplit}${infer Rest}`
  ? { first: First; rest: Rest }
  : { first: T; rest: "" };

type Types<
  TSchema extends {
    typeDefinition: TypeDefinitions;
  },
> = keyof TSchema["typeDefinition"] & string;
type TypeDefault<
  TSchema extends {
    typeDefinition: TypeDefinitions;
  },
> = TSchema["typeDefinition"]["DEFAULT"]["key"];

type OperationReturnType<
  TSchema extends {
    typeDefinition: TypeDefinitions;
  },
  Type,
  Operation,
> = Type extends keyof TSchema
  ? Operation extends keyof TSchema[Type]
    ? "returnType" extends keyof TSchema[Type][Operation]
      ? TSchema[Type][Operation]["returnType"] extends Types<TSchema>
        ? TSchema[Type][Operation]["returnType"]
        : TypeDefault<TSchema>
      : TypeDefault<TSchema>
    : TypeDefault<TSchema>
  : TypeDefault<TSchema>;

type ValidateOperationKey<
  Key extends string,
  TOperationLookUp extends OperationLookUp,
> = NeedsSuggestions<Key> extends true
  ? SuggestionMsg<keyof TOperationLookUp & string>
  : HasPartialMatch<Key, keyof TOperationLookUp & string> extends true
  ? SuggestionMsg<keyof TOperationLookUp & string & `${Key}${string}`>
  : ErrorMsg<`Didn't expect Operation Key |${Key}|.`>;

test<TestValidateOperationKey0>(
  "[Error:Didn't expect Operation Key |slicee|.]",
);
type TestValidateOperationKey0 = ValidateOperationKey<
  "slicee",
  { slice: any; uppercase: any }
>;
//      ^?
test<TestValidateOperationKey1>("slice");
type TestValidateOperationKey1 = ValidateOperationKey<
  "slicee?",
  { slice: any; uppercase: any }
>;
//      ^?
test<TestValidateOperationKey2>("slice");
type TestValidateOperationKey2 = ValidateOperationKey<
  "slic",
  { slice: any; uppercase: any }
>;

interface ExtendableParserDefinition {
  key: string;
  args: ArgDefinition[];
  parser: (input: any, t: any) => any;
}

type OperationKeyAndArgs<T extends string> =
  T extends `${infer Operation}(${infer Args})`
    ? { operation: Operation; args: Args; hasArgs: true }
    : T extends `${infer Operation}(${infer Args}`
    ? { operation: Operation; args: Args; hasArgs: true }
    : { operation: T; args: ""; hasArgs: false };

type ValidateOperation<
  Operation extends string,
  TOperationLookUp extends OperationLookUp,
> = OperationKeyAndArgs<Operation> extends {
  operation: infer Key extends string;
  args: infer Args extends string;
  hasArgs: infer HasArgs extends boolean;
}
  ? `${ValidateOperationKey<Key, TOperationLookUp>}${HasArgs extends false
      ? ""
      : "("}${ValidateArgs<
      Args,
      TOperationLookUp[Key]["args"]
    >}${HasArgs extends false ? "" : ")"}`
  : never;

type OperationLookUp = Record<string, ExtendableParserDefinition>;
type TestOperationLookUp = TestSchema["string"];

test<TestValidateOperation0>("[Error:Didn't expect Operation Key |a|.]");
type TestValidateOperation0 = ValidateOperation<"a", TestOperationLookUp>;

test<TestValidateOperation1>("[Error:Didn't expect Operation Key |iso|.]");
type TestValidateOperation1 = ValidateOperation<"iso", TestOperationLookUp>;

test<TestValidateOperation2>("uppercase");
type TestValidateOperation2 = ValidateOperation<
  "uppercase",
  TestOperationLookUp
>;

test<TestValidateOperation3>("uppercase");
type TestValidateOperation3 = ValidateOperation<"up", TestOperationLookUp>;

test<TestValidateOperation4>("lowercase");
type TestValidateOperation4 = ValidateOperation<"lo", TestOperationLookUp>;

test<TestValidateOperation5>("slice(0,[Expected Type:number])");
type TestValidateOperation5 = ValidateOperation<
  "slice(0,)",
  TestOperationLookUp
>;

test<TestValidateOperation6>("slice(0,1,[Error:Didn't expect Arg 1])");
type TestValidateOperation6 = ValidateOperation<
  "slice(0,1,1)",
  TestOperationLookUp
>;

test<TestValidateOperation7>(
  "slice[Expected Type:number],[Expected Type:number]",
);
type TestValidateOperation7 = ValidateOperation<"slice", TestOperationLookUp>;

export type ValidateOperations<
  Operation extends string,
  TSchema extends {
    typeDefinition: TypeDefinitions;
  },
  InitalType,
> = InitalType extends keyof TSchema
  ? FirstAndRest<Operation, "|"> extends {
      first: infer FirstOperation extends string;
      rest: infer Rest extends string;
    }
    ? TSchema[InitalType] extends OperationLookUp
      ? `${ValidateOperation<
          FirstOperation,
          TSchema[InitalType]
        >}${Rest extends "" ? "" : "|"}${Rest extends ""
          ? ""
          : ValidateOperations<
              Rest,
              TSchema,
              OperationReturnType<
                TSchema,
                InitalType,
                ValidateOperation<FirstOperation, TSchema[InitalType]>
              >
            >}`
      : InitalType
    : never
  : InitalType;

test<TestValidateOperations>("slice(0,1)|uppercase");
type TestValidateOperations = ValidateOperations<
  "slice(0,1)|uppercas",
  TestSchema,
  "string"
>;
//  ^?
test<TestValidateOperations0>("iso|slice(0,[Expected Type:number])");
type TestValidateOperations0 = ValidateOperations<
  "iso|slice(0,)",
  TestSchema,
  "date"
>;

test<TestValidateOperations1>(
  "uppercase|slice(?[Expected Type:number],[Expected Type:number])",
);
type TestValidateOperations1 = ValidateOperations<
  "uppercase|slice(?,)",
  TestSchema,
  "string"
>;

test<TestValidateOperations2>(
  "iso|uppercase|slice(?[Expected Type:number],[Expected Type:number])",
);
type TestValidateOperations2 = ValidateOperations<
  "iso|uppercase|slice(?,)",
  TestSchema,
  "date"
>;

test<TestValidateOperations3>(
  "iso|uppercase|slice(?[Expected Type:number],[Expected Type:number])|lowercase",
);
test<TestValidateOperations3>(
  "iso|uppercase|slice(?[Expected Type:number],[Expected Type:number])|uppercase",
);
test<TestValidateOperations3>(
  "iso|uppercase|slice(?[Expected Type:number],[Expected Type:number])|slice",
);
type TestValidateOperations3 = ValidateOperations<
  "iso|uppercase|slice(?,)|?",
  Omit<TestSchema, "DEFAULT">,
  "date"
>;
