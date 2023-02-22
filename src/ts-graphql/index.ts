import { Narrow } from "../ts-utils";
import { ResolveReference } from "./graphql-schema-parser/GraphQLReference";
import { ParseGraphQLSchema } from "./graphql-schema-parser/SchemaParser";

type TestSchema = Narrow<
  ParseGraphQLSchema<`
  type Character {
      name: String!
      dogs: Dog
    }
    enum Name {
      Wuff
      Bello
    }
    type Dog {
      name: String!
      nickname: Int!
      suggestedNames: Name
    }
    type Query {
      me(name: String!, abc:String!): Character
      me2(name: String!): Character
    }
`>
>;

type X = ResolveReference<
  { referenceKey: "Character"; original: "Name"; key: "Character" },
  TestSchema
>;
