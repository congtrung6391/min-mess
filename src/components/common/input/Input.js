import React from 'react';
import styles from '../../../styles/styles.module.css';

const Input = (props) => {
  return (
    <div className={styles.Input}>
      <label>{props.name}</label>
      <input 
        type={props.type} 
        placeholder={props.placeholder}
        onChange={props.changed}
      />
    </div>
  );
};

export default Input;