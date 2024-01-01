import {JSONFilePreset} from 'lowdb/node'
import {Low} from "lowdb";
import {IChatMessage} from "../model/mongoose/chat-message";

export type AppStoreType = { messages: Record<string, IChatMessage>, sessions: Record<string, SessionType> };
export type SessionType = {
  username: string;
  createdAt: number;
  expiresAt: number;
}

const DEFAULT_DATA: AppStoreType = {messages: {}, sessions: {} };

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

export async function addNewSesson(session: SessionType): Promise<void> {
  const store = await getStore();
  store.data.sessions[session.username] = session;
  await store.write();
}
export  async  function getSession(username: string): Promise<SessionType | undefined> {
  const store = await getStore();
  return store.data.sessions[username];
}

export async function removeSession(username: string): Promise<void> {
  const store = await getStore();
  delete store.data.sessions[username];
  await store.write();
}


export async function readServerStore(): Promise<AppStoreType> {
  const store = await getStore();
  await store.read();
  return store.data ?? {messages: {}};
}

export async function resetStore() {
  console.log('Server store reset !');
  const store = await getStore();
  store.data = DEFAULT_DATA;
  await store.write();
}


export async function updateAllSessions(sessions: Record<string, SessionType>) {
  const store = await getStore();
  store.data.sessions = {...sessions};
  await store.write();
}
