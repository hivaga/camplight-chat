'use server'
import {IChatMessage} from "../model/mongoose/chat-message";
import {addChatMessage} from "../services/mongoose/chat.service";
import {getStore} from "../store/app.store";

export default async function sendNewChatMessage(chatMessage: IChatMessage) {

  console.log('submitMessage data:', chatMessage);
  // Save the new chat message to MongoDB
  const result = await addChatMessage(chatMessage);
  console.log("New chat message added to MongoDB:", result);
  return true;
}
