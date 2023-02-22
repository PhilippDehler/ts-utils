import { TypeDefinitions } from "./schemaBuilder/typeSchemaBuilder";
import {
  ExtractParserInformations,
  ValidateTemplate,
} from "./templateStringValidator/templateValidator";

export function createTemplateBuilder<
  TSchema extends {
    typeDefinition: TypeDefinitions;
  },
>(schema: TSchema) {
  return function template<Template extends string>(
    template: Narrow<ValidateTemplate<Template, TSchema>>,
  ) {
    return (params: Params<Template, TSchema>) => {
      debugger;
      return (template as string).replace(/{{.*?}}/g, (r) => {
        const k = r.slice(2, -2);
        const { key, operationChain } = parseTemplateValue(k, schema);
        const replaceValue = params[key as keyof typeof params];
        if (replaceValue === undefined)
          throw new Error("Key is missing in Translation:" + key);
        const result = operationChain.reduce(
          (v, chain) => chain(v),
          replaceValue,
        ) as string;
        return result;
      });
    };
  };
}

function parseTemplateValue<
  TSchema extends {
    typeDefinition: TypeDefinitions;
  },
>(k: string, schema: TSchema) {
  const [def, ...operations] = k.split("|");
  if (!def) throw new Error("Invalid template value: " + k);
  const [key, type] = def.split("#") ?? "";
  if (!key) throw new Error(key + "is not a valid param");
  return {
    key: key,
    operationChain: parseOperationChain<string, TSchema>(
      operations,
      getSchemaType<string, TSchema>(type, schema),
      schema,
    ),
  };
}

function parseOperationChain<
  Type extends string,
  TSchema extends {
    typeDefinition: TypeDefinitions;
  },
>(input: string[], type: Type, schema: TSchema) {
  const schemaType = getSchemaType(type, schema);
  const operationChain: ((input: any) => any)[] = [];
  for (let i = 0; i < input.length; i++) {
    const currentOperation = input[i];
    // type TestOperation = "toDate|formatTime|slice(0,1)"
    let [operationDef, args] = currentOperation.split("(");
    args = args?.slice(0, args.length - 1) ?? "";
    //@ts-ignore
    const operationChainItem = schema[schemaType][operationDef];
    operationChain.push((input: any) =>
      operationChainItem.parser(
        input,
        parseArgs(getArgs(args), operationChainItem.args, schema),
      ),
    );
  }
  return operationChain;
}

function getArgs(input: string) {
  const args = input?.slice(0, input.length - 1) ?? "";
  return args.split(",");
}

function getSchemaType<
  Type extends string,
  TSchema extends {
    typeDefinition: TypeDefinitions;
  },
>(
  type: Type | null,
  schema: TSchema,
): keyof TSchema["typeDefinition"] & string {
  if (type && schema.typeDefinition[type]) return type;
  return schema.typeDefinition.DEFAULT.key;
}

function parseArgs<TSchema extends TypeDefinitions>(
  args: string[],
  argsDefinition: { key: string; type: keyof TSchema["typeDefinition"] }[],
  schema: { typeDefinition: TSchema },
): any {
  const res: { key: string; value: unknown }[] = [];
  for (let i = 0; i < argsDefinition.length; i++) {
    const definition = argsDefinition[i];
    if (args[i] === undefined)
      throw new Error("Missing argument: " + definition.key);
    res.push({
      key: definition.key,
      // TODO: Fix this
      // @ts-ignore
      value: schema["typeDefinition"][definition.type].parseValue(args[i]),
    });
    i++;
  }
  return res.reduce((agg, { key, value }) => ({ ...agg, [key]: value }), {});
}

type TemplateMatcher = ["{{", "}}"];

type Params<
  Input extends string,
  TSchema extends {
    typeDefinition: TypeDefinitions;
  },
  P extends Record<string, any> = {},
> = Input extends `${string}${TemplateMatcher[0]}${infer TemplateKey}${TemplateMatcher[1]}${infer Rest}`
  ? ExtractParserInformations<
      TemplateKey,
      TSchema["typeDefinition"]["DEFAULT"]["key"]
    > extends {
      key: infer Key extends string;
      type: infer Type extends string;
    }
    ? Params<
        Rest,
        TSchema,
        P & {
          [K in Key]: ReturnType<TSchema["typeDefinition"][Type]["parseValue"]>;
        }
      >
    : Params<Rest, TSchema, P & {}>
  : P;

export type Narrowable = string | number | bigint | boolean;
export type Narrow<A> =
  | (A extends Narrowable ? A : never)
  | (A extends [] ? [] : never)
  | {
      [K in keyof A]: A[K] extends Function ? A[K] : Narrow<A[K]>;
    };

type NarrowStructure<A> =
  | (A extends Narrowable ? A : never)
  | (A extends [] ? [] : never)
  | {
      [K in keyof A]: A[K] extends Function ? A[K] : Narrow<A[K]>;
    };
