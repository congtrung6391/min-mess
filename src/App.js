import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';

import Layout from './components/layout/Layout';
import * as actionsType from './config/store/actions/actionsType';
import * as routeTypes from './config/router';


const App = (props) => {
  const cookies = new Cookies();
  console.log(cookies.cookies);

  useEffect( () => {
    const existingTokens = cookies.get("tokens");
    const existingUsername = cookies.get("username");
    const fecthLogin = async () => {
      await props.onAuth(existingTokens, existingUsername);
    };
    if(existingTokens) {
      fecthLogin();
      if(props.error) {
        console.log(props.error);
      }
    }
  });

  return (
    <div>
      <Layout />
    </div>
  );
}

const mapStateProps = state => {
  return {
    error: state.auth.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: async (token, username) => dispatch({type: actionsType.AUTH_SUCCESS, token: token, username: username})
  }
}

export default connect(mapStateProps, mapDispatchToProps)(App);
