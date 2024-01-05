import styles from './page.module.scss';
import {trpcClient} from "../../../services/trpc/trpc.client";
import {ChatMessageFilter} from "../../../services/mongoose/chat.service";
import MessagesList from "./messages-list/messages-list";
import MessageForm from "./message-form/message-form";

interface ChatProps {
}

async function initialMessagesFetch(){
  try {
    const allMessagesFilter:ChatMessageFilter ={type:'date', date: 0};
    const messages = await trpcClient.messages.query(allMessagesFilter);
    return messages;
  } catch (e) {
    console.error('Error fetching messages:', e);
    return []
  }
}


 export default async function Chat(props: ChatProps) {

  const allMessages = await initialMessagesFetch();

  return (
    <div className={styles.container}>
      <MessagesList initialMessages={allMessages}/>
      <MessageForm/>
    </div>
  );
}
