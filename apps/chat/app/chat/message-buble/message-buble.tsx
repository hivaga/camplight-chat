import styles from './message-buble.module.scss';

/* eslint-disable-next-line */
export interface MessageBubleProps {
  sender: string
  message: string
}

export function MessageBuble({sender, message}: MessageBubleProps) {
  return (
    <div className={styles.container}>
        <strong>{sender}:</strong> {message}
    </div>
  );
}

export default MessageBuble;
