import { Narrow, throwNotImplemented } from "../../ts-utils";
import { infer } from "../../utils/infer";
import { Call } from "./utils/utility-types";
import {
  BuildVariableDefinitionsFromInput,
  ParseInputToVariablesDefinitions,
} from "./variable-definition/variable";

export type TypeSchema = {
  type: string;
  serializer: string[];
  defaultSerializer: string | null;
};

export type CreateSchema<InputObject> = {
  [Key in keyof InputObject]: InputObject[Key] extends string
    ? Call<ParseInputToVariablesDefinitions, InputObject[Key]>
    : CreateSchema<InputObject[Key]>;
};

export type ValidatedInput<InputObject, TypeSchema extends any[]> = {
  [Key in keyof InputObject]: InputObject[Key] extends object
    ? ValidatedInput<InputObject[Key], TypeSchema>
    : BuildVariableDefinitionsFromInput<InputObject[Key], TypeSchema>;
};

function createSchemaDefinitionBuilder<TTypeSchema extends TypeSchema[]>(
  typeSchema: Narrow<TTypeSchema>,
) {
  return function createSchemaDefinition<
    TInput extends ValidatedInput<Narrow<TInput>, TTypeSchema>,
  >(schemaBuilder: TInput): CreateSchema<Narrow<TInput>> {
    return throwNotImplemented();
  };
}
const serializerDefinition = infer([
  {
    type: "date",
    serializer: ["dd mm yyyy", "mm dd yyyy"],
    defaultSerializer: "MM DD YY",
  },
  { type: "number", serializer: [".0f", "0b"], defaultSerializer: "string" },
  { type: "", serializer: [], defaultSerializer: null },
]);

export type SerializerDefinition = typeof serializerDefinition;
export const createVariableSchema =
  createSchemaDefinitionBuilder(serializerDefinition);
