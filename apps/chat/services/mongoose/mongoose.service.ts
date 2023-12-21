import mongoose, {ConnectionStates} from "mongoose";
import {MONGO_DB_URI} from "../mongodb/mongodb.service";

const mongooseClient = mongoose;

async function establishDataBaseConnection() {
  try {
    if (!mongooseClient.connection || mongooseClient.connection.readyState !== ConnectionStates.connected) {
      await mongooseClient.connect(MONGO_DB_URI, {});
      console.log("Mongoose Database connected successfully.");
    }
  } catch (error) {
    console.error("Mongoose Database connection could not be established!", error);
  }
}

let lastPingTime = 0;
export async function checkDataBaseConnection() {
  try {
    const currentTime = new Date().getTime();
    if(currentTime - lastPingTime > 30000) {
      lastPingTime = currentTime;
      await mongooseClient.connection.db.command({ping: 1});
      console.log("Mongoose Database connection alive!")
    }
    return true;
  } catch (error) {
    console.error("Mongoose Database ping failed!", error);
    return false;
  }
}

const maxAttempts = 10;

export async function getMongooseClient(attempts: number = 0,) {

  if (attempts >= maxAttempts) {
    throw new Error(`Mongoose database connection could not be established! Attempts: '${attempts}'.`);
  }

  try {
    await establishDataBaseConnection();
    await checkDataBaseConnection();
    return mongooseClient;
  } catch (error) {
    console.warn(`Mongoose trying to reconnect to Database. Attempts: '${attempts}'`);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000 * attempts)
    });
    return getMongooseClient(attempts++);
  }
}
