'use client'

import {useEffect, useRef, useState} from "react";

import styles from './messages-list.module.scss';
import MessageBubble from "../message-bubble/message-bubble";
import {IChatMessage} from "../../../../model/mongoose/chat-message";
import {getClientStore} from "../../../../store/client-store";
import {trpcClient} from "../../../../services/trpc/trpc.client";
import {ChatMessageFilter} from "../../../../services/mongoose/chat.service";

export interface MessagesListProps {
  initialMessages: IChatMessage[];
}

function getAlignment(sender: string, currentChatUser: string) {
  if (sender === currentChatUser) {
    return 'right';
  }
  return 'left';
}

export function MessagesList({initialMessages = []}: MessagesListProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [isAtBottom, setIsAtBottom] = useState(true); // Whether the scroll is at the bottom
  const {currentUser = ''} = getClientStore();
  const listRef = useRef<HTMLDivElement>(null);

  const scrollToBottomIfAtBottom = () => {
    const div = listRef.current;
    if (div) {
      // Scroll to the bottom only if the slider was at the bottom before the update
      if (isAtBottom) {
        div.scrollTo({
          top: div.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  };

  useEffect(() => {
    scrollToBottomIfAtBottom();
  }, [messages]);

  useEffect(() => {
    scrollToBottomIfAtBottom();

    // TODO: Socket implementation does not work wit trpc, maybe Windows issue
    /*    const setupMessagesStream =  () => {
          return trpcClient.stream.subscribe({type: 'date', date: 0}, {
            onStarted: () => {
              console.log('TRPC stream started !');
            },
            onData: (value) => {
              console.log('TRPC on data', value);
            },
            onError: (err) => {
              console.error('TRPC stream error !');
            },
            onStopped: () => {
              console.log('TRPC stream stopped !');
            },
            onComplete: () => {
              console.log('TRPC stream completed !');
            }
          })
        }
        const subscription = setupMessagesStream();
        return () => {
          subscription.unsubscribe();
        }*/

    return () =>{}
  }, []);




  return (
    <div className={styles.container} ref={listRef}>
      {messages.map((message) => (
        <MessageBubble sender={message.sender}
                       message={message.message}
                       key={message._id}
                       allign={getAlignment(message.sender, currentUser)}/>
      ))}
    </div>
  );
}

export default MessagesList;
