import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../../../styles/styles.module.css';

const NavItem = (props) => {
  return (
    <NavLink 
      className={styles.NavLink}
      activeClassName={styles.NavLinkActive}
      to={props.path}
      onClick={props.clicked}
    >
      {props.children}
    </NavLink>
  );
}

export default NavItem;