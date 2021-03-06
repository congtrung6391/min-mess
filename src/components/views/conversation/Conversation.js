import React, { useState, useRef, useContext } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../config/store/actions/index';
import Message from '../../common/message/Message';
import { SocketContext } from '../../../context/context';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
 
const  Conversation = (props) => {
  const message = useRef(null);
  const [, setCountMess] = useState(0);
  const socket = useContext(SocketContext); 

  const sendMessageHandler = async (event) => {
    event.preventDefault();
    const { peername } = props;
    const messageToSend = message.current.value;
    await props.onSend(peername, props.user, messageToSend);
    if(props.content)
      setCountMess(props.content.length);
    message.current.value = null;

    socket.emit('message', props.user, peername, messageToSend);
  }

  const pressHandler = async (event) => {
    if(event.key === "Enter") {
      await sendMessageHandler(event);
    }
  }

  const pushNewMessage = async (sender, message) => {
    await props.onUpdate({sender: sender, content: message});
    if(props.content);
      setCountMess(props.content.length);
  }

  socket.once('message-new', async (sender, message) => {
    pushNewMessage(sender, message);
  });

  console.log("mount");
  let messagesArr = null;
  if(props.content) {
    messagesArr = props.content.map((message, id) => {
      return (<Message side={message.sender === props.user ? "left" : "right"} message={message.content} key={id} />);
    });
  }

  return (
    <div className="col-md-6 m-4 d-flex align-items-start flex-column border rounded shadow" style={{minHeight: "85vh"}}>
      <div className="d-flex m-3 justify-content-center" style={{width: "100%"}}>
        <h4>{props.peername}</h4>
      </div>
      <div className={"mt-auto p-3 d-flex flex-column-reverse rounded shadow overflow-auto"} style={{height: "68vh", width: "100%"}}>
        {
          messagesArr === null 
          ? null
          : messagesArr.reverse()
        }
      </div>
      <InputGroup className="my-2" onKeyPress={event => pressHandler(event)}>
          <FormControl
            placeholder=""
            type="text"
            ref={message}
          />
          <InputGroup.Prepend>
            <Button onClick={(event) => sendMessageHandler(event)}>Send</Button>
          </InputGroup.Prepend>
        </InputGroup>
    </div>
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
    onSend: async (peername, sender, message) => dispatch(actions.sendMessage(peername, sender, message)),
    onUpdate: (message) => dispatch(actions.convUpdate({content: message}))
  }
}

export default connect(mapStateProps, mapDispatchProp)(Conversation);