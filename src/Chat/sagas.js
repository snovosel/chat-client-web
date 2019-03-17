import io from "socket.io-client";
import {
  put,
  call,
  take,
  race,
  takeEvery,
  select,
  fork,
  cancelled
} from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import * as DUCKS from "./ducks.js";

const socketServerURL = "localhost:8080";
let socket;

export const connect = ({ currentUser, room }) => {
  socket = io(socketServerURL);
  return new Promise(resolve => {
    socket.on("connect", () => {
      socket.emit("room", { name: currentUser, room });
      resolve(socket, "connect");
    });
  });
};

export const disconnect = () => {
  socket = io(socketServerURL);
  return new Promise(resolve => {
    socket.on("disconnect", () => {
      resolve(socket);
    });
  });
};

export const createSocketChannel = socket =>
  eventChannel(emit => {
    socket.on("message", payload => emit({ type: DUCKS.NEW_MESSAGE, payload }));
    return () => {
      socket.off("message", () => emit());
      socket.off("join", () => emit());
    };
  });

function* listenDisconnectSaga() {
  while (true) {
    yield call(disconnect);
  }
}

function* listenServerSaga() {
  try {
    const { room, currentUser } = yield select(DUCKS.getChatDetails);
    const socket = yield call(connect, { room, currentUser });
    yield put({ type: DUCKS.CHANNEL_ON });
    const socketChannel = yield call(createSocketChannel, socket);

    yield fork(listenDisconnectSaga);

    while (true) {
      const { type, payload } = yield take(socketChannel);
      yield put({ type, payload });
    }
  } catch (e) {
    console.log("e listenServerSaga", e);
  } finally {
    if (yield cancelled()) {
      socket.disconnect(true);
      yield put({ type: DUCKS.CHANNEL_OFF });
    }
  }
}

function* sendMessageSaga({ payload }) {
  try {
    yield socket.emit("message", payload);
  } catch (e) {
    console.log("err", e);
  }
}

// saga listens for start and stop actions
export const chatWatchers = function*() {
  while (true) {
    yield take(DUCKS.START_CHANNEL);
    yield takeEvery(DUCKS.SEND_MESSAGE, sendMessageSaga);
    yield race({
      task: call(listenServerSaga),
      cancel: take(DUCKS.STOP_CHANNEL)
    });
  }
};
