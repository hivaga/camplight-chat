'use client'

import styles from './messages-list.module.scss';
import {IChatMessage} from "../../../model/mongoose/chat-message";
import MessageBubble from "../message-bubble/message-bubble";
import {getStore} from "../../../components/client-store/client-store";
import {useEffect, useRef, useState} from "react";


export interface MessagesListProps {
  // Assuming your API provides a function to fetch messages
  initialMessages: IChatMessage[];
}

function getAlignment(sender: string, currentChatUser: string) {
  if (sender === currentChatUser) {
    return 'right';
  }
  return 'left';
}

function scrollToBottom(div: HTMLDivElement | null, sender: string, currentUser: string) {
  console.log('scroll', div?.scrollHeight, div?.scrollTop);
  if (div && sender === currentUser) {
    div.scrollTo(0, div.scrollHeight);
  }
}


export function MessagesList({initialMessages = []}: MessagesListProps) {

  const [messages, setMessages] = useState(initialMessages);
  const {currentUser = ''} = getStore();

  const listRef = useRef<HTMLDivElement>(null);

  // setTimeout(() => {
  //   if (lastMessage && listRef.current) {
  //     scrollToBottom(listRef.current, lastMessage.sender, currentUser);
  //   }
  // }, 1);

  useEffect(() => {
    const afterInitialMessages:IChatMessage[]= [];
    const lastMessage = messages[messages.length - 1];
    let url = 'http://localhost:4200/api/messages/stream';
    if(lastMessage) {
      url = `${url}?lastMessageTime=${lastMessage.time}`;
    }
    const eventSource = new EventSource(url);

    eventSource.addEventListener('message', (event: MessageEvent<string>) => {
      if(event.data) {
        try {
          const receivedMessages:IChatMessage[] = JSON.parse(event.data);
          afterInitialMessages.push(...receivedMessages);
          console.log('New messages received:', receivedMessages);
          setMessages([...initialMessages, ...afterInitialMessages]);
        }catch (e) {

        }
      }
    })

    eventSource.addEventListener('error', () => {
      console.log('Error from message');
    })

    return () => {
      eventSource.close();
    };
  }, []);



  return (
    <div className={styles.container} ref={listRef}>
      {messages.map((message, index) => (
        <MessageBubble sender={message.sender}
                       message={message.message}
                       key={message._id}
                       allign={getAlignment(message.sender, currentUser)}/>
      ))}
    </div>
  );
}

export default MessagesList;
