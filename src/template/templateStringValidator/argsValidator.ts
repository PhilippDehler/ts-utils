import { ErrorMsg, NeedsSuggestions, SuggestionMsg } from "../utilityTypes";
import { test } from "../utils";

export interface ArgDefinition<Type extends string = string> {
  key: string;
  type: Type;
}

export type ValidateArg<
  Arg extends string,
  ArgDef extends ArgDefinition,
> = Arg extends ""
  ? SuggestionMsg<`${Arg}[Expected Type:${ArgDef["type"] & string}]`>
  : NeedsSuggestions<Arg> extends true
  ? SuggestionMsg<`${Arg}[Expected Type:${ArgDef["type"] & string}]`>
  : Arg;

type TestValidateArg0 = ValidateArg<"?", { key: "start"; type: "string" }>;
test<TestValidateArg0>("?[Expected Type:string]");

type TestValidateArg1 = ValidateArg<"a", { key: "start"; type: "string" }>;
test<TestValidateArg1>("a");

type TestValidateArg2 = ValidateArg<"", { key: "start"; type: "string" }>;
test<TestValidateArg2>("[Expected Type:string]");

export type ValidateArgs<
  Args extends string,
  TArgDefinition extends ArgDefinition[],
> = Args extends `${infer FirstArg},${infer Rest}`
  ? TArgDefinition extends [
      infer H extends ArgDefinition,
      ...infer Tail extends ArgDefinition[],
    ]
    ? `${ValidateArg<FirstArg, H>}${Rest extends ""
        ? Tail extends []
          ? ""
          : ","
        : ","}${ValidateArgs<Rest, Tail>}`
    : ErrorMsg<`Didn't expect Arg ${FirstArg}`>
  : TArgDefinition extends [
      infer H extends ArgDefinition,
      ...infer Tail extends ArgDefinition[],
    ]
  ? `${ValidateArg<Args, H>}${Tail extends [] ? "" : ","}${ValidateArgs<
      "",
      Tail
    >}`
  : Args extends ""
  ? Args
  : ErrorMsg<`Didn't expect Arg ${Args}`>;

test<TestValidateArgs>("some,[Expected Type:number]");
type TestValidateArgs = ValidateArgs<
  "some,",
  [{ type: "string"; key: "a" }, { type: "number"; key: "b" }]
>;

test<TestValidateArgs0>("some,4");
type TestValidateArgs0 = ValidateArgs<
  "some,4",
  [{ type: "string"; key: "a" }, { type: "number"; key: "b" }]
>;

test<TestValidateArgs1>("some,[Error:Didn't expect Arg 4]");
type TestValidateArgs1 = ValidateArgs<"some,4", [{ type: "string"; key: "a" }]>;

test<TestValidateArgs2>("some,[Expected Type:number]");
type TestValidateArgs2 = ValidateArgs<
  "some",
  [{ type: "string"; key: "a" }, { type: "number"; key: "b" }]
>;
