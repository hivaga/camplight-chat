'use server'
import {revalidatePath} from "next/cache";

export default async function updateCurrentChatSender(formData: FormData) {

  const currentUserName = formData.get('username') as string;

  console.log('New chat user:', currentUserName);

  revalidatePath('/user');

}
