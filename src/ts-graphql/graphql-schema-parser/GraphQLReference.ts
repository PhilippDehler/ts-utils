import { Trim } from "../../ts-string-utils";
import { Narrow } from "../../ts-utils";
import { GraphQLEnum } from "./GraphQLEnum";
import { GraphQLInputObject } from "./GraphQLInput";
import { GraphQLMutation } from "./GraphQLMutation";
import { GraphQLObject } from "./GraphQLObject";
import { GraphQLQuery } from "./GraphQLQuery";
import { GraphQLScalarType } from "./GraphQLScalarTypes";
import { FlatGraphQLSchema } from "./SchemaParser";
import { SplitMultiple } from "./utils";

export type GraphQLReference = {
  key: string;
  referenceKey: string;
  original: string;
};

export type ExtractGraphQLReference<T extends string> =
  T extends `${infer Inner}!`
    ? ExtractGraphQLReference<Inner>
    : T extends `[${infer Inner}]`
    ? ExtractGraphQLReference<Inner>
    : T;

export type CreateGraphQLReferenceFromKeyValueString<T extends string> =
  SplitMultiple<T, [":", " ", "\n"]> extends [
    infer Key extends string,
    infer Reference extends string,
  ]
    ? {
        key: Key;
        referenceKey: ExtractGraphQLReference<Reference>;
        original: Reference;
      }
    : {
        key: Trim<T>;
        referenceKey: ExtractGraphQLReference<Trim<T>>;
        original: Trim<T>;
      };

export type FindWeak<T extends unknown[], TFind extends unknown> = T extends [
  infer Head,
  ...infer Tail,
]
  ? Head extends TFind
    ? Head
    : TFind extends Head
    ? Head
    : FindWeak<Tail, TFind>
  : unknown;

export type ResolveReference<
  T extends GraphQLReference,
  Schema extends FlatGraphQLSchema[],
> = Narrow<{
  [K in T["key"]]: FindWeak<
    Schema,
    { key: T["referenceKey"] }
  > extends infer ReferencedItem
    ? ReferencedItem extends GraphQLEnum
      ? ReferencedItem["values"][number]
      : ReferencedItem extends GraphQLObject
      ? ResolveReferences<ReferencedItem["references"], Schema>
      : ReferencedItem extends GraphQLQuery
      ? {
          input: ResolveReferences<ReferencedItem["inputs"], Schema>;
          output: ResolveReference<ReferencedItem["output"], Schema>;
        }
      : ReferencedItem extends GraphQLMutation
      ? {
          input: ResolveReferences<ReferencedItem["inputs"], Schema>;
          output: ResolveReference<ReferencedItem["output"], Schema>;
        }
      : ReferencedItem extends GraphQLInputObject
      ? ResolveReferences<ReferencedItem["references"], Schema>
      : ReferencedItem extends GraphQLScalarType
      ? ReferencedItem["scalar"]
      : FindWeak<Schema, { key: T["referenceKey"] }>
    : never;
}>;

export type ResolveReferences<
  T extends any[],
  Schema extends FlatGraphQLSchema[],
  Agg extends object = {},
> = T extends [infer Head, ...infer Tail]
  ? Head extends GraphQLReference
    ? ResolveReferences<Tail, Schema, Agg & ResolveReference<Head, Schema>>
    : never
  : Agg;
