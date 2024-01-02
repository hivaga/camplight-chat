import {JSONFileSyncPreset} from 'lowdb/node'
import {LowSync} from "lowdb";
import {IChatMessage} from "../model/mongoose/chat-message";

export type AppStoreType = { messages: Record<string, IChatMessage>, sessions: Record<string, SessionType> };
export type SessionType = {
  username: string;
  createdAt: number;
  expiresAt: number;
}

let store: LowSync<AppStoreType>;

function getStore() {
  if (!store) {
    store = initStore();
  }
  return store;
}

function initStore() {
  // const adapter = new Memory<AppStoreType>();
  // const db = new Low(adapter, {messages: {}, sessions: {}});
  // await db.read(); // Initialize the store
  // return db;
  const db = JSONFileSyncPreset<AppStoreType>('db.json', {messages: {}, sessions: {}});
  return db;
}

export function updateStoreMessages(newMessages: Record<string, IChatMessage>) {
  const store =  getStore();
  console.log('Server store update messages:', Object.keys(newMessages).length);
  // TODO the logic here can be improved in order to minimize the writing if there is no need
  store.data.messages = newMessages;
  store.write();
}

export function addNewSession(session: SessionType) {
  const store =  getStore();
  store.data.sessions[session.username] = session;
  store.write();
}
export  function getSession(username: string){
  const store = getStore();
  return store.data.sessions[username];
}

export  function removeSession(username: string){
  const store =  getStore();
  delete store.data.sessions[username];
  store.write();
}


export function readServerStore(){
  const store =  getStore();
   store.read();
  return store.data ?? {messages: {}, sessions: {}};
}

export function resetStore() {
  console.log('Server store reset !');
  const store =  getStore();
  store.data = {messages: {}, sessions: {}};
   store.write();
}
