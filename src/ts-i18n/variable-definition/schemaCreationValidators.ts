import { ParserDefinition } from "../parserDefinition";
import { Args, Call, Lambda } from "../utils/utility-types";
import { AutoComplete, Print, PrintError, PrintInfo } from "../utils/utils";
import {
  BuildVariableDefinition,
  VariableMatchEnd,
  VariableMatchStart,
} from "./variable";

type GetValue<T, Key> = Key extends keyof T ? T[Key] : "";
type GetSerializerByType<Type, T extends any[]> =
  | "type"
  | "serializer" extends keyof T[number]
  ? Type extends T[number]["type"]
    ? (T[number] & { [Key in "type"]: Type })["serializer"]
    : []
  : [];

type ValidateOptional<VariableDefinition> = GetValue<
  VariableDefinition,
  "required"
> extends true
  ? ""
  : "?";
type ValidateVariableName<VariableDefinition> = GetValue<
  VariableDefinition,
  "name"
> extends null
  ? PrintError<"No Variable Provided", "">
  : GetValue<VariableDefinition, "name"> extends string
  ? GetValue<VariableDefinition, "name">
  : "";

type ExtractTypesFromSchemaContext<
  T extends any[],
  TAgg extends any[] = [],
> = T extends [infer Head, ...infer Tail]
  ? "type" extends keyof Head
    ? ExtractTypesFromSchemaContext<Tail, [...TAgg, Head["type"]]>
    : ExtractTypesFromSchemaContext<Tail, TAgg>
  : TAgg;

type ValidateVariableType<
  VariableDefinition,
  TypeSchema extends any[],
  Input = GetValue<VariableDefinition, "type">,
> = `${GetValue<VariableDefinition, "type"> extends string
  ? ":"
  : ""}${Input extends `#${string}`
  ? PrintInfo<"Possible", Print<ExtractTypesFromSchemaContext<TypeSchema>>>
  : Input extends "" | null
  ? ""
  : AutoComplete<
      Input extends string ? Input : "",
      ExtractTypesFromSchemaContext<TypeSchema>,
      "type"
    >}`;

type ValidateSerializer<
  VariableDefinition,
  TypeSchema extends { type: string; serializer: string[] }[],
  Type = GetValue<VariableDefinition, "type">,
  Input = GetValue<VariableDefinition, "serializer">,
> = `${Input extends string ? "|" : ""}${Input extends `#${string}`
  ? PrintInfo<"Possible", Print<GetSerializerByType<Type, TypeSchema>>>
  : Input extends null | ""
  ? ""
  : AutoComplete<
      Input extends string ? Input : "",
      GetSerializerByType<Type, TypeSchema>,
      "serializer"
    >}`;

type TValidateVariableDefinitionString<
  Input,
  TypeSchema extends any[],
  VariableDefinition extends unknown = Call<
    BuildVariableDefinition<ParserDefinition>,
    Input
  >,
> = `${VariableMatchStart}${ValidateOptional<VariableDefinition>}${ValidateVariableName<VariableDefinition>}${ValidateVariableType<
  VariableDefinition,
  TypeSchema
>}${ValidateSerializer<VariableDefinition, TypeSchema>}${VariableMatchEnd}`;

export interface ValidateVariableString<T extends any[]> extends Lambda {
  return: TValidateVariableDefinitionString<Args<this>, T>;
}
