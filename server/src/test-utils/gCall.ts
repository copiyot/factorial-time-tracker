import { graphql, GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { Maybe } from "graphql/jsutils/Maybe";

import { WorkLogResolver } from "../resolvers/WorkLogResolver";

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
}

let schema: GraphQLSchema;

export const gCall = async ({ source, variableValues }: Options) => {
  if (!schema) {
    schema = await await buildSchema({
      resolvers: [WorkLogResolver],
    });
  }
  return graphql({
    schema,
    source,
    variableValues,
  });
};
