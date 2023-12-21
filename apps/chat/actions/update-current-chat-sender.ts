'use server'
import {getStore, setStore, TAG_STORE} from "../store/app.store";
import {revalidatePath, revalidateTag} from "next/cache";

export default async function updateCurrentChatSender(formData: FormData) {

  const currentUserName = formData.get('username') as string;
  const currentStoreState =  await getStore();

  console.log('Previous chat user:', currentStoreState.currentUser);
  await setStore({...currentStoreState, currentUser: currentUserName});
  console.log('New chat user:', currentUserName);

  revalidateTag(TAG_STORE);
  revalidatePath('/user');
  revalidatePath('/chat');

}
