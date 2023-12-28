import styles from './page.module.scss';
import MessagesList from "./messages-list/messages-list";
import {IChatMessage} from "../../model/mongoose/chat-message";
import MessageForm from "./message-form/message-form";

interface ChatProps {
}

async function initialMessagesFetch() {
  const response = await fetch('http://localhost:4200/api/messages', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    next: {tags: ['messages']}
  });

  return await response.json() as IChatMessage[] ?? [];
}

export async function Chat(props: ChatProps) {

  const messages = await initialMessagesFetch() as IChatMessage[] ?? [];

  return (
    <div className={styles.container}>
      <MessagesList initialMessages={messages}/>
      <MessageForm/>
    </div>
  );
}

export default Chat;
