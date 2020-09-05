import React from 'react';
import { Row , Button} from 'react-bootstrap';

const UserItem = (props) => {
  return(
    <Row>
      <div className="mr-auto justify-content-center" onClick={props.toggleConv}>
        <h5>{props.username}</h5>
      </div>
      <Button className="" onClick={props.deleteButon}>delete</Button>
      <Button className="ml-2" onClick={props.newButton}>new</Button>
    </Row>
  );
}

export default UserItem;