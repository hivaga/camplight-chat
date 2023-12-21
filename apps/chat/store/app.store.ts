import NodeCache from "node-cache";
import {revalidateTag} from "next/cache";

const chacheClient = new NodeCache();
const store:any = {};

interface IAppStore {
  currentUser?: string;
}

export const TAG_STORE = 'store';

export async function getStore() {
  const state: any = {}
  chacheClient.keys().forEach((key: string) => {
    state[key] = chacheClient.get(key)
  });

  console.log('Current store state:', state);
  console.log('Current dummy state:', store);
  return state as IAppStore;
}

export async function setStore(state: IAppStore) {
  const keys = Object.keys(state);
  keys.forEach((key: string) => {
    chacheClient.set(key, (state as any)[key]);
    store[key] = (state as any)[key];
  });

  revalidateTag(TAG_STORE);

  console.log('New store state:', state);

}
