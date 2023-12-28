import {JSONFilePreset} from 'lowdb/node'
import {Low} from "lowdb";
import {IChatMessage} from "../model/mongoose/chat-message";

export type AppStoreType = { messages: Record<string, IChatMessage> };
const DEFAULT_DATA: AppStoreType = {messages: {}};

let store: Low<AppStoreType>;

async function getStore() {
  if (!store) {
    store = await initStore();
  }
  return store;
}

async function initStore() {
  const db = await JSONFilePreset('db.json', DEFAULT_DATA);
  return db;
}

export async function updateStoreMessages(newMessages: Record<string, IChatMessage>): Promise<void> {
  const store = await getStore();
  console.log('Server store update messages:', Object.keys(newMessages).length);
  // TODO the logic here can be improved in order to minimize the writing if there is no need
  store.data.messages = newMessages;
  await store.write();
}


export async function readServerStore(): Promise<AppStoreType> {
  const store = await getStore();
  await store.read();
  return store.data ?? {messages: {}};
}

export async function resetServerStore() {
  console.log('Server store reset !');
  const store = await getStore();
  store.data = DEFAULT_DATA;
  await store.write();
}
