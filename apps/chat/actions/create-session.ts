'use server'
import {revalidatePath} from "next/cache";
import {addNewSession, readServerStore, SessionType} from "../store/server-store";

export default async function createSession(username: string) {

  const storeData = readServerStore();
  const session = storeData.sessions[username];
  if (storeData.sessions[username] && session.expiresAt >= Date.now()) {
    return false;
  }

  const createdAt = Date.now();
  const expiresAt = createdAt + (60 * 1000);
  const sessionData: SessionType = {
    username,
    createdAt,
    expiresAt
  };

   addNewSession(sessionData);

  revalidatePath('/user');

  return true;

}
