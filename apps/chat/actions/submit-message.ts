'use server'
import {IChatMessage} from "../model/mongoose/chat-message";
import {addChatMessage} from "../services/mongoose/chat.service";
import {getStore} from "../store/app.store";

export async function submitMessage(formData: FormData) {

  const {currentUser} = getStore();

  if (!currentUser) {
    console.error('No user registered. Please register a user first.');
    return;
  }
  // Extracting values from FormData
  const sender = currentUser;
  const time = new Date().getTime();
  const message = formData.get('message') as string;

  // Validate the extracted data or set default values if necessary

  // Create a new chat message object
  const chatMessage: IChatMessage = {
    sender,
    time,
    message
  };

  console.log('submitMessage data:', chatMessage);
  // Save the new chat message to MongoDB
  const result = await addChatMessage(chatMessage);
  console.log("New chat message added to MongoDB:", result);
}
