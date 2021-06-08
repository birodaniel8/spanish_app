import { SET_CARDS, CORRECT_WORD, WRONG_WORD } from "../actions/types.js";

// Set word card list:
export const setWordCardList = (wordCardList) => (dispatch) => {
  dispatch({
    type: SET_CARDS,
    payload: wordCardList,
  });
};

// Remove the guessed word card:
export const removeCorrectWordCard = () => (dispatch) => {
  dispatch({
    type: CORRECT_WORD,
  });
};

// Put the wrong word card to the end:
export const replaceWrongWordCard = () => (dispatch) => {
  dispatch({
    type: WRONG_WORD,
  });
};
