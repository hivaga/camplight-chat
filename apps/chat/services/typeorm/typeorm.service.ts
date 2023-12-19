import 'reflect-metadata'
import {ChatMessage} from "../../model/typeorm/chat-message";
import {DataSource} from "typeorm";
import {MongoConnectionOptions} from "typeorm/driver/mongodb/MongoConnectionOptions";

const dbOptions: MongoConnectionOptions = {
  url: "mongodb+srv://experiments.btlpu04.mongodb.net/?retryWrites=true&w=majority",
  type: "mongodb",
  username: "admin",
  password: "admin",
  entities: [ChatMessage],
  synchronize: true,
  database: "admin"
}
export const databaseSource = new DataSource(dbOptions);

export async function initializeDataBase() {
  if (!databaseSource.isInitialized) {
    try {
      await databaseSource.initialize();
      console.log("TypeORM Database connected successfully.");
      return databaseSource;
    } catch (error) {
      console.error("TypeORM Database connection could not be established!", error);
    }
  }
}
