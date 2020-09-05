import React from 'react';
import { connect } from 'react-redux';
import Layout from './components/layout/Layout';
import * as actionsType from './config/store/actions/actionsType';

class App extends React.Component {
  componentDidMount() {
    const existingTokens = JSON.parse(localStorage.getItem("tokens"));
    const existingUsername = JSON.parse(localStorage.getItem("username"));
    if(existingTokens) {
      this.props.onAuth(existingTokens, existingUsername);
    }
  } 

  render() {
    return (
      <div>
        <Layout />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (token, username) => dispatch({type: actionsType.AUTH_SUCCESS, token: token, username: username})
  }
}

export default connect(null, mapDispatchToProps)(App);
