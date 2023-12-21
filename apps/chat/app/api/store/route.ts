import {getStore} from "../../../store/app.store";

export async function GET(request: Request) {
  const state = await getStore() ?? '';
  const content = JSON.stringify(state);
  console.log('API:: current store state', state);
  return Response.json(content, {status: 200, headers: {'Content-Type': 'application/json'}});
}
