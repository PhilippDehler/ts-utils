import { Trim } from "../../ts-string-utils";
import { GraphQLEnum } from "./GraphQLEnum";
import { GraphQLInputObject } from "./GraphQLInput";
import {
  GraphQLMutation,
  ParseGraphQLMutationsFromLines,
} from "./GraphQLMutation";
import {
  GraphQLObject,
  ParseGraphQLObjectReferencesFromLines,
} from "./GraphQLObject";
import { GraphQLQuery, ParseGraphQLQueriesFromLines } from "./GraphQLQuery";
import { GraphQLScalarType, GraphQLScalarTypes } from "./GraphQLScalarTypes";
import { FlatSplit, TrimmedSplit } from "./utils";

export type GraphQLSchemaTypes = [
  "object",
  "input",
  "query",
  "mutation",
  "enum",
];

export type FlatGraphQLSchema =
  | GraphQLEnum
  | GraphQLQuery
  | GraphQLObject
  | GraphQLMutation
  | GraphQLInputObject
  | GraphQLScalarType;

export type ParseGraphQLSchema<
  InputString extends string,
  FlatSchema extends FlatGraphQLSchema[] = [],
  Trimmed = Trim<InputString>,
> = Trimmed extends `${infer Keyword} ${infer Key} {${infer Inner}}${infer Rest}`
  ? Keyword extends "type"
    ? Key extends "Query"
      ? ParseGraphQLSchema<
          Rest,
          [...FlatSchema, ...CreateGraphQLSchemaItemByType<Key, "query", Inner>]
        >
      : Key extends "Mutation"
      ? ParseGraphQLSchema<
          Rest,
          [
            ...FlatSchema,
            ...CreateGraphQLSchemaItemByType<Key, "mutation", Inner>,
          ]
        >
      : ParseGraphQLSchema<
          Rest,
          [...FlatSchema, CreateGraphQLSchemaItemByType<Key, "object", Inner>]
        >
    : Keyword extends "enum"
    ? ParseGraphQLSchema<
        Rest,
        [...FlatSchema, CreateGraphQLSchemaItemByType<Key, "enum", Inner>]
      >
    : Keyword extends "input"
    ? ParseGraphQLSchema<
        Rest,
        [...FlatSchema, CreateGraphQLSchemaItemByType<Key, "input", Inner>]
      >
    : never
  : [...FlatSchema, ...GraphQLScalarTypes];

export type CreateGraphQLSchemaItemByType<
  Key extends string,
  SchemaType extends GraphQLSchemaTypes[number],
  Input extends string,
  Splitted extends string[] = TrimmedSplit<Input, "\n">,
> = Input extends string
  ? SchemaType extends "object"
    ? {
        type: "object";
        key: Key;
        references: ParseGraphQLObjectReferencesFromLines<Splitted>;
      }
    : SchemaType extends "query"
    ? ParseGraphQLQueriesFromLines<Splitted>
    : SchemaType extends "mutation"
    ? ParseGraphQLMutationsFromLines<Splitted>
    : SchemaType extends "input"
    ? {
        type: "input";
        key: Key;
        references: ParseGraphQLObjectReferencesFromLines<Splitted>;
      }
    : SchemaType extends "enum"
    ? { type: "enum"; key: Key; values: FlatSplit<Splitted, " "> }
    : never
  : never;
