import { infer } from "./../utils/infer";

export const parserDefinition = infer([
  ["serializer", `|`, "match", null, false],
  ["type", `:`],
  ["required", `?`, false, true, true],
  ["name", ``],
]);
export type ParserDefinition = typeof parserDefinition;

function dosomethingWithAString(input: string, fn: (input: string) => string) {
  return fn(input);
}

dosomethingWithAString("asfagag", (input) => input.toLowerCase());
