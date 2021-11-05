import { SET_USER, SET_SETTINGS, SET_STATS, SET_STREAK_DONE } from "../actions/types.js";

const initialState = {
  user: null,
  settings: null,
  stats: null,
  isStreakDone: false,
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
    case SET_STREAK_DONE:
      return {
        ...state,
        isStreakDone: action.payload,
      };
    default:
      return state;
  }
}
