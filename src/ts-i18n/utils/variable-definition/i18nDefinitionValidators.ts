import { Call, Narrow } from "../utils/utility-types";
import { PrintArray, PrintError } from "../utils/utils";
import { MatchVariableStrings } from "./variable";
import {
  PickRequired,
  PickVariablesValueByKey,
} from "./variablesDefintionHelper";

export type ValidateI18nDefinitionInput<InputObject, SchemaVariables> = {
  [Key in keyof SchemaVariables]: Key extends keyof InputObject
    ? SchemaVariables[Key] extends any[]
      ? ValidateVariableUsageInString<
          Narrow<InputObject[Key]>,
          SchemaVariables[Key]
        >
      : ValidateI18nDefinitionInput<InputObject[Key], SchemaVariables[Key]>
    : never;
};

type ValidateVariableUsageInString<
  Input,
  SchemaVariables extends any[],
> = Input extends string
  ? `${Input}${BuildValidI18nDefinitionString<
      Call<MatchVariableStrings, Input>,
      SchemaVariables
    >}`
  : `|[ERROR TypeError]: In InputString|` & Input;

type BuildValidI18nDefinitionString<
  ExtractVariables extends string[],
  SchemaVariables extends any[],
  RequiredVariables extends string[] = PickRequired<SchemaVariables>,
  TAllVariables extends string[] = PickVariablesValueByKey<
    SchemaVariables,
    "name"
  >,
> =
  // Checks if there are any Variables defined that are not in all defined variables
  // if so throw error
  Remove<ExtractVariables, TAllVariables>[0] extends string
    ? PrintError<
        "Forbidden Variables",
        PrintArray<Remove<ExtractVariables, TAllVariables>>
      >
    : // Checks if there are required Variables missing in the inputstring
    // if so throw error
    Remove<RequiredVariables, ExtractVariables> extends []
    ? ""
    : PrintError<
        "Missing Variables",
        PrintArray<Remove<RequiredVariables, ExtractVariables>>
      >;
export type Remove<T, TFilter extends string[]> = T extends [
  infer Head,
  ...infer Tail,
]
  ? Head extends TFilter[number]
    ? Remove<Tail, TFilter>
    : [Head, ...Remove<Tail, TFilter>]
  : [];
