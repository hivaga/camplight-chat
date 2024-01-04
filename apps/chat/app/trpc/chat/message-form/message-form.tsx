'use client';
import {useState, useRef, useEffect} from "react";
import styles from './message-form.module.scss';
import {getClientStore} from "../../../../store/client-store";
import {getCurrentSession} from "../../../../lib/sessions";
import sendNewChatMessage, {AddMessageResultType} from "../../../../actions/send-new-chat-message";
import CheckInput from "../../../../components/check-input/check-input";


export interface MessageFormProps {
}

export function MessageForm(props: MessageFormProps) {

  const [loading, setLoading] = useState(false);
  const [inputKey, setInputKey] = useState(Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const session = await getCurrentSession();
      if (session && session?.username) {
        setUsername(session.username);
      }
    }
    fetchCurrentUser();
  }, []);


  const submitMessageHandler = async (formData: FormData) => {
    setLoading(true);

    const time = new Date().getTime();
    const message = formData.get('message') as string;

    try {
      const submitResult: AddMessageResultType = await sendNewChatMessage(
        {
          sender: currentUser,
          time,
          message
        }
      );

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
    </form>
  );
}

export default MessageForm;
