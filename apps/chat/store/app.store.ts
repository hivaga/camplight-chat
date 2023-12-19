const appStore: { currentUser?: string } = {}

export function getStore() {
  return {...appStore};
}

export function setStore(store: { currentUser?: string }) {
  console.log('Store updated:', store);
  Object.assign(appStore, store);
}
