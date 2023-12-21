'use client';

import styles from './message-form.module.scss';
import sendNewChatMessage from "../../../actions/send-new-chat-message";
import CheckInput from "../../../components/check-input/check-input";
import {useState} from "react";

export interface MessageFormProps {
  sender: string
}

export function MessageForm({sender}: MessageFormProps) {
  const [loading, setLoading] = useState(false);

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
    console.log('Submit completed !', submitResult);
    setLoading(false);
  }

  return (
    <form action={submitMessageHandler} className={styles.container}>
      <div className={styles.hcontainer}>
        <div>{sender}:</div>
        <CheckInput placeholder={'Enter your message'} formName={'message'}/>
        <button disabled={loading} type={'submit'}>Send</button>
      </div>
    </form>
  );
}

export default MessageForm;
