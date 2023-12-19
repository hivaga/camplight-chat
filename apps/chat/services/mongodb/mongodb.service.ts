import {MongoClient, ServerApiVersion} from "mongodb";

export const MONGO_DB_URI  = "mongodb+srv://admin:admin@experiments.btlpu04.mongodb.net/?retryWrites=true&w=majority"; // Replace with your MongoDB connection string
const client = new MongoClient(MONGO_DB_URI, {
  serverApi: ServerApiVersion.v1,
});

async function connectToMongoDB(client: MongoClient) {
  try {
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ping: 1});
    console.log("MongoDB Database connected successfully.");
    return client;
  }catch (e) {
    console.error("MongoDB Database connection could not be established!");
  } finally {
    await client.close();
  }
}

export async function getMongoDBClient() {
  try {
    // Perform a ping command to confirm the connection
    await client.db('admin').command({ping: 1});
    return client;
  } catch (e) {
    console.warn('Trying to reconnect to MongoDB.');
    return await connectToMongoDB(client);
  }
}
