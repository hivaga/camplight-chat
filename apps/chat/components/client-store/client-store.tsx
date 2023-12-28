"use client";

export interface IAppStore {
  currentUser: string | undefined
}

let clientStore: IAppStore = {} as IAppStore

export function getStore() {
  return {...clientStore}
}

export function updateStore(state: Partial<IAppStore>) {
  clientStore = Object.assign(clientStore, state);
  console.log('Updated store:', clientStore);
}


export interface SessionStoreProps {
  state: IAppStore
}

export function ClientStore({currentUser}: IAppStore) {

  updateStore({currentUser});

  return (
    <></>
  );
}

export default ClientStore;
