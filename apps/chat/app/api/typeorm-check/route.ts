
import {initializeDataBase} from "../../../services/typeorm/typeorm.service";


const message = 'Database connection alive!'
const error = 'Error while trying to connect to Database';
export async function GET(request: Request) {
  try {
    await initializeDataBase();
    console.log(message);
    return new Response(message);
  } catch (e) {
    return new Response(error, {status: 500});
  }
}
