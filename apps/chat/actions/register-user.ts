'use server'
import {getStore, setStore} from "../store/app.store";
import {revalidatePath} from "next/cache";

export async function registerUser(formData: FormData) {

  const currentUserName = formData.get('username') as string;
  const currentStoreState = getStore();

  console.log('Previous chat user:', currentStoreState.currentUser);
  setStore({...currentStoreState, currentUser: currentUserName});
  console.log('New chat user:', currentUserName);

  revalidatePath('/user');

}
