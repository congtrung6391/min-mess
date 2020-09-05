import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../config/store/actions/auth';
import Input from '../../common/input/Input';
import { Redirect } from 'react-router-dom';

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

  submitHandler = async () => {
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
      control = <p>{this.props.error}</p>;
    } else if(this.props.user) {
      control = <Redirect to="/" />
    }
    return (
      <form onSubmit={this.submitHandler}>
        <Input 
          type="text" 
          name="Username" 
          placeholder="Username"
          changed={(event) => this.inchangedHandler(event, 'username')}
        />
        <Input 
          type="password" 
          name="Password"
          placeholder="Your password"
          changed={(event) => this.inchangedHandler(event, 'password')}
        />
        {control}
        <button type="button" onClick={this.submitHandler}>Login</button>
      </form>
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