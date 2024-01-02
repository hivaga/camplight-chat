'use server'
import {IChatMessage} from "../model/mongoose/chat-message";
import {addChatMessage} from "../services/mongoose/chat.service";
import {revalidatePath, revalidateTag} from "next/cache";
import {cookies} from "next/headers";
import {generateSession} from "../lib/sessions";
import {addNewSession, getSession} from "../store/server-store";

export type AddMessageResultType = {result:boolean, error?: string};

export default async function sendNewChatMessage(chatMessage: IChatMessage):Promise<AddMessageResultType> {
  // Save the new chat message to MongoDB
  const currentCookies = cookies();
  const userCookie = currentCookies.get('username');
  const username = userCookie ? userCookie.value : '';
  console.log("sendNewChatMessage:: Action, current cookies:", username);

  const prevSession =  getSession(username);
  const now = Date.now();

  if(!prevSession) {
    console.error("sendNewChatMessage:: Action, session not found:", username);
    return {result:false, error: `session not found: ${username}`}
  }

  if(prevSession && prevSession.expiresAt < now) {
    console.error("sendNewChatMessage:: Action, session has expired:", username);
    return {result:false, error: `session has expired!`}
  }

  if(prevSession && prevSession.username !== chatMessage.sender){
    console.error("sendNewChatMessage:: Action, username not found or not matching:", username, chatMessage.sender);
    return {result:false, error: `Session and sender do not match!`}
  }

  const result = await addChatMessage(chatMessage);

  if(result) {
    const newSession = generateSession(username, now);
    await currentCookies.set('username', newSession.username, {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      maxAge: 60 // 60 seconds
    });
     addNewSession(newSession);
    revalidateTag('session');
  }

  console.log("sendNewChatMessage:: Action, new chat message added:",chatMessage, result);
  revalidateTag('messages');
  revalidatePath( 'chat');

  return {result};
}
