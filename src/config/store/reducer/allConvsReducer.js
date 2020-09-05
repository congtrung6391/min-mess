import * as actionsType from '../actions/actionsType';

const initialState = {
  convs: [],
  loading: false,
  error: null,
}

const allConvsStart = (state, action) => {
  console.log("[Red start]");
  return {
    ...state,
    loading: true,
    error: null,
  }
}

const allConvsSucces = (state, action) => {
  console.log("[Red success]");
  return {
    ...state,
    loading: false,
    error: null,
    convs: action.convs,
  }
}

const allConvsUpdate = (state, action) => {
  console.log("[Red update]");
  // console.log(state);
  const { convs } = state;
  // console.log(content);
  convs.push(action.conv); 
  // console.log(content);
  // console.log({ ...state, content: content,})
  return {
    ...state,
    convs: convs,
  }
}

const allConvsFail = (state, action) => {
  console.log("[Red fail]");
  return {
    ...state,
    convs: [],
    loading: false,
    error: action.error,
  }
}

const allConvsReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionsType.ALL_CONVS_START: return allConvsStart(state, action);
    case actionsType.ALL_CONVS_SUCCESS: return allConvsSucces(state, action);
    case actionsType.ALL_CONVS_UPDATE: return allConvsUpdate(state, action);
    case actionsType.ALL_CONVS_FAIL: return allConvsFail(state, action);
    default:
      return state;
  }
}

export default allConvsReducer;