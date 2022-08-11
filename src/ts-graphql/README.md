```

// Parser for a GraphQlSchema
// Creates a Flat list with all keywords,  references and values
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

// resolves a reference of the flat graphql schema
type X = ResolveReference<
  { referenceKey: "me2"; original: "Name"; key: "me2" },
  TestSchema
>;


// output:
type X = {
    me2: {
        input: {
            name: string;
        };
        output: {
            Character: {
                name: string;
                dogs: {
                    name: string;
                    nickname: number;
                    suggestedNames: Narrow<Narrow<Narrow<Narrow<"Wuff" | "Bello">>>>;
                };
            };
        };
    };
}

```

## TODOs

- Lists and optionals
- \*.graphql file parser for the frontend query definition
