import io from "socket.io-client";
import { put, call, take, race, takeEvery } from 'redux-saga/effects';
import { eventChannel } from "redux-saga";

export const START_CHANNEL = "START_CHANNEL";
export const STOP_CHANNEL = 'STOP_CHANNEL';

export const SERVER_ON = "SERVER_ON";

export const SEND_MESSAGE = "SEND_MESSAGE";
export const NEW_MESSAGE = "NEW_MESSAGE";

const initialState = {
  messages: [],
  connected: false,
};

export function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, payload]
      }

    case SERVER_ON: {
      console.log('server is on');
      return {
        ...state,
        connected: true,
      }
    }

    default:
      return state;
  }
};

export const startChannel = name => ({ type: START_CHANNEL, payload: name });
export const stopChannel = () => ({ type: STOP_CHANNEL });
export const sendMessage = payload => ({
  type: SEND_MESSAGE,
  payload,
});

// wrapping functions for socket events (connect, disconnect, reconnect)
const socketServerURL = "localhost:8080";
let socket;

const connect = () => {
  socket = io(socketServerURL);
  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket, "connect");
    });
  });
};

const createSocketChannel = socket => eventChannel((emit) => {
  socket.on('message', payload => emit({ type: NEW_MESSAGE, payload }));
  return () => {
    socket.off('message', () => emit());
  };
});

function* listenServerSaga() {
  try {
    const socket = yield call(connect);
    yield put({type: SERVER_ON });
    const socketChannel = yield call(createSocketChannel, socket);

    while (true) {
      const { type, payload } = yield take(socketChannel);
      yield put({type, payload});
    }
  } catch (e) {
    console.log('e', e);
  }
}

function* sendMessadgSaga({ payload }) {
  try {
    yield socket.emit('message', payload);
  } catch(e) {
    console.log('err', e);
  }
}

// saga listens for start and stop actions
export const socketWatchers = function* () {
  while (true) {
    yield take(START_CHANNEL);
    yield takeEvery(SEND_MESSAGE, sendMessadgSaga);
    yield race({
      task: call(listenServerSaga),
      cancel: take(STOP_CHANNEL),
    });
  }
};
