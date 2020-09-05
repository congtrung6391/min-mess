import React from 'react';

const UserItem = (props) => {
  return(
    <div>
      <h4 onClick={props.toggleConv}>{props.username}</h4>
      <button onClick={props.deleteButon}>delete</button>
      <button onClick={props.newButton}>new conversation</button>
    </div>
  );
}

export default UserItem;