'use client';

import styles from './check-input.module.css';
import Icon from "../icon/icon";
import {ChangeEvent, useState} from "react";

export interface ClientInputProps {
  defaultValue?: string;
  placeholder?:string;
  formName:string
}

export function CheckInput({defaultValue, formName, placeholder}: ClientInputProps) {
  const [currentValue, setCurrentValue] = useState(defaultValue || '');
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setCurrentValue(newValue);
  };

  // Show the success icon only if the current value is different from the default value
  const showSuccess = currentValue === defaultValue && !!currentValue;

  return (
    <div className={styles.container}>
      <input
        type="text"
        name={formName}
        required
        placeholder={placeholder}
        onChange={onChangeHandler}
        value={currentValue}
        className={styles.inputField}
      />
      {showSuccess && <span className={styles.icon}><Icon type="success"/></span>}
    </div>
  );
}

export default CheckInput;
