import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../config/store/actions/auth';
import Input from '../../common/input/Input';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
    }
  }

  inchangedHandler(event, stateName) {
    event.preventDefault();
    const newState = {...this.state};
    newState[stateName] = event.target.value;
    this.setState(newState);
  }

  submitHandler = () => {
    const { username, password } = this.state;
    const data={
      username,
      password
    }
    this.props.onRegister(data);
  }

  render() {
    const error = this.state.error ? <p>{this.state.error}</p> : null;
    return (
      <form onSubmit={this.submitHandler}>
        <Input 
          type="text" 
          name="Username" 
          changed={(event) => this.inchangedHandler(event, 'username')}
        />
        <Input 
          type="password" 
          name="Password"
          changed={(event) => this.inchangedHandler(event, 'password')}
        />
        {error}
        <button type="button" onClick={this.submitHandler}>Regist</button>
      </form>
    );
  }
}

const mapDispatchProps = (dispatch) => {
  return {
    onRegister: (data) => dispatch(actions.register(data))
  };
}

export default connect(null, mapDispatchProps)(Login);