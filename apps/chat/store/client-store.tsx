"use client";

export interface IAppStore {
  currentUser: string | undefined
}

let clientStore: IAppStore = {} as IAppStore

export function getClientStore() {
  return {...clientStore}
}

export function updateClientStore(state: Partial<IAppStore>) {
  clientStore = Object.assign(clientStore, state);
  console.log('Updated store:', clientStore);
}
