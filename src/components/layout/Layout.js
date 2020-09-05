import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as routePath from '../../config/router';

import ConversationPage from './conversationPage';
import Login from '../views/login/Login';
import RegisterPanel from '../views/register/RegisterPanel';
import Navigation from '../views/navigation/Navigation';

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <Switch>
          <Route 
            path="/"
            exact
            component={ConversationPage}
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

export default Layout;