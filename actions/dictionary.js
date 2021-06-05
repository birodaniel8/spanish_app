import { LOAD_DICTIONARY } from "../actions/types.js";

// Load Word Dictionary:
export const loadDictionary = (dictionary) => (dispatch) => {
  dispatch({
    type: LOAD_DICTIONARY,
    payload: dictionary,
  });
};
