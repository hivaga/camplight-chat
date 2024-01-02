'use client';

import styles from './check-input.module.css';
import Icon from "../icon/icon";

export interface ClientInputProps {
  showSuccess?: boolean;
  defaultValue?: string;
  placeholder?:string;
  formName:string
}

export function CheckInput({defaultValue = '', formName, placeholder, showSuccess = false}: ClientInputProps) {
  return (
    <div className={styles.container}>
      <input
        type="text"
        name={formName}
        required
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={styles.inputField}
      />
      {showSuccess && <span className={styles.icon}><Icon type="success"/></span>}
    </div>
  );
}

export default CheckInput;
