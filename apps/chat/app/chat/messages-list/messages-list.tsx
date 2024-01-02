'use client'

import styles from './messages-list.module.scss';
import {IChatMessage} from "../../../model/mongoose/chat-message";
import MessageBubble from "../message-bubble/message-bubble";
import {getClientStore} from "../../../store/client-store";
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
  const [isAtBottom, setIsAtBottom] = useState(true); // Whether the scroll is at the bottom
  const {currentUser = ''} = getClientStore();
  const listRef = useRef<HTMLDivElement>(null);

  const scrollToBottomIfAtBottom = () => {
    const div = listRef.current;

    if(div) {
      // Scroll to the bottom only if it's already at the bottom
      if (isAtBottom) {
        div.scrollTo({
          top: div.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  };

  const setupEventSource = () => {
    const afterInitialMessages: IChatMessage[] = [];
    const lastMessage = messages[messages.length - 1];
    let url = 'http://localhost:4200/api/messages/stream';
    if (lastMessage) {
      url = `${url}?lastMessageTime=${lastMessage.time}`;
    }
    const eventSource = new EventSource(url);

    eventSource.addEventListener('message', (event: MessageEvent<string>) => {
      if (event.data) {
        try {
          const receivedMessages: IChatMessage[] = JSON.parse(event.data);
          afterInitialMessages.push(...receivedMessages);
          console.log('New messages received:', receivedMessages);
          if(listRef && listRef.current) {
            const div = listRef.current;
            const isAtBottom = div.scrollHeight <= div.clientHeight + div.scrollTop + 1;
            setIsAtBottom(isAtBottom);
          }
          setMessages([...initialMessages, ...afterInitialMessages]);
        } catch (e) {
          console.error('Error while parsing new messages:', event);
        }
      }
    });

    eventSource.addEventListener('error', (e: Event) => {
      console.log('SSE connection error:', e);
      eventSource.close();
      // Reestablish the connection on error
      setupEventSource();
    });

    return () => {
      eventSource.close();
    };
  };

  useEffect(() => {
    // Initial setup
    const cleanup = setupEventSource();

    return () => {
      cleanup();
    };
  }, []);

  useEffect(() => {
    scrollToBottomIfAtBottom();
  }, [messages]); // Scroll whenever messages change


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
