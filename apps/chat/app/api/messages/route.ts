import {ChatMessageFilter, getChatMessages} from "../../../services/mongoose/chat.service";
import {NextRequest} from "next/server";


export async function GET(request: NextRequest) {
  try {
    const filter:ChatMessageFilter = {type:'date', date: 0};
    const messages = await getChatMessages(filter);
    console.log('API.messages:: GET chat message:', filter, messages.length);
    return Response.json(messages, {status: 200});
  } catch (e) {
    console.log('API.messages:: Error while trying to get messages:',e, request);
  }

}

export async function POST(request: NextRequest) {
  try {
    const chatFilter = await request.json() as ChatMessageFilter;
    const messages = await getChatMessages(chatFilter);
    console.log('API.messages:: POST chat message:', chatFilter, messages.length);
    return Response.json(messages, {status: 200});
  } catch (e) {
    console.log('API.messages:: Error while trying to get messages:',e, request);
  }

}
