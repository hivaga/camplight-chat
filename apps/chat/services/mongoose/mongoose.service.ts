import mongoose from "mongoose";
import {MONGO_DB_URI} from "../mongodb/mongodb.service";

export let mongooseService = mongoose;
export async function initializeDataBase() {
  try {
    if(!mongooseService.connection || mongooseService.connection.readyState !== 1) {
      await mongoose.connect(MONGO_DB_URI, {});
      console.log("Mongoose Database connected successfully.");
    }
  } catch (error) {
    console.error("Mongoose Database connection could not be established!", error);
  }
}

