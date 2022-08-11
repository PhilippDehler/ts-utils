import { CreateGraphQLReferenceFromKeyValueString, GraphQLReference } from "./GraphQLReference";

export type GraphQLObject = {
  key: string;
  type: "object";
  references: GraphQLReference[];
};

export type ParseGraphQLObjectReferencesFromLines<
  Lines extends string[],
  References extends GraphQLReference[] = [],
> = Lines extends [infer FirstLine extends string, ...infer Rest extends [] | string []]
    ? ParseGraphQLObjectReferencesFromLines<
        Rest,
        [
          ...References,
          CreateGraphQLReferenceFromKeyValueString<FirstLine>
        ]
      >
  : References;
