import { SET_USER_ROL, SET_USER_NAME, SET_AUTH_TOKEN, SET_USER_EMAIL } from "./actionsTypes";
import { createStore } from "./contextFactory";

const initialState = { userRol: "", username: "", authToken: "", userEmail: ""};

function reducer(state, action) {
  switch (action.type) {
    case SET_USER_ROL:
      return { ...state, userRol: action.payload };
    case SET_USER_NAME:
      return {...state, username: action.payload};
    case SET_AUTH_TOKEN:
      return {...state, authToken: action.payload};
    case SET_USER_EMAIL:
      return {...state, userEmail: action.payload};
    default:
      return state;
  }
}

export const {
  Provider: UserProvider,
  useSelector,
  useDispatch
} = createStore(reducer, initialState);