import axios from '../../axios/axios';
import * as actionsType from './actionsType';
import * as routeTypes from '../../router';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const convStart = () => {
  return {
    type: actionsType.CONV_START,
  }
}

export const convSuccess = (data) => {
  return {
    type: actionsType.CONV_SUCCESS,
    data: data,
  }
}

export const convUpdate = (message) => {
  // console.log(message);
  return {
    type: actionsType.CONV_UPDATE,
    message: message,
  } 
}

export const convFail = (error) => {
  return {
    type: actionsType.CONV_FAIL,
    error: error,
  }
}

export const searchUsernameAPI = (peername) => {
  return dispatch => {
  axios({
    method: "GET",
    url: "user/" + peername,
    params: {
      username: peername
    }
  })
    .then(response => {
      dispatch(convSuccess([{
        createdAt: "data is not yet handler",
        messages: [],
        peername: peername,
      }]));
    })
    .catch(error => {
      dispatch(convFail(error));
    });
  }
}

export const deleteConv = (peerName) => {
  // const token = JSON.parse(localStorage.getItem("tokens"));
  const token = cookies.get("tokens");
  console.log("[Conversaiton will be deleted] " + peerName);
  return dispatch => {
    dispatch(convStart());
    axios({
      method: "PUT", 
      url: "/conversation/delete",
      data: { peerName },
      headers: {
        'Authorization': token
      }
    })
      .then((response) => {
        console.log("[Response]");
        console.log(response);
        dispatch(convFail(null));
      })
      .catch((error) => {
        dispatch(convFail(error));
      });
  }
}

export const createConv = (peername) => {
  // const token = JSON.parse(localStorage.getItem("tokens"));
  const token = cookies.get("tokens");
  // console.log("[Token will sent in createConv] " + token);
  return dispatch => {
    dispatch(convStart());
    axios({
      method: "POST", 
      url: "/conversation",
      data: { peerName: peername },
      headers: {
        'Authorization': token
      }
    })
      .then((response) => {
        // console.log("[Create success] " + peername);
        dispatch(convSuccess({
          createdAt: "time not yet handler",
          peername: peername,
          content: null,
        }));
      })
      .catch((error) => {
        return error;
      });
  }
}

export const sendMessage = (peername, sender, message) => {
  // const token = JSON.parse(localStorage.getItem("tokens"));
  const token = cookies.get("tokens");
  return async (dispatch) => {
    //try {
      dispatch(convStart());  
      await axios({
        method: "POST",
        url: "/conversation/message",
        data: {
          receiver: peername,
          sender: sender, 
          content: message,
        },
        headers: {
          "Authorization": token
        }
      })
        .then(response => {
          dispatch(convUpdate({sender: sender, content: message}));
        })
        .catch(error => {
          dispatch(convFail(error));
        });
  }
}