import { Args, Call, Compose, Lambda } from "../utils/utility-types";
import { Print } from "./utils";

export interface MatchPatternGlobal<
  Pattern extends [left: string, right: string],
  OnMatch extends Lambda,
  TAgg extends unknown[] = [],
> extends Lambda {
  return: Args<this> extends `${string}${Pattern[0]}${infer Match}${Pattern[1]}${infer End}`
    ? Match extends ""
      ? Call<MatchPatternGlobal<Pattern, OnMatch, TAgg>, End>
      : Call<
          MatchPatternGlobal<Pattern, OnMatch, [...TAgg, Call<OnMatch, Match>]>,
          End
        >
    : TAgg;
}

interface StringToPatternChainInput extends PatterChain {
  return: [Args<this>, {}];
}
export interface PatterChain extends Lambda {
  return: [input: unknown, aggregated: unknown];
}

export type PatternChainAggregator<
  T,
  PatternChain extends PatterChain = StringToPatternChainInput,
> = T extends [infer Head, ...infer Tail]
  ? Head extends PatterChain & { args: any }
    ? PatternChainAggregator<Tail, Compose<Head, PatternChain>>
    : PatternChainAggregator<Tail, PatternChain>
  : PatternChain;

export interface ReplacePatternGlobal<
  Pattern extends [string, string],
  TReplace extends Lambda,
> extends Lambda {
  args: string;
  return: Args<this> extends `${infer Start}${Pattern[0]}${infer Match}${Pattern[1]}${infer End}`
    ? Match extends ""
      ? `${Start}${Pattern[0]}${Match}${Pattern[1]}${Call<
          ReplacePatternGlobal<Pattern, TReplace>,
          End
        >}`
      : `${Start}${Print<Call<TReplace, Match>>}${Call<
          ReplacePatternGlobal<Pattern, TReplace>,
          End
        >}`
    : Args<this>;
}
