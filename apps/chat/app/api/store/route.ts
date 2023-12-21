import {getStore} from "../../../store/app.store";

export async function GET(request: Request) {
  const state = await getStore() ?? '';
  const content = JSON.stringify(state);
  console.log('API:: GET current store state', state);
  return Response.json(content, {status: 200, headers: {'Content-Type': 'application/json'}});
}


export async function POST(request: Request) {
  const state = await getStore() ?? '';
  const content = JSON.stringify(state);
  console.log('API:: POST current store state', state);
  return Response.json(content, {status: 200, headers: {'Content-Type': 'application/json'}});
}
