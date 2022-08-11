import { TrimmedSplit } from "../../../utility-types";
import { ParseGraphQLObjectReferencesFromLines } from "./GraphQLObject";
import { CreateGraphQLReferenceFromKeyValueString, GraphQLReference } from "./GraphQLReference";

export type GraphQLMutation = {
  key: string;
  type: "mutation";
  inputs: GraphQLReference[];
  output: GraphQLReference;
};

export type ParseGraphQLMutationsFromLines<
  Lines extends string[],
  GraphQLMutations extends GraphQLMutation[] = [],
> = Lines extends [infer FirstLine extends string, ...infer Rest extends [] | string[]]
    ? ParseGraphQLMutationsFromLines<
        Rest,
        [
          ...GraphQLMutations,
           ParseGraphQLMutationFromLines<FirstLine>,
        ]
      >
  : GraphQLMutations;

type ParseGraphQLMutationFromLines<Line extends string> =
  Line extends `${infer Key}(${infer Input})${string}:${infer Output}`
    ? {
        key: Key;
        type: "mutation";
        inputs: ParseGraphQLObjectReferencesFromLines<TrimmedSplit<Input, ",">>;
        output: CreateGraphQLReferenceFromKeyValueString<Output>;
      }
    : Line extends `${infer Key}:${infer Output}`
    ? {
        key: Key;
        type: "mutation";
        inputs: [];
        output: CreateGraphQLReferenceFromKeyValueString<Output>;
      }
    : never;
