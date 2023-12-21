import {checkDataBaseConnection} from "../../../services/mongoose/mongoose.service";

const message = 'Database connection alive!'
const error = 'Error while trying to connect to Database';
export async function GET(request: Request) {
  let responseContent:string = error;
  try {
    const result = await checkDataBaseConnection();

    if(result) {
      responseContent = message;
    }else{
      responseContent = error;
    }
  } catch (e) {
    return new Response(error, {status: 500});
  }

  return new Response(responseContent);
}
