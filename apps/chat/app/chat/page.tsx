import styles from './page.module.scss';
import {IChatMessage} from "../../model/mongoose/chat-message";
import MessagesList from "./messages-list/messages-list";
import MessageForm from "./message-form/message-form";
import {getCurrentSession} from "../../lib/sessions";

interface ChatProps {
}

async function initialMessagesFetch(): Promise<IChatMessage[]> {
  try {
    const response = await fetch('http://localhost:4200/api/messages', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      next: {tags: ['messages']}
    });
    return await response.json() ?? [];
  } catch (e) {
    console.error('Error fetching messages:', e);
    return []
  }
}


export async function Chat(props: ChatProps) {

  const messages = await initialMessagesFetch();


  return (
    <div className={styles.container}>
      <MessagesList initialMessages={messages}/>
      <MessageForm/>
    </div>
  );
}

export default Chat;
