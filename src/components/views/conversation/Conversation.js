import React, { useEffect, useState, useRef, useContext } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../config/store/actions/index';
import Message from '../../common/message/Message';
import { SocketContext } from '../../../context/context';
 
const  Conversation = (props) => {
  const message = useRef(null);
  const [countMess, setCountMess] = useState(0);
  const socket = useContext(SocketContext); 
  let messagesArr = null;
  if(props.content) {
    messagesArr = props.content.map((message, id) => {
      return (<Message message={message.content} key={id} />);
    });
  }

  console.log("[mount] Conversation");
  console.log(props);

  const pushNewMessage = async (sender, data) => {
    console.log("[socket recieve a new message]");
    await props.onUpdate(data.content);
    console.log("new props");
    console.log(props.content);
    if(props.content) {
      messagesArr = props.content.map((message, id) => {
        return (<Message message={message.content} key={id} />);
      });
    }
    setCountMess(messagesArr.length);
    console.log(messagesArr);
  }

  socket.once('message-new', async (sender, data) => {
    await pushNewMessage(sender, data);
  });

  const sendMessageHandler = async (event) => {
    event.preventDefault();
    const { peername } = props;
    const messageToSend = message.current.value;
    // setLoading(true);
    await props.onSend(peername, messageToSend);
    socket.emit('message', props.user, peername, {content: messageToSend});
    // setLoading(false);
    // console.log(props.content);
    setCountMess(props.content);
    message.current.value = null;
  }

  return (
    <span>
      <div>
        <h4>{props.peername}</h4>
      </div>
      <div>
        <div>
          {messagesArr}
        </div>
        <form onSubmit={(event) => sendMessageHandler(event)}>
          <input 
            type="text" 
            ref={message}
          />
          <button type="submit">send</button>
        </form>
      </div>
    </span>
  );
}


const mapStateProps = (state) => {
  return {
    user: state.auth.user,
    peername: state.conv.peername,
    content: state.conv.content,
  }
}
const mapDispatchProp = (dispatch) => {
  return {
    onSend: async (peername, message) => dispatch(actions.sendMessage(peername, message)),
    onUpdate: (message) => dispatch(actions.convUpdate({content: message}))
  }
}

export default connect(mapStateProps, mapDispatchProp)(Conversation);