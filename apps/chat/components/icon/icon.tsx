import styles from './icon.module.scss';

export interface IconProps {
  type: 'success' | 'error' | 'info';
}

export function Icon(props: IconProps) {
  const {type} = props;

  let iconElement;

  switch (type) {
    case 'success':
      iconElement = <span className={styles.success}>&#10004;</span>; // Checkmark for success
      break;
    case 'error':
      iconElement = <span className={styles.error}>&#10060;</span>; // Cross for error
      break;
    case 'info':
    default:
      iconElement = <span className={styles.info}>&#9432;</span>; // Information symbol for info
      break;
  }

  return (
    <div className={styles.container}>
      {iconElement}
    </div>
  );
}

export default Icon;
