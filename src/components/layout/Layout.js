import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as routePath from '../../config/router';

import ConversationPage from './conversationPage';
import Login from '../views/login/Login';
import RegisterPanel from '../views/register/RegisterPanel';
import Navigation from '../views/navigation/Navigation';

class Layout extends React.Component {
  render() {
    let homepage = ConversationPage;
    if(!this.props.user) {
      homepage = Login;
    }
    return (
      <div>
        <Navigation />
        <Switch>
          <Redirect from="/logout" to="/" />
          <Route 
            path="/"
            exact
            component={homepage}
          />
          <Route 
            path={routePath.LOGIN}
            exact
            component={Login}
          />
          <Route 
            path={routePath.REGISTER}
            exact
            component={RegisterPanel}
          />
        </Switch>
      </div>
    );
  };
}

const mapStateProps = state => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateProps)(Layout);