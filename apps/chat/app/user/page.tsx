import styles from './page.module.scss';
import {registerUser} from "../../actions/register-user";
import {getStore} from "../../store/app.store";
import CheckInput from "../../components/check-input/check-input";

export interface LoginProps {
}

export function User(props: LoginProps) {
  let {currentUser} = getStore();

  return (
    <div>
      <form action={registerUser} className={styles.registerUserForm}>
        <label className={styles.labelContainer}>
          <span>Name:</span>
          <CheckInput defaultValue={currentUser} placeholder={'Input your chat name'} formName={'username'}/>
          <button type="submit">Apply</button>
        </label>
      </form>
    </div>
  );
}

export default User;
