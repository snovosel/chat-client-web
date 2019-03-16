import { combineReducers } from "redux";

import { reducer as chat } from "./Chat/ducks.js";

export const rootReducer = combineReducers({
  chat
});
