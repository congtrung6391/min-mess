import * as actionsType from '../actions/actionsType';

const initialState = {
  peername: null,
  content: [],
  createAt: null,
  loading: false,
  error: null,
}

const convStart = (state, action) => {
  console.log("[Red start]");
  return {
    ...state,
    loading: true,
    error: null,
  }
}

const convSucces = (state, action) => {
  console.log("[Red success]");
  return {
    ...state,
    loading: false,
    error: null,
    peername: action.data.peername,
    createAt: action.data.createdAt,
    content: action.data.content,
  }
}

const convUpdate = (state, action) => {
  console.log("[Red update]");
  // console.log(state);
  const { content } = state;
  // console.log(content);
  content.push(action.message); 
  // console.log(content);
  // console.log({ ...state, content: content,})
  return {
    ...state,
    content: content,
  }
}

const convFail = (state, action) => {
  console.log("[Red fail]");
  return {
    ...state,
    loading: false,
    error: action.error,
    peername: null,
    content: null,
    createAt: null,
  }
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionsType.CONV_START: return convStart(state, action);
    case actionsType.CONV_SUCCESS: return convSucces(state, action);
    case actionsType.CONV_UPDATE: return convUpdate(state, action);
    case actionsType.CONV_FAIL: return convFail(state, action);
    default:
      return state;
  }
}

export default authReducer;