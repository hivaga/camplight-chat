'use server'

import {resetStore} from '../store/server-store';

// TODO: This is not optimal, need to investigate how in Next we can trigger code only once at application start
let serverStoreInitialized = false;

export default async function resetServerStore() {
  if (!serverStoreInitialized) {
    serverStoreInitialized = true;
    await resetStore();
  }
}
