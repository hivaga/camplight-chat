import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://admin:admin@experiments.btlpu04.mongodb.net/?retryWrites=true&w=majority"; // Replace with your MongoDB connection string
const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1,
});


async function connectToMongoDB(client: MongoClient) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
    return client;
  } finally {
    // Ensures that the client will close when you finish/error
    console.log("Enable to create connection to MongoDB!");
    await client.close();
  }
}


export async function getMongoDBClient() {
  try {
    // Perform a ping command to confirm the connection
    await client.db('admin').command({ ping: 1 });
    return client;
  } catch (e) {
    console.log('Trying to reconnect to MongoDB');
    return await connectToMongoDB(client);
  }
}
