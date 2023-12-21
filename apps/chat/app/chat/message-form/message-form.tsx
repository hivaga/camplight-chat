'use client';

import styles from './message-form.module.scss';
import sendNewChatMessage from "../../../actions/send-new-chat-message";
import CheckInput from "../../../components/check-input/check-input";
import {useState, useRef} from "react";

export interface MessageFormProps {
  sender: string
}

export function MessageForm({sender}: MessageFormProps) {
  const [loading, setLoading] = useState(false);
  const [inputKey, setInputKey] = useState(Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  const submitMessageHandler = async (formData: FormData) => {
    setLoading(true);

    const time = new Date().getTime();
    const message = formData.get('message') as string;
    const submitResult = await sendNewChatMessage(
      {
        sender,
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
        <div>{sender}:</div>
        <CheckInput placeholder={'Enter your message'} formName={'message'} key={inputKey}/>
        <button disabled={loading} type={'submit'}>Send</button>
      </div>
    </form>
  );
}

export default MessageForm;
