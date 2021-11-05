import { SET_USER, SET_SETTINGS, SET_STATS } from "../actions/types.js";

// Update user:
export const setUser = (user) => (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: user,
  });
};

// Update settings:
export const setSettings = (settings) => (dispatch) => {
  dispatch({
    type: SET_SETTINGS,
    payload: settings,
  });
};

// Update stats:
export const setStats = (stats) => (dispatch) => {
  dispatch({
    type: SET_STATS,
    payload: stats,
  });
};
