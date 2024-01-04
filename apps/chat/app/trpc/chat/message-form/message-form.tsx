'use client';
import {useEffect, useRef, useState} from "react";
import styles from './message-form.module.scss';
import {AddMessageResultType} from "../../../../actions/send-new-chat-message";
import CheckInput from "../../../../components/check-input/check-input";
import {trpcClient} from "../../../../services/trpc/trpc.client";
import {getHTTPStatusCodeFromError} from "@trpc/server/http";
import {TRPCClientError} from "@trpc/client";


export interface MessageFormProps {
}

export function MessageForm(props: MessageFormProps) {

  const [loading, setLoading] = useState(false);
  const [inputKey, setInputKey] = useState(Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const session = await trpcClient.session.query();
        setUsername(session.username);
      } catch (e: any) {
        if (e instanceof TRPCClientError) {
          const statusCode = getHTTPStatusCodeFromError(e.data);
          console.log(`TRPC error status: ${statusCode}`);
        }else {
          console.error('Unexpected error while fetching TRPC session', e);
        }
        setUsername('');
      }

    }
    fetchCurrentUser();
  }, []);


  const submitMessageHandler = async (formData: FormData) => {

    setLoading(true);

    const now = Date.now();
    const message = formData.get('message') as string;

    if (!username) {
      return;
    }

    try {
      const submitResult: AddMessageResultType = await trpcClient.message.query({sender: username, message, time: now});

      if (!submitResult.result && submitResult?.error) {
        alert(submitResult.error);
      }
    } catch (e) {
      console.error('Error sending message', e);
      alert('Unexpeted error sending message!');
    }

    if (formRef.current) {
      setInputKey(Date.now());
      formRef.current.reset();
    }
    setLoading(false);
  }

  if (!username) {
    return <div className={styles.unknow_user}>Unknow users can only read messages</div>
  }

  return (
    <form action={submitMessageHandler} className={styles.container} ref={formRef}>
      <div className={styles.hcontainer}>
        <div>{username}:</div>
        <CheckInput placeholder={'Enter your message'} formName={'message'} key={inputKey}/>
        <button disabled={loading} type={'submit'}>Send</button>
      </div>
    </form>);
}

export default MessageForm;
