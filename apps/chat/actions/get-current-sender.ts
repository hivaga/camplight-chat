'use server'
import {getStore} from "../store/app.store";

export default async function getCurrentSender() {
  const store = await getStore();
  const {currentUser} = store;
  return currentUser;
}
