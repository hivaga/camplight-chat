'use server'
import {IChatMessage} from "../model/mongoose/chat-message";
import {addChatMessage} from "../services/mongoose/chat.service";
import {revalidatePath, revalidateTag} from "next/cache";


export default async function sendNewChatMessage(chatMessage: IChatMessage) {
  // Save the new chat message to MongoDB
  const result = await addChatMessage(chatMessage);
  console.log("sendNewChatMessage:: Action, new chat message added:",chatMessage, result);
  revalidateTag('messages');
  return result;
}
