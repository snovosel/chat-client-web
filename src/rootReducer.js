import { combineReducers } from "redux";

// every feature should have its own reducer here
import { reducer as socket } from "./socket.js";

export const rootReducer = combineReducers({
  socket
});
