import { SET_USER, SET_SETTINGS } from "../actions/types.js";

const initialState = {
  user: null,
  settings: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_SETTINGS:
      return {
        ...state,
        settings: action.payload,
      };
    default:
      return state;
  }
}
