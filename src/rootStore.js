import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

import { rootReducer } from "./rootReducer.js";
import { socketWatchers } from "./socket.js";

// const transform = watchers => watchers.map(watcher => watcher());

export function* rootSaga() {
  yield all([socketWatchers()]);
}

export function initializeStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  );

  sagaMiddleware.run(rootSaga);

  return store;
}

export const store = initializeStore();
export default store;
