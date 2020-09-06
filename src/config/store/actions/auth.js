import axios from '../../axios/axios';
import * as routeTypes from '../../router';
import * as actionTypes from './actionsType';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
}

export const authSucces = (token, username) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    username,
  };
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
}

export const login = (data) => {
  return dispatch => {
    dispatch(authStart());
    axios({
      method: "POST",
      url: routeTypes.LOGIN,
      data: data
    })
      .then(response => {
        cookies.set("tokens", response.data.token, {path: routeTypes.BASE});
        cookies.set("username", data.username, {path: routeTypes.BASE});
        console.log(cookies);
        dispatch(authSucces(response.data.token, data.username));
      }) 
      .catch(error => {
        console.log("[error] " + error.message);
        dispatch(authFail(error.message));
      }); 
  }  
}

export const register = (data) => {
  return dispatch => {
    dispatch(authStart());
    axios({
      method: "POST",
      url: routeTypes.REGISTER, 
      data: data
    })
      .then(response => {
        cookies.set("tokens", response.data.token, {path: routeTypes.BASE});
        cookies.set("username", data.username, {path: routeTypes.BASE});
        dispatch(authSucces(response.data.token, response.data.token));
      }) 
      .catch(error => {
        dispatch(authFail(error.message));
      });
  }  
}

export const logout = () => {
  return dispatch => {
    // localStorage.setItem("tokens", null);
    // localStorage.setItem("username", null); 
    cookies.remove("tokens", {path: routeTypes.BASE});
    cookies.remove("username", {path: routeTypes.BASE});
    dispatch(authFail(null));
  }
}