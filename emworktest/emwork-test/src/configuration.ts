import { DataSource } from "typeorm";
import { Task } from "./task/entities/task.entity";

export default () => ({
  port: 3333,
  database: {
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT, 10) || 5432
  }
});

//db configuration
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'emwork',
  password: 'emworktest',
  database: 'emworktestdb',
  entities: [Task],
  synchronize: true,
  logging: true,
})

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })