import React from 'react';
import * as styles from './../../../styles/styles.module.css';

const Message = (props) => {
  const sideStyle = (props.side === "left" ? "ml-3 mr-auto " + styles.messageLeft : "mr-3 ml-auto " + styles.messageRight);
  return (
    <div className={"mb-2 p-2 rounded-lg " + sideStyle}>
      {props.message}
    </div>
  );
}

export default Message;