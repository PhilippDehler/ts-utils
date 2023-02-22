import {
  $Remove,
  Filter,
  FlatMap,
  Init,
  LastExt,
  Length,
  Map,
  QuickFind,
} from "../../ts-array-utils";
import { Args, Call, Compose, Lambda } from "../../ts-lambda";
import {
  $Join,
  $Split,
  $Trim,
  Includes,
  Join,
  Replace,
  Split,
} from "../../ts-string-utils";
import { Narrow } from "../../ts-utils";
import { FindWeak } from "../graphql-schema-parser/GraphQLReference";
import { input } from "./GraphQLInput";
import { query } from "./GraphQLQuery";
import { variable } from "./GraphQLVariables";
import {
  Empty,
  ParseGraphQLQuery,
  root,
  TestInput,
  type,
  value,
} from "./SchemaParser";

type TrimmedSplit<T extends string, TSplit extends string> = Map<
  Split<T, TSplit>,
  $Trim
> extends string[]
  ? Map<Split<T, TSplit>, $Trim>
  : never;

type Remove<T extends any[], TRemove> = Call<$Remove<TRemove>, T>;
type SplitParenthensisInput<T extends string> = FlatMap<
  TrimmedSplit<T, " "> extends string ? Remove<TrimmedSplit<T, " ">, ""> : [],
  $Split<"\n">
>;

type UpdateLastElementFromStack<
  T extends unknown[],
  $Update extends Lambda,
> = T extends [...infer Init, infer Last] ? [...Init, Call<$Update, Last>] : [];
type RemoveLastElementFromStack<T extends unknown[]> = Init<T>;

export type TokenizeParenthensis<
  T extends string,
  Splitted extends unknown[] = SplitParenthensisInput<T>,
  Stack extends unknown[][] = [[]],
  Result extends unknown[] = [],
  Counter extends unknown[] = [],
> = Splitted extends [infer Head, ...infer Tail]
  ? Head extends "{"
    ? TokenizeParenthensis<
        T,
        Tail,
        Push<
          Push<
            Init<Stack>,
            Push<
              Init<LastExt<Stack, unknown[]>>,
              Join<
                [
                  `UNIQUE${Length<Counter>}`,
                  LastExt<LastExt<Stack, unknown[]>, string>,
                ],
                "||"
              >
            >
          >,
          [`UNIQUE${Length<Counter>}`]
        >,
        Result,
        Increment<Counter>
      >
    : Head extends "}"
    ? TokenizeParenthensis<
        T,
        Tail,
        Init<Stack>,
        Push<Result, Join<LastExt<Stack, string[]>, "%">>,
        Increment<Counter>
      >
    : TokenizeParenthensis<
        T,
        Tail,
        Push<Init<Stack>, Push<LastExt<Stack, string[]>, Head>>,
        Result,
        Counter
      >
  : [...Map<Stack, $Join<"%">>, ...Result];

type Increment<T extends unknown[]> = [...T, unknown];
type Push<A, B> = A extends any[] ? [...A, B] : never;

type ParseGraphQLQueryString<
  A extends string,
  B extends TokenizeParenthensis<A> = TokenizeParenthensis<A>,
> = ParseTokenizedParenthensisString<B[0], B>;

type ParseTokenizedParenthensisString<
  First extends string,
  Tokenized extends unknown[],
  Keys = Split<First, "%">,
  TAgg extends object = {},
> = Keys extends [infer Key extends string, ...infer Rest]
  ? Includes<Key, "UNIQUE"> extends true
    ? Split<Key, "||"> extends [
        infer ID extends string,
        infer TokenKey extends string,
      ]
      ? ParseTokenizedParenthensisString<
          First,
          Tokenized,
          Rest,
          TAgg & {
            [K in TokenKey]: ParseTokenizedParenthensisString<
              QuickFind<Remove<Tokenized, First>, `${string}${ID}${string}`>,
              Tokenized
            >;
          }
        >
      : ParseTokenizedParenthensisString<First, Tokenized, Rest, TAgg>
    : ParseTokenizedParenthensisString<
        First,
        Tokenized,
        Rest,
        TAgg & { [K in Key]: string }
      >
  : Narrow<TAgg>;

type DefinitionBlocks<T extends string> = Split<T, "\n}">;

type Delimiter = ["{", "}", "(", ")", ":", "...", " ", "\n"];

interface $FlatDefinition extends Lambda<string> {
  return: FlatDefinition<Args<this>>;
}
interface $ReplaceDelimiter<D extends string> extends Lambda<string> {
  return: Replace<Args<this>, D, `%%${D}%%`>;
}
//TODO: Replace with Splitty
export type ComposedReplacer = Compose<
  Compose<
    Compose<
      Compose<
        Compose<
          Compose<
            Compose<$ReplaceDelimiter<"{">, $ReplaceDelimiter<"}">>,
            $ReplaceDelimiter<"(">
          >,
          $ReplaceDelimiter<")">
        >,
        $ReplaceDelimiter<":">
      >,
      $ReplaceDelimiter<"...">
    >,
    $ReplaceDelimiter<" ">
  >,
  $ReplaceDelimiter<"\n">
>;

export type TestParserInput = ParserInput<TestInput>;
type A = ParseGraphQLQuery<TestParserInput>;
export type TestReference = A[0];

export type ResovleQueryVariableReference<T extends unknown[]> = Filter<
  T,
  { [type]: typeof variable }
> extends { [value]: unknown; [type]: typeof variable; [root]: unknown }[]
  ? {
      [K in Filter<
        T,
        { [type]: typeof variable }
      >[number][typeof root]]: typeof value extends keyof FindWeak<
        Filter<T, { [type]: typeof variable }>,
        { [root]: K }
      >
        ? FindWeak<
            Filter<T, { [type]: typeof variable }>,
            { [root]: K }
          >[typeof value]
        : never;
    }
  : never;

export type ResovleQueryInputReference<T extends unknown[]> = Filter<
  T,
  { [type]: typeof input }
> extends { [value]: unknown; [type]: typeof input; [root]: unknown }[]
  ? {
      [K in Filter<
        T,
        { [type]: typeof input }
      >[number][typeof root]]: typeof value extends keyof FindWeak<
        Filter<T, { [type]: typeof input }>,
        { [root]: K }
      >
        ? FindWeak<
            Filter<T, { [type]: typeof input }>,
            { [root]: K }
          >[typeof value]
        : never;
    }
  : never;

export type ResolveQueryReference<T extends unknown[]> = FindWeak<
  T,
  { [root]: typeof query }
> extends infer Ref extends { [root]: typeof query; [value]: string }
  ? {
      variables: ResovleQueryVariableReference<T>;
      input: ResovleQueryInputReference<T>;
      output: {
        [K in Ref[typeof value]]: "Place object ref";
      };
    }
  : never;

export type ResolveObjectReference<T> = T;

type B = ResolveQueryReference<TestReference>;

type FlatDefinition<T extends string> = Remove<
  Remove<Remove<Split<Call<ComposedReplacer, T>, "%%">, "">, " ">,
  "\n"
>;

declare const object: unique symbol;
export type CreateObjectReference = { [object]: Empty };

export type ParserInput<T extends string> = Remove<
  Map<DefinitionBlocks<T>, $FlatDefinition>,
  []
>;
