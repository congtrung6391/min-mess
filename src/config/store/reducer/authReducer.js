import * as actionsType from '../actions/actionsType';

const initialState = {
  tokens: null,
  user: null,
  error: null,
  loading: false,
}

const authStart = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null,
  }
}

const authSucces = (state, action) => {
  // console.log("[Inside dispathc] " + action.username);
  return {
    ...state,
    loading: false,
    error: null,
    token: action.token,
    user: action.username,
  }
}

const authFail = (state, action) => {
  // console.log(action.error);
  return {
    ...state,
    loading: false,
    error: action.error,
    token: null,
    user: null,
  }
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionsType.AUTH_START: return authStart(state, action);
    case actionsType.AUTH_SUCCESS: return authSucces(state, action);
    case actionsType.AUTH_FAIL: return authFail(state, action);
    default:
      return state;
  }
}

export default authReducer;