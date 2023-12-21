import {ChatMessage, IChatMessage} from "../../model/mongoose/chat-message";
import {getMongooseClient} from "./mongoose.service";
import mongoose, {ConnectionStates, Model} from "mongoose";

export async function addChatMessage(message: IChatMessage) {
  const mongooseCient = await getMongooseClient();
  if (mongooseCient.connection.readyState === ConnectionStates.connected) {
    const newMessage = new ChatMessage(message);
    await newMessage.save();
    return true;
  }

  return false;
}

// Example: Fetching chat messages
export async function getChatMessages(filter?: { type: 'date', date: number } | { type: 'all' }) {
  const mongooseCient = await getMongooseClient();
  let messages: IChatMessage[] = [];

  console.log("getChatMessages:: filter", filter);

  if (mongooseCient.connection.readyState === ConnectionStates.connected) {
    let queryCondition = {};
    if (filter && filter.type === 'date') {
      queryCondition = {time: {$gt: filter.date}}; // Assuming you have a 'createdAt' field in your schema
    }

    const resposeMessages: mongoose.Document<IChatMessage>[] = await ChatMessage.find(queryCondition).exec();

    messages = resposeMessages.map((message: mongoose.Document) => message.toObject<IChatMessage>({
      transform: function (doc, ret) {
        delete ret.__v;
      }
    }));
    console.log("Retrieved messages:", messages);
  }

  return messages;

}
