import { getMongoDBClient } from '../../../services/mongodb';

export async function GET(request: Request) {
  try {
    const client = await getMongoDBClient();
    // Perform database operations here
    console.log('MongoDB Client is Alive');
    return new Response('MongoDB connection successful!');
  } catch (e) {
    return new Response("Error while trying to connect to MongoDB", {status: 500});
  }
}
