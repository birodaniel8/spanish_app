import { SET_USER, SET_SETTINGS, SET_STATS } from "../actions/types.js";

const initialState = {
  user: null,
  settings: null,
  stats: null,
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
    case SET_STATS:
      return {
        ...state,
        stats: action.payload,
      };
    default:
      return state;
  }
}
