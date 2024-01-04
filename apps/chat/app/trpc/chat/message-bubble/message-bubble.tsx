import styles from './message-bubble.module.scss';

export interface MessageBubleProps {
  sender: string;
  allign: 'left' | 'right';
  message: string;
}

export function MessageBubble({sender, message, allign = 'left'}: MessageBubleProps) {
  // Determine the alignment class
  const alignmentClass = allign === 'left' ? styles.leftAligned : styles.rightAligned;

  return (
    <div className={alignmentClass} >
      <div className={`${styles.container} `}>
        <span><strong>{sender}:</strong> {message}</span>
      </div>
    </div>
  );
}

export default MessageBubble;
