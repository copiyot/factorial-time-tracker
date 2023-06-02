import { DataSource } from "typeorm";
import path from "path";

import { WorkLog } from "./entity/WorkLog";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "DB",
  logging: true,
  entities: [WorkLog],
  migrations: [path.join(__dirname, "./migrations/*")],
  migrationsTableName: "migrations",
});
