import { infer } from "../useful-utils/infer";
import { parserSchemaBuilder } from "./schemaBuilder/parserSchemaBuilder";
import { typeSchemaBuilder } from "./schemaBuilder/typeSchemaBuilder";

const ff = typeSchemaBuilder()
  .addType("string", {
    isDefault: true,
    validator: (input: string) => typeof input === "string",
    parseValue: (value: string) => value,
  })
  .addType("number", {
    isDefault: false,
    validator: (input: number) => typeof input === "number",
    parseValue: (value: string) => Number(value),
  })
  .addType("date", {
    isDefault: false,
    validator: (input: Date) => input instanceof Date,
    parseValue: (value: string) => new Date(value),
  })
  .build();

const { schema, template } = parserSchemaBuilder(
  {
    string: {
      key: "string",
      isDefault: true,
      validator: (input) => typeof input === "string",
      parseValue: (value) => value,
    },
    number: {
      key: "number",
      isDefault: false,
      validator: (input) => typeof input === "number",
      parseValue: (value) => Number(value),
    },
    date: {
      key: "date",
      isDefault: false,
      validator: (input) => input instanceof Date,
      parseValue: (value) => new Date(value),
    },
  },
  {},
)
  .add("string", (b) =>
    b
      .addParser(
        "slice",
        infer([
          { key: "start", type: "number" },
          { key: "end", type: "number" },
        ]),
        "string",
        (input, { start, end }) => input.slice(start, end),
      )
      .addParser("uppercase", [], "string", (input) => input.toUpperCase())
      .addParser("lowercase", [], "string", (input) => input.toLowerCase()),
  )
  .add("number", (b) =>
    b
      .addParser("square", [], "number", (input) => input * input)
      .addParser(
        "add",
        infer([{ key: "addend", type: "number" }]),
        "number",
        (input, { addend }) => input + addend,
      ),
  )
  .add("date", (b) =>
    b.addParser("iso", [], "string", (input) => input.toISOString()),
  )
  .build();

export type TestSchema = typeof schema;
schema.typeDefinition.DEFAULT.key;
const x = template(
  "hallo, {{lastname#string|uppercase|slice(0,1)}} {{firstname#string|uppercase}} {{age#number|square}} {{date#date|iso}}",
);

console.log(
  x({ age: 2, date: new Date(), firstname: "Max", lastname: "Mustermann" }),
);
