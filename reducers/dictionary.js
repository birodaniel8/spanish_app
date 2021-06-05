/* eslint-disable import/no-anonymous-default-export */
import { LOAD_DICTIONARY } from "../actions/types.js";

const initialState = {
  dictionary: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_DICTIONARY:
      return {
        ...state,
        dictionary: action.payload,
      };
    default:
      return state;
  }
}
