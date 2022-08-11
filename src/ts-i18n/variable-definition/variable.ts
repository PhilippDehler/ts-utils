import { ParserDefinition } from "../parserDefinition";
import {
  MatchPatternGlobal,
  PatterChain,
  PatternChainAggregator,
  ReplacePatternGlobal,
} from "../utils/PatternMatcher";
import {
  Args,
  Call,
  EmptyLambda,
  KeyValuePair,
  Lambda,
} from "../utils/utility-types";
import { ValidateVariableString } from "./schemaCreationValidators";

export type VariableMatchStart = "{{";
export type VariableMatchEnd = "}}";
export type VariableMatchPattern = [VariableMatchStart, VariableMatchEnd];

export type ParseInputToVariablesDefinitions =
  MatchVariableStrings<BuildVariableDefinition>;

export type MatchVariableStrings<L extends Lambda = EmptyLambda> =
  MatchPatternGlobal<VariableMatchPattern, L>;

export type BuildVariableDefinitionsFromInput<
  T,
  TypeSchema extends any[],
> = Call<
  ReplacePatternGlobal<
    VariableMatchPattern,
    ValidateVariableString<TypeSchema>
  >,
  T
>;

export type BuildVariableDefinition<
  ChainParserDefinition = ParserDefinition,
  PatternParserChain extends PatterChain[] = [],
> = ChainParserDefinition extends [infer Head, ...infer Tail]
  ? Head extends any[]
    ? Tail extends any[]
      ? BuildVariableDefinition<
          Tail,
          [...PatternParserChain, CreateChainParserItem<Head>]
        >
      : never
    : never
  : PrettifyParserChainResult<PatternChainAggregator<PatternParserChain>>;

type CreateChainParserItem<T extends any[]> = ChainParserItem<
  T[0] extends infer Key ? (Key extends string ? Key : never) : never,
  T[1] extends infer Pattern
    ? Pattern extends string
      ? Pattern
      : never
    : never,
  T[2] extends undefined ? "match" : T[2],
  T[3] extends undefined ? "no-match" : T[3],
  T[4] extends undefined ? false : T[4] extends true ? true : false
>;

interface PrettifyParserChainResult<L extends Lambda> extends Lambda {
  //extracting
  res: Call<L, Args<this>> extends [any, infer Context] ? Context : never;
  //prettier
  return: { [Key in keyof this["res"]]: this["res"][Key] };
}

interface ChainParserItem<
  Key extends string,
  Pattern extends string,
  OnMatch = "match",
  NoMatch = "no-match",
  Infer extends boolean = false,
> extends Lambda {
  return: Args<this> extends [infer Input, infer Type]
    ? Pattern extends ""
      ? ["", Type & KeyValuePair<Key, Input>]
      : Input extends `${infer Start}${Pattern}${infer Match}`
      ? [
          Infer extends true ? Match : Start,
          Type & KeyValuePair<Key, OnMatch extends "match" ? Match : OnMatch>,
        ]
      : [
          Input,
          Type & KeyValuePair<Key, NoMatch extends "no-match" ? null : NoMatch>,
        ]
    : never;
}
