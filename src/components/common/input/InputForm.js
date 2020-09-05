import React from 'react';
import { Form } from 'react-bootstrap';

const InputForm = (props) => {
  return (
    <Form.Group controlid={props.controlID} className="pb-2">
      <Form.Label>{props.label}</Form.Label>
      <Form.Control type={props.type} placeholder={props.placeholder} onChange={props.changed}/>
    </Form.Group>
  );
};

export default InputForm;