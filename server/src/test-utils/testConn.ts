import { DataSource } from "typeorm";

export const testConn = (drop: boolean = false) => {
  return new DataSource({
    type: "sqlite",
    database: "typegraphql-test",
    synchronize: drop,
    dropSchema: drop,
    entities: [__dirname + "/../entity/*.*"],
  });
};
