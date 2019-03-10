import { combineReducers } from "redux";

// every feature should have its own reducer here
import { reducer as landing } from "Landing/ducks.js";
import { reducer as socket } from "./socket.js";

export const rootReducer = combineReducers({
  landing,
  socket,
});
