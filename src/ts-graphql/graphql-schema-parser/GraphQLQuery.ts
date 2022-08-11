import { ParseGraphQLObjectReferencesFromLines } from "./GraphQLObject";
import { CreateGraphQLReferenceFromKeyValueString, GraphQLReference } from "./GraphQLReference";
import { TrimmedSplit } from "./utils";

export type GraphQLQuery = {
  key: string;
  type: "query";
  inputs: GraphQLReference[];
  output: GraphQLReference;
};

export type ParseGraphQLQueriesFromLines<
  Lines extends string[],
  GraphQLQueries extends GraphQLQuery[] = [],
> = Lines extends [infer FirstLine extends string, ...infer Rest extends string[] | []]
    ? ParseGraphQLQueriesFromLines<
        Rest,
        [
          ...GraphQLQueries,
          ParseGraphQLQueryFromLines<FirstLine>,
        ]
      >
  : GraphQLQueries;

type ParseGraphQLQueryFromLines<Line extends string> =
  Line extends `${infer Key}(${infer Input})${string}:${infer Output}`
    ? {
        key: Key;
        type: "query";
        inputs: ParseGraphQLObjectReferencesFromLines<TrimmedSplit<Input, ",">>;
        output: CreateGraphQLReferenceFromKeyValueString<Output>;
      }
    : Line extends `${infer Key}:${infer Output}`
    ? {
        key: Key;
        type: "query";
        inputs: [];
        output: CreateGraphQLReferenceFromKeyValueString<Output>;
      }
    : never;
