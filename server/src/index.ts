import "reflect-metadata";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { buildSchema } from "type-graphql";
import http from "http";
import cors from "cors";
import { json } from "body-parser";

import { WorkLogResolver } from "./resolvers/WorkLogResolver";
import { AppDataSource } from "./dataSourceConfig";

(async () => {
  (await AppDataSource.initialize()).runMigrations();
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [WorkLogResolver],
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/graphql",
    cors({
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true,
    }),
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );

  await new Promise(() => httpServer.listen({ port: 4040 }));
  console.log(`🚀 Server ready at http://localhost:4040/graphql`);
})();
