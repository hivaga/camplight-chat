import styles from './page.module.scss';
import {submitMessage} from "../../actions/submit-message";
import CheckInput from "../../components/check-input/check-input";

function SubmitMessage() {
  return (
    <div className={styles.container}>
      <form action={submitMessage} className={styles.submitForm}>
          <div className={styles.hcontainer}>
            <CheckInput placeholder={'Enter your message'} formName={'message'}/>
            <button type={'submit'}>Send</button>
          </div>
      </form>
    </div>
);
}

export interface ChatProps {
}

async function Chat(props: ChatProps) {

  return (
    <div>
      <SubmitMessage/>
    </div>
  );
}

export default Chat;
