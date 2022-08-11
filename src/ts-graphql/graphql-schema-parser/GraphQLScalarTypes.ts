export type GraphQLScalarTypes = [
  { type: "scalar"; key: "Int"; scalar: number },
  { type: "scalar"; key: "Float"; scalar: number },
  { type: "scalar"; key: "String"; scalar: string },
  { type: "scalar"; key: "Boolean"; scalar: boolean },
];

export type GraphQLScalarType = GraphQLScalarTypes[number];
