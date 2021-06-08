/* eslint-disable import/no-anonymous-default-export */
import { SET_CARDS, CORRECT_WORD, WRONG_WORD } from "../actions/types.js";

const initialState = {
  wordCardList: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CARDS:
      return {
        ...state,
        wordCardList: action.payload,
      };
    case CORRECT_WORD:
      return {
        ...state,
        wordCardList: [...state.wordCardList.slice(1)],
      };
    case WRONG_WORD:
      return {
        ...state,
        wordCardList: [...state.wordCardList.slice(1), state.wordCardList[0]],
      };
    default:
      return state;
  }
}
