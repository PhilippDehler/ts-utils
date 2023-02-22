import { TypeDefinitions } from "../schemaBuilder/typeSchemaBuilder";
import { TestSchema } from "../test";
import { ErrorMsg } from "../utilityTypes";
import { test } from "../utils";
import { ValidateOperations } from "./operationValidator";
import { ValidateType } from "./typeValidator";

type ValidateKey<Key extends string> = Key extends ""
  ? ErrorMsg<"Expected non-empty-value">
  : Key;

export type ValidateTemplate<
  Input extends string,
  TSchema extends {
    typeDefinition: TypeDefinitions;
  },
> = Input extends `${infer Start}{{${infer TemplateKey}}}${infer Rest}`
  ? `${Start}{{${ValidateTemplateValue<
      TemplateKey,
      TSchema
    >}}}${ValidateTemplate<Rest, TSchema>}`
  : Input;

export type ExtractParserInformations<
  T extends string,
  DefaultType,
> = T extends `${infer Key}#${infer Type}|${infer Operations}`
  ? {
      key: Key;
      type: Type;
      operations: Operations;
      hasOperations: true;
      hasType: true;
    }
  : T extends `${infer Key}#${infer Type}`
  ? {
      key: Key;
      type: Type;
      operations: "";
      hasOperations: false;
      hasType: true;
    }
  : T extends `${infer Key}|${infer Operations}`
  ? {
      key: Key;
      type: DefaultType;
      operations: Operations;
      hasOperations: true;
      hasType: false;
    }
  : {
      key: T;
      type: DefaultType;
      operations: "";
      hasOperations: false;
      hasType: false;
    };

type ValidateTemplateValue<
  T extends string,
  TSchema extends {
    typeDefinition: TypeDefinitions;
  },
> = ExtractParserInformations<
  T,
  TSchema["typeDefinition"]["DEFAULT"]["key"]
> extends {
  key: infer Key extends string;
  type: infer Type extends string;
  operations: infer Operations extends string;
  hasType: infer HasType;
  hasOperations: infer HasOperations;
}
  ? `${ValidateKey<Key>}${HasType extends true
      ? `#${ValidateType<Type, TSchema["typeDefinition"]>}`
      : ""}${HasOperations extends true
      ? `|${ValidateOperations<
          Operations,
          TSchema,
          ValidateType<Type, TSchema["typeDefinition"]>
        >}`
      : ""}`
  : never;

test<TestValidateTemplateValue>("[Error:Expected non-empty-value]");
type TestValidateTemplateValue = ValidateTemplateValue<"", TestSchema>;

test<TestValidateTemplateValue1>("name");
type TestValidateTemplateValue1 = ValidateTemplateValue<"name", TestSchema>;

test<TestValidateTemplateValue2>("name");
type TestValidateTemplateValue2 = ValidateTemplateValue<"name", TestSchema>;

test<TestValidateTemplateValue3>("name|uppercase");
type TestValidateTemplateValue3 = ValidateTemplateValue<
  "name|uppercase",
  TestSchema
>;

test<TestValidateTemplateValue4>("birthday#date|iso|uppercase|slice(0,1)");
type TestValidateTemplateValue4 = ValidateTemplateValue<
  "birthday#date|iso|uppercase|slice(0,1)",
  TestSchema
>;

test<TestValidateTemplateValue5>(
  "birthday#date|iso|uppercase|slice(0,[Expected Type:number])",
);
type TestValidateTemplateValue5 = ValidateTemplateValue<
  "birthday#date|iso|uppercase|slice(0,)|",
  TestSchema
>;

test<TestValidateTemplateValue6>(
  "birthday#date|[Error:Didn't expect Operation Key |uppercase|.]|[Error:Didn't expect Operation Key |iso|.]",
);
type TestValidateTemplateValue6 = ValidateTemplateValue<
  "birthday#date|uppercase|iso|",
  TestSchema
>;

test<TestValidateTemplateValue7>(
  "birthday#string|uppercase|[Error:Didn't expect Operation Key |iso|.]",
);
type TestValidateTemplateValue7 = ValidateTemplateValue<
  "birthday#string|uppercase|iso|",
  TestSchema
>;

test<TestValidateTemplateValue8>("name#string|uppercase|slice(0,1)");
type TestValidateTemplateValue8 = ValidateTemplateValue<
  "name#string|uppercase|slice(0,1)",
  TestSchema
>;

test<TestValidateTemplateValue9>(
  "name|lowercase|slice(0,?[Expected Type:number])",
);
type TestValidateTemplateValue9 = ValidateTemplateValue<
  "name|?|slice(0,?)|",
  TestSchema
>;

test<TestValidateTemplate>("");
type TestValidateTemplate = ValidateTemplate<"", TestSchema>;

test<TestValidateTemplate1>("Hallo {{name}}");
type TestValidateTemplate1 = ValidateTemplate<"Hallo {{name}}", TestSchema>;

test<TestValidateTemplate2>("Hallo {{name|uppercase}}");
type TestValidateTemplate2 = ValidateTemplate<
  "Hallo {{name|uppercase}}",
  TestSchema
>;

test<TestValidateTemplate3>("{{name|uppercase}}");
type TestValidateTemplate3 = ValidateTemplate<"{{name|uppercase}}", TestSchema>;

test<TestValidateTemplate4>(
  "Hallo {{name|uppercase}}, hast du am {{birthday#date|iso}} Geburtstag?",
);
type TestValidateTemplate4 = ValidateTemplate<
  "Hallo {{name|uppercase}}, hast du am {{birthday#date|iso}} Geburtstag?",
  TestSchema
>;

test<TestValidateTemplate5>(
  "Hallo {{name|uppercase}}, hast du am {{birthday#date|iso|uppercase|slice(0,1)}} Geburtstag?",
);
type TestValidateTemplate5 = ValidateTemplate<
  "Hallo {{name|uppercase}}, hast du am {{birthday#date|iso|uppercase|slice(0,1)|}} Geburtstag?",
  TestSchema
>;

test<TestValidateTemplate6>(
  "{{birthday#date|[Error:Didn't expect Operation Key |uppercase|.]|[Error:Didn't expect Operation Key |iso|.]|lowercase}}",
);
type TestValidateTemplate6 = ValidateTemplate<
  "{{birthday#date|uppercase|iso|?}}",
  TestSchema
>;

test<TestValidateTemplate7>(
  "{{birthday#string|uppercase|[Error:Didn't expect Operation Key |iso|.]}}",
);
type TestValidateTemplate7 = ValidateTemplate<
  "{{birthday#string|uppercase|iso|}}",
  TestSchema
>;

test<TestValidateTemplate8>("Hallo {{name#string|uppercase|slice(0,1)}}");
type TestValidateTemplate8 = ValidateTemplate<
  "Hallo {{name#string|uppercase|slice(0,1)}}",
  TestSchema
>;

test<TestValidateTemplate9>(
  "Hallo {{name|uppercase|slice(0,?[Expected Type:number])}}",
);
type TestValidateTemplate9 = ValidateTemplate<
  "Hallo {{name|uppercase|slice(0,?)|}}",
  TestSchema
>;

test<TestValidateTemplate10>(
  "Hallo {{name|slice[Expected Type:number],[Expected Type:number]|slice(0,[Expected Type:number])}}",
);
type TestValidateTemplate10 = ValidateTemplate<
  "Hallo {{name|slice|slice(0,)}}",
  TestSchema
>;
