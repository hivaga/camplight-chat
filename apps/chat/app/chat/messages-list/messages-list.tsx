'use client';
import {useEffect, useState, useCallback, useRef} from 'react';
import styles from './messages-list.module.scss';
import axios from "axios";
import {IChatMessage} from "../../../model/mongoose/chat-message";
import MessageBuble from "../message-buble/message-buble";

const MESSAGE_FETCH_INTERVAL = 2000;

function convertMapToArray(map: Map<string, IChatMessage>) {
  const allMessages = Array.from(map.values());
  return allMessages.sort((a, b) => {
    return (a.time - b.time);
  });
}

function getLastMessageFilter(currentMessages: IChatMessage[]): { type: 'date', date: number } | { type: 'all' } {
  const lastMessage = currentMessages[currentMessages.length - 1];
  return lastMessage
    ? {type: 'date', date: lastMessage.time}
    : {type: 'all'};
}

async function fetchNewMessages(filter: { type: 'date', date: number } | { type: 'all' }) {
  const response = await axios.post('http://localhost:4200/api/messages', filter);
  return response.data;
}

function updateMessagesMap(newMessages: IChatMessage[], messagesMap: Map<string, IChatMessage>) {
  newMessages.forEach(message => {
    if (message._id && !messagesMap.has(message._id)) {
      messagesMap.set(message._id, message);
    }
  });
}

function isScrollerAtBottom(containerRef: HTMLDivElement) {
  console.log('messages', containerRef.scrollTop, containerRef.scrollHeight, containerRef.offsetHeight);
  const maxScroll = containerRef.scrollHeight - containerRef.offsetHeight;
  console.log('maxScroll', maxScroll, (maxScroll - containerRef.scrollTop));
  if ((maxScroll - containerRef.scrollTop) < 5) {
    return true;
  }
  return false;
}

export interface MessagesListProps {
  // Assuming your API provides a function to fetch messages
}

export function MessagesList(props: MessagesListProps) {
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [isScrollBottom, setIsScrollBottom] = useState(false);
  const messagesMap = useRef(new Map<string, IChatMessage>()).current;
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchMessages = useCallback(async () => {
    try {
      const currentMessages = convertMapToArray(messagesMap);
      const filter = getLastMessageFilter(currentMessages);
      const newMessages = await fetchNewMessages(filter);
      updateMessagesMap(newMessages, messagesMap);
      const allMessages = convertMapToArray(messagesMap);
      if (newMessages.length > 0) {
        if (containerRef.current) {
          setIsScrollBottom(isScrollerAtBottom(containerRef.current))
        }
        setMessages(allMessages);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  }, [messagesMap, setMessages]);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, MESSAGE_FETCH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  useEffect(() => {
    if (containerRef.current && isScrollBottom) {
      const maxScroll = containerRef.current.scrollHeight - containerRef.current.offsetHeight;
      containerRef.current.scrollTop = maxScroll
    }
  }, [isScrollBottom])


  return (
    <div className={styles.container} ref={containerRef}>
      {messages.map((message, index) => (
        <MessageBuble sender={message.sender} message={message.message} key={message._id}/>
      ))}
    </div>
  );
}

export default MessagesList;
