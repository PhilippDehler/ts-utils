import { Narrow } from "../../ts-utils";
import { ResolveReference } from "./GraphQLReference";
import { ParseGraphQLSchema } from "./SchemaParser";

type TestSchema = Narrow<
  ParseGraphQLSchema<`
  type Character {
      name: String!
      dogs: Dog
    }
  type Query {
    me(name: String!, abc:String!): Character
    me2(name: String!): Character
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
`>
>;

type TestQuery = ` me {
  name
  dogs3 {
    nickname
    name
    dogs {
      nickname
      name
    }
    
  }
  dogs {
    nickname
    name
  }
  name2
}`;
type xX = TestSchema[0];
type X = ResolveReference<
  { referenceKey: "me2"; original: "Name"; key: "me2" },
  TestSchema
>;
