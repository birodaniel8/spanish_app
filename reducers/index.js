import { combineReducers } from "redux";
import dictionary from "./dictionary";
import user from "./user";
import cards from "./cards";

export default combineReducers({
  dictionary,
  user,
  cards,
});
