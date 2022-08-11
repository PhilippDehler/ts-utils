import { GraphQLReference } from "./GraphQLReference";

export type GraphQLInputObject = {
  key: string;
  type: "input";
  references: GraphQLReference[];
};
