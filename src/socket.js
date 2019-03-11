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

export const START_CHANNEL = "START_CHANNEL";
export const START_CHANNEL_SUCCESS = "START_CHANNEL_SUCCESS";
export const STOP_CHANNEL = "STOP_CHANNEL";

export const SERVER_ON = "SERVER_ON";
export const SERVER_OFF = "SERVER_OFF";

export const CHANNEL_OFF = "CHANNEL_OFF";

export const SEND_MESSAGE = "SEND_MESSAGE";
export const NEW_MESSAGE = "NEW_MESSAGE";

export const JOIN_ROOM_SUCCESS = "JOIN_ROOM_SUCCESS";
export const LEAVE_ROOM = "LEAVE_ROOM";

export const SET_USERNAME = "SET_USERNAME";
export const CLEAR_USERNAME = "CLEAR_USERNAME";

const initialState = {
  messages: [],
  connected: false,
  room: null,
  username: null
};

export function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, payload]
      };

    case START_CHANNEL:
      return {
        ...state,
        room: payload.room
      };

    case CHANNEL_OFF:
      return {
        ...state,
        room: null,
        connected: false,
        messages: []
      };

    case SERVER_ON:
      return {
        ...state,
        connected: true
      };

    case SERVER_OFF:
      return {
        ...state,
        connected: false,
        messages: []
      };

    case LEAVE_ROOM:
      return {
        ...state,
        room: null,
        messages: []
      };

    case JOIN_ROOM_SUCCESS:
      return {
        ...state,
        messages: [...state.messages, ...payload]
      };

    case SET_USERNAME:
      return {
        ...state,
        username: payload
      };

    case CLEAR_USERNAME:
      return {
        ...state,
        username: null
      };

    default:
      return state;
  }
}

const getRoom = state => state.socket.room;

export const startChannel = payload => ({ type: START_CHANNEL, payload });
export const stopChannel = () => ({ type: STOP_CHANNEL });

export const sendMessage = payload => ({
  type: SEND_MESSAGE,
  payload
});

export const setUsername = payload => ({
  type: SET_USERNAME,
  payload
});

export const clearUsername = () => ({
  type: CLEAR_USERNAME
});

// wrapping functions for socket events (connect, disconnect, reconnect)
const socketServerURL = "localhost:8080";
let socket;

const connect = payload => {
  socket = io(socketServerURL);
  return new Promise(resolve => {
    socket.on("connect", () => {
      socket.emit("room", payload);
      resolve(socket, "connect");
    });
  });
};

const disconnect = () => {
  socket = io(socketServerURL);
  return new Promise(resolve => {
    socket.on("disconnect", () => {
      resolve(socket);
    });
  });
};

const createSocketChannel = socket =>
  eventChannel(emit => {
    socket.on("message", payload => emit({ type: NEW_MESSAGE, payload }));
    socket.on("join", payload => emit({ type: JOIN_ROOM_SUCCESS, payload }));
    return () => {
      socket.off("message", () => emit());
      socket.off("join", () => emit());
    };
  });

function* listenDisconnectSaga() {
  while (true) {
    yield call(disconnect);
    yield put({ type: SERVER_OFF });
  }
}

function* listenServerSaga() {
  try {
    const room = yield select(getRoom);
    const socket = yield call(connect, room);
    yield put({ type: SERVER_ON });
    const socketChannel = yield call(createSocketChannel, socket);

    yield fork(listenDisconnectSaga);

    while (true) {
      const { type, payload } = yield take(socketChannel);
      yield put({ type, payload });
    }
  } catch (e) {
    console.log("e", e);
  } finally {
    if (yield cancelled()) {
      socket.disconnect(true);
      yield put({ type: CHANNEL_OFF });
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
export const socketWatchers = function*() {
  while (true) {
    yield take(START_CHANNEL);
    yield takeEvery(SEND_MESSAGE, sendMessageSaga);
    yield race({
      task: call(listenServerSaga),
      cancel: take(STOP_CHANNEL)
    });
  }
};
