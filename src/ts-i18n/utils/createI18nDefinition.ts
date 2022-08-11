import { Narrow, throwNotImplemented } from "../../ts-utils";
import { createVariableSchema } from "./createI18nSchema";
import { ValidateI18nDefinitionInput } from "./variable-definition/i18nDefinitionValidators";

export function createI18nDefinition<
  VariablesSchema,
  ValidatedInput extends ValidateI18nDefinitionInput<
    Narrow<ValidatedInput>,
    VariablesSchema
  >,
>(v: VariablesSchema, s: Narrow<ValidatedInput>): VariablesSchema {
  return throwNotImplemented();
}

export const z = createVariableSchema({
  asdsd: { asdaf: { variables: "adads{{a}}{{b}}{{c}}{{f:date|mm dd yyyy}}" } },
});

const y = createI18nDefinition(z, {
  asdsd: { asdaf: { variables: "adads{{a}}{{b}}{{c}}{{f}}" } },
});
