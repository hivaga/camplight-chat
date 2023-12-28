import {ChatMessage, IChatMessage} from "../../model/mongoose/chat-message";
import {getMongooseClient} from "./mongoose.service";
import mongoose, {ConnectionStates} from "mongoose";
import {readServerStore, updateStoreMessages} from "../../store/server-store";


export type ChatMessageFilter = { type: 'date', date: number };

// const messagesMap: Map<string, IChatMessage> = new Map<string, IChatMessage>([]);

function convertMapToArray(map: Record<string, IChatMessage>) {
  const allMessages = Array.from(Object.values(map));
  return allMessages.sort((a, b) => {
    return (a.time - b.time);
  });
}

function getLastMessageFilter(currentMessages: IChatMessage[]): ChatMessageFilter {
  const lastMessage = currentMessages[currentMessages.length - 1];
  return lastMessage
    ? {type: 'date', date: lastMessage.time}
    : {type: 'date', date: 0};
}

function updateMessagesMap(newMessages: IChatMessage[], messagesMap: Record<string, IChatMessage>) {
  newMessages.forEach(message => {
    if (message._id && !messagesMap[message._id]) {
      messagesMap[message._id] = message;
    }
  });
  return messagesMap;
}

function filterMessagesByDate(filter: ChatMessageFilter, messagesMap: Record<string, IChatMessage>): IChatMessage[] {
  const allMessages = convertMapToArray(messagesMap);
  return allMessages.filter(message => message.time > filter.date);
}



export const addChatMessage = async (message: IChatMessage) => {
  const mongooseClient = await getMongooseClient();

  // TODO improve logic to not allow saving the same message into the DB
  if (mongooseClient.connection.readyState === ConnectionStates.connected) {
    const newMessage = new ChatMessage(message);
    await newMessage.save();
    const store = await readServerStore();
    const newMessagesMap = updateMessagesMap([newMessage], store.messages);
    const allMessages = convertMapToArray(newMessagesMap);
    console.log('ChatService.getChatMessages():: Local store messages length:', allMessages.length);
    // TODO improve logic a possible race condition when someone have updated the local store in the short period between us reading and writing it
    await updateStoreMessages(newMessagesMap);
    return true;
  }
  return false;
}

// Example: Fetching chat messages
export const getChatMessages = async (filter: ChatMessageFilter = {type: 'date', date: 0}) => {
  const mongooseClient = await getMongooseClient();
  let storeData = await readServerStore();
  console.log('ChatService.getChatMessages():: Store data:', storeData);
  const allStoreMessages = convertMapToArray(storeData.messages);
  console.log("ChatService.getChatMessages():: filter", filter);

  if (allStoreMessages && allStoreMessages.length) {

    console.log('ChatService.getChatMessages():: Messages from local data:', allStoreMessages.length);
    const afterDateMessages = allStoreMessages.filter(message => {
      return (message.time > filter.date);
    })

    console.log('ChatService.getChatMessages():: Returned messages:', afterDateMessages.length);
    return afterDateMessages;
  }

  if (mongooseClient.connection.readyState === ConnectionStates.connected) {
    let queryCondition = {};
    if (filter && filter.type === 'date') {
      queryCondition = {time: {$gt: filter.date}};
    }

    const mongooseResponse: mongoose.Document<IChatMessage>[] = await ChatMessage.find(queryCondition).exec();

    const allDBMessages = mongooseResponse.map((message: mongoose.Document) => message.toObject<IChatMessage>({
      transform: function (doc, ret) {
        delete ret.__v;
      }
    }));
    console.log('ChatService.getChatMessages():: Messages from DB data:', allDBMessages.length);
    const messagesMap = updateMessagesMap(allDBMessages, {});

    // this means we can safely update all the messages in our store because we have fetched the hole db
    if(filter.date === 0) {
      await updateStoreMessages(messagesMap);
    }

    storeData = await readServerStore();

    const responseMessages = filterMessagesByDate(filter, {...storeData.messages, ...messagesMap});
    console.log('ChatService.getChatMessages():: Returned messages:', responseMessages.length);
    return responseMessages;
  }

  return [];

}

