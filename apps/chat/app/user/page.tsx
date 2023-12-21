import styles from './page.module.scss';
import updateCurrentChatSender from "../../actions/update-current-chat-sender";
import {getStore} from "../../store/app.store";
import CheckInput from "../../components/check-input/check-input";

export interface LoginProps {
}

export async function User(props: LoginProps) {
  let {currentUser} = await getStore();

  return (
    <>
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
