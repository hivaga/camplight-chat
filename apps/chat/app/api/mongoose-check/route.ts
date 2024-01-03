import {checkDataBaseConnection} from "../../../services/mongoose/mongoose.service";

const message = 'Database connection alive!'
const error = 'Error while trying to connect to Database';

export async function GET(request: Request) {

  try {
    let responseContent = message;
    const result = await checkDataBaseConnection();

    if (result) {
      responseContent = message;
    } else {
      responseContent = error;
    }
    return new Response(responseContent);
  } catch (e) {
    console.error("API:: Error while trying to check DB connection!", error, e);
    return new Response(error, {status: 500});
  }


}
