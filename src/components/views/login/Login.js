import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../config/store/actions/auth';
import InputForm from '../../common/input/InputForm';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.loading !== this.props.loading;
  }

  inchangedHandler(event, stateName) {
    event.preventDefault();
    const newState = {...this.state};
    newState[stateName] = event.target.value;
    this.setState(newState);
  }

  submitHandler = async (event) => {
    event.preventDefault();
    console.log("[login]");
    const { username, password } = this.state;
    const data={
      username,
      password
    }
    await this.props.onLogin(data);
    // console.log("[Log in login submit] " + this.props.error);
    // console.log("[Log in login submit] " + this.props.user);
    // console.log("[Log in login submit] " + this.props.loading);
    if(this.props.error) {
      this.setState({error: this.props.error});
    }
    // console.log(this.state.error);
  }

  render() {
    let control = null;
    // console.log(this.props.error);
    if(this.props.error) {
      control = <p className="text-danger">{this.props.error}</p>;
    } else if(this.props.user) {
      control = <Redirect to="/" />
    }
    return (
      <Form onSubmit={(event) => this.submitHandler(event)} className="col-md-4 col-sm-5 mx-auto mt-5 p-4 border rounded shadow-sm">
        <div className="d-flex justify-content-center block m-3">
          <h3 className="font-weight-bold">Login</h3>
        </div>
        <InputForm 
          controlID="usernameForm"
          type="text" 
          label="Username" 
          placeholder="username"
          changed={(event) => this.inchangedHandler(event, 'username')}
        />
        <InputForm
          controlID="passwordForm"
          type="password" 
          label="Password"
          placeholder="password"
          changed={(event) => this.inchangedHandler(event, 'password')}
        />
        <Button className="mt-4" block type="submit">Login</Button>
        {control}
      </Form>
    );
  }
}

const mapStateProps = (state) => {
  return {
    loading: state.auth.loading,
    user: state.auth.user,
    error: state.auth.error
  }
}

const mapDispatchProps = (dispatch) => {
  return {
    onLogin: (data) => dispatch(actions.login(data))
  };
}

export default connect(mapStateProps, mapDispatchProps)(Login);