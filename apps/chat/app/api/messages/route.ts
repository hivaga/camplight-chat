import {getChatMessages} from "../../../services/mongoose/chat.service";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
  const  messages = await getChatMessages();
  console.log('API:: chat messages', JSON.stringify(messages));
  return Response.json(messages, {status: 200});
}

export async function POST(request: Request) {
  const body = await request.json();
  const  messages = await getChatMessages(body);
  console.log('API:: chat message', JSON.stringify(messages));
  return Response.json(messages, {status: 200});
}
