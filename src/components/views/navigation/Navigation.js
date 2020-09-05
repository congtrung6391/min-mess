import React, { useContext } from 'react';
import { connect } from 'react-redux';
import NavItem from '../../common/navItem/NavItem';
import * as actions from '../../../config/store/actions/auth';
import * as routerPath from '../../../config/router';
import { SocketContext } from '../../../context/context';
import styles from '../../../styles/styles.module.css';

const Navigation = ( props ) => {
  const socket = useContext(SocketContext);
  let navItems = (
    <div>
      <NavItem path={routerPath.LOGIN}>Login</NavItem>
      <NavItem path={routerPath.REGISTER}>Register</NavItem>
    </div>
  );
  if (props.user) {
    console.log("[update user] " + props.user);
    if(props.user) {
      socket.emit('join', props.user);
    }
    navItems = (
      <div>
        <NavItem path={`/${props.user}`}>{props.user}</NavItem>
        <NavItem path="/" clicked={props.onLogout}>Log out</NavItem>
      </div>
    );
  }
  // console.log(props.user);

  return (
    <div className={styles.navigation}>
      {navItems}
    </div>
  );
}

const mapStateProps = (state) => {
  return  {
    user: state.auth.user
  };
}
const mapDispatchProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
}

export default connect(mapStateProps, mapDispatchProps)(Navigation);