import axios from '../../axios/axios';
import * as actionsType from './actionsType';
import * as routeTypes from '../../router';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const allConvsStart = () => {
  return {
    type: actionsType.ALL_CONVS_START,
  }
}

export const allConvsSuccess = (convs) => {
  return {
    type: actionsType.ALL_CONVS_SUCCESS,
    convs: convs,
  }
}

export const allConvsUpdate = (conv) => {
  return {
    type: actionsType.ALL_CONVS_UPDATE,
    conv: conv,
  } 
}

export const allConvsFail = (error) => {
  return {
    type: actionsType.ALL_CONVS_FAIL,
    error: error,
  }
}

export const getAllConvs = () => {
  // const token = JSON.parse(localStorage.getItem("tokens"));
  const token = cookies.get("tokens", {path: routeTypes.BASE});
  // console.log("[token will be sent in delete] " + token);
  return async (dispatch) => {
    dispatch(allConvsStart());
    await axios({
      method: "GET", 
      url: routeTypes.GET_ALL_CONV,
      headers: {
        'Authorization': token
      }
    })
      .then((response) => {
        const data = JSON.parse(response.data);
        // const username = JSON.parse(localStorage.getItem("username"));
        const username = cookies.get("username");
        const convs = data.map(conv => {
          const peername = (conv.convUser_1.username === username
                            ? conv.convUser_2.username
                            : conv.convUser_1.username);
          return {
            createdAt: conv.createdAt,
            peername: peername,
            content: conv.messages,
          }
        });
        dispatch(allConvsSuccess(convs))
      })
      .catch((error) => {
        dispatch(allConvsFail(error))
      });
  };
}