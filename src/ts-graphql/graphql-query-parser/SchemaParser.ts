import { Map } from "../../ts-array-utils";
import { Args, Lambda } from "../../ts-lambda";
import { ParseFragment } from "./GraphQLFragment";
import { ParseMuation } from "./GraphQLMutation";
import { ParseQuery } from "./GraphQLQuery";

export declare const root: unique symbol;
export declare const type: unique symbol;
export declare const value: unique symbol;
export declare const empty: unique symbol;
export type Empty = typeof empty;
export type CreateRootReference<T> = { [root]: T };
export type ValueRef<Reference, Value, Type> = {
  [value]: Value;
  [type]: Type;
} & CreateRootReference<Reference>;
export type GraphQLQueryTypes = ["query", "mutation", "fragment"];

export type TestInput = `
query HeroNameAndFriends($episode: Episode $abc: abc) {
  hero(episode: $episode abc: $abc) {
    ...comparisonFields
    id
    strength
    someNestedField {
      ...comparisonFields
    }
  }
}

fragment comparisonFields on Character {
  name
  appearsIn
  friends {
    name
  }
}`;

type TestInput2 = `Character {
  name
  appearsIn
  friends {
    name
  }
}
`;

export type ParseFlatDefinition<FlatDef> = FlatDef extends [
  infer Head,
  ...any[],
]
  ? Head extends "fragment"
    ? ParseFragment<FlatDef>
    : Head extends "query"
    ? ParseQuery<FlatDef>
    : Head extends "mutation"
    ? ParseMuation<FlatDef>
    : Head extends "{"
    ? ParseQuery<FlatDef>
    : never
  : never;
interface $ParseGraphQLQuery extends Lambda {
  return: ParseFlatDefinition<Args<this>>;
}
export type ParseGraphQLQuery<T extends unknown[]> = Map<T, $ParseGraphQLQuery>;

export declare const val: unique symbol;

//TODO: Params & Input
/**
 * TODO:
 * Fragment Reference
 * unique symbol instead of string in the end of the type
 * Params & Input in query and mutation
 * Fields
 * Arguments
 * Aliases
 *
 */
