import {ChatMessage, IChatMessage} from "../../model/mongoose/chat-message";

export async function addChatMessage(message:IChatMessage) {
  const newMessage = new ChatMessage(message);
  return await newMessage.save();
}

// Example: Fetching chat messages
export async function getChatMessages() {
  const messages = await ChatMessage.find({});
  console.log("Retrieved messages:", messages);
  return messages;
}
