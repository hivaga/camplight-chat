import {NextRequest} from 'next/server'
import {ChatMessageFilter, getChatMessages} from "../../../../services/mongoose/chat.service";
import {IChatMessage} from "../../../../model/mongoose/chat-message";

export const dynamic = 'force-dynamic';
const encoder = new TextEncoder();
export const CHECK_MESSAGES_TIMEOUT_INTERVAL = 500;

function toDataString(data: any): string {
  return `data: ${JSON.stringify(data)}\n\n`
}

function convertDataToSSEFormat(data: IChatMessage[]) {
  const initialMessage = `data: ${JSON.stringify(data)}\n\n`;
  return encoder.encode(initialMessage);
}

export async function GET(request: NextRequest) {
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  let optionalLastMessageID = request.nextUrl.searchParams.get('lastMessageTime');

  console.log('API.messages/stream:: last lastMessageTime:', optionalLastMessageID);

  let filter: ChatMessageFilter = {type: 'date', date: 0};
  if (optionalLastMessageID) {
    filter = {type: 'date', date: parseInt(optionalLastMessageID)}
  }

  const sendMessage = async () => {
    try {
      const messages = await getChatMessages(filter);
      if(messages && messages.length) {
        const lastMessage = messages[messages.length -1];
        filter  = {type: 'date', date: lastMessage.time};
        const responseContent = convertDataToSSEFormat(messages);
        await writer.write(responseContent);
      }

    } catch (error) {
      console.error('API.messages/stream:: Error writing to SSE stream:', error);
      writer.close();
      return;
    }
  };

  // Write an immediate response
  setTimeout(sendMessage, 0);

  // Regularly check for new messages
  const intervalId = setInterval(sendMessage, CHECK_MESSAGES_TIMEOUT_INTERVAL);

  // Listen for the abort event to clear the interval when the client disconnects
  request.signal.addEventListener('abort', () => {
    console.log('API.messages/stream:: Connection aborted!');
    clearInterval(intervalId);
    writer.close(); // Close the writer when the client disconnects
  });

  // Set a timeout to close the connection after 1 minute
/*  setTimeout(() => {
    clearInterval(intervalId);
    writer.close();
    console.log('API.messages/stream:: SSE connection closed due to timeout');
  }, 60000); // 60000 milliseconds = 1 minute*/


  return new Response(responseStream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache, no-transform',
    },
  });
}
