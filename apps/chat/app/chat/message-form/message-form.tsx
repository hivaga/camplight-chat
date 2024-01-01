'use client';

import styles from './message-form.module.scss';
import sendNewChatMessage from "../../../actions/send-new-chat-message";
import CheckInput from "../../../components/check-input/check-input";
import {useState, useRef} from "react";
import {getClientStore} from "../../../store/client-store";

export interface MessageFormProps {
}

export function MessageForm(props: MessageFormProps) {
  const [loading, setLoading] = useState(false);
  const [inputKey, setInputKey] = useState(Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const {currentUser = 'Sender'} = getClientStore();


  const submitMessageHandler = async (formData: FormData) => {
    setLoading(true);

    const time = new Date().getTime();
    const message = formData.get('message') as string;
    const submitResult = await sendNewChatMessage(
      {
        sender: currentUser,
        time,
        message
      }
    );

    if(formRef.current) {
      setInputKey(Date.now());
      formRef.current.reset();
    }
    setLoading(false);
  }

  return (
    <form action={submitMessageHandler} className={styles.container} ref={formRef}>
      <div className={styles.hcontainer}>
        <div>{currentUser}:</div>
        <CheckInput placeholder={'Enter your message'} formName={'message'} key={inputKey}/>
        <button disabled={loading} type={'submit'}>Send</button>
      </div>
    </form>
  );
}

export default MessageForm;
