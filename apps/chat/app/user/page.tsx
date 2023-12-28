import styles from './page.module.scss';
import CheckInput from "../../components/check-input/check-input";
import {revalidatePath} from "next/cache";
import ClientStore from "../../components/client-store/client-store";

export interface LoginProps {
}

let currentUser:string | undefined;

async function updateCurrentChatSender(form: FormData) {
  'use server'
  currentUser = form.get('username') as string;
  revalidatePath('/user');
}

export async function User(props: LoginProps) {

  return (
    <>
      <ClientStore currentUser={currentUser}/>
      <form action={updateCurrentChatSender} className={styles.registerUserForm}>
        <label className={styles.labelContainer}>
          <span>Name:</span>
          <CheckInput defaultValue={currentUser} placeholder={'Input your chat name'} formName={'username'}/>
          <button type="submit">Apply</button>
        </label>
      </form>
    </>
  );
}

export default User;
