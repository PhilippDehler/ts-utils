import { Narrow } from "..";

export interface TypeDefinition {
  key: string;
  isDefault: boolean;
  validator: (input: unknown) => boolean;
  parseValue: (value: string) => unknown;
}
export type TypeDefinitions = Record<string, TypeDefinition>;

export function typeSchemaBuilder<T extends TypeDefinitions>(
  types: T = {} as T,
) {
  const self = {
    types,
    addType<Key extends string, TDefault extends boolean, TReturn>(
      key: Narrow<Key>,
      typeDefinition: {
        isDefault: TDefault;
        validator: (input: TReturn) => boolean;
        parseValue: (value: string) => TReturn;
      },
    ) {
      return typeSchemaBuilder<
        T & {
          [K in Key]: {
            key: K & string;
            isDefault: TDefault;
            validator: (input: TReturn) => boolean;
            parseValue: (value: string) => TReturn;
          };
        }
      >(
        Object.assign(self.types, {
          [key as string]: { ...typeDefinition, key },
        }) as T & {
          [K in Key]: {
            key: K & string;
            isDefault: TDefault;
            validator: (input: TReturn) => boolean;
            parseValue: (value: string) => TReturn;
          };
        },
      );
    },
    build() {
      return self.types;
    },
  };
  return self;
}
