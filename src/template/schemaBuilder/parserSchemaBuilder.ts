import { createTemplateBuilder, Narrow } from "..";
import { TypeDefinitions } from "./typeSchemaBuilder";

export function parserSchemaBuilder<
  T extends TypeDefinitions,
  TParser extends {} = {},
>(input: T, parser: TParser) {
  const self = {
    parser,
    add: <TP, Key extends keyof T>(
      key: Narrow<Key>,
      parserDefinitions: (
        builder: ReturnType<
          typeof parserBuilder<ReturnType<T[Key]["parseValue"]>, T>
        >,
      ) => { build: () => TP },
    ) => {
      const builder = parserBuilder<ReturnType<T[Key]["parseValue"]>, T>(
        {} as any,
      );
      const parser = parserDefinitions(builder as any).build();
      return parserSchemaBuilder<T, TParser & { [K in Key]: typeof parser }>(
        input,
        Object.assign(self.parser, {
          [key as string]: parser,
        }) as any,
      );
    },
    build() {
      const defaultType = Object.values(input).find((v) => v.isDefault);
      if (!defaultType) throw new Error("No default type defined");
      type Schema = {
        typeDefinition: {
          DEFAULT: ExtractDefault<typeof input>;
        } & typeof input;
      } & typeof self.parser;

      const schema = {
        typeDefinition: {
          ...input,
          DEFAULT: defaultType as ExtractDefault<typeof input>,
        },
        ...self.parser,
      };
      const template = createTemplateBuilder(schema);
      return {
        template,
        schema,
      };
    },
  };
  return self;
}

function parserBuilder<
  Input,
  T extends TypeDefinitions,
  TParser extends {} = {},
>(parser: TParser) {
  const self = {
    parser,
    addParser<
      Key extends string,
      TArgs extends { key: string; type: string }[],
      TReturn extends keyof T,
    >(
      key: Narrow<Key>,
      args: TArgs,
      returnType: Narrow<TReturn>,
      parser: (
        input: Input,
        args: ExtractArgs<TArgs, T>,
      ) => ReturnType<T[TReturn]["parseValue"]>,
    ) {
      return parserBuilder<
        Input,
        T,
        TParser & {
          [K in Key]: {
            parser: typeof parser;
            key: Key;
            args: TArgs;
            returnType: TReturn;
          };
        }
      >(
        Object.assign(self.parser, {
          [key as string]: { parser, key, args, returnType },
        }) as any,
      );
    },
    build() {
      return self.parser;
    },
  };
  return self;
}

type ExtractDefault<
  T extends Record<
    string,
    {
      isDefault: boolean;
      validator: (input: unknown) => boolean;
      parseValue: (value: string) => unknown;
    }
  >,
> = {
  [K in keyof T]: T[K]["isDefault"] extends true ? T[K] & { key: K } : never;
}[keyof T];

type ExtractArgs<
  T,
  X extends Record<
    string,
    {
      isDefault: boolean;
      validator: (input: unknown) => boolean;
      parseValue: (value: string) => unknown;
    }
  >,
> = T extends [infer Head extends { key: string; type: keyof X }, ...infer Tail]
  ? {
      [K in Head["key"]]: ReturnType<X[Head["type"]]["parseValue"]>;
    } & ExtractArgs<Tail, X>
  : {};
