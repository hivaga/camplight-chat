import {getMongoDBClient} from "../../../services/mongodb/mongodb.service";

const message = 'Database connection alive!'
const error = 'Error while trying to connect to Database';
export async function GET(request: Request) {
  try {
    const client = await getMongoDBClient();
    // Perform database operations here
    console.log("API::",message);
    return new Response(message);
  } catch (e) {
    return new Response(error, {status: 500});
  }
}
