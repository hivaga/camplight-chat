import {ChatMessageFilter, getChatMessages} from "../../../services/mongoose/chat.service";
import {NextRequest, NextResponse} from "next/server";


export async function GET(request: NextRequest) {
  try {
    const filter:ChatMessageFilter = {type:'date', date: 0};
    const messages = await getChatMessages(filter);
    console.log('API.messages:: GET chat message:', filter, messages.length);
    return Response.json(messages, {status: 200});
  } catch (e:any) {
    console.error('API.messages:: Error while trying to get messages:',e, request);
    const errorResponse = NextResponse.json({error: e.message ?? 'Error while trying to get messages!'}, {status: 500});
    return errorResponse;
  }

}
