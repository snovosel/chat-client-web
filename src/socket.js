import io from "socket.io-client";
import { put, call, take, race, takeEvery } from 'redux-saga/effects';
import { eventChannel } from "redux-saga";

export const START_CHANNEL = "START_CHANNEL";
export const STOP_CHANNEL = 'STOP_CHANNEL';

export const CHANNEL_ON = "CHANNEL_ON";

export const SEND_MESSAGE = "SEND_MESSAGE";
export const NEW_MESSAGE = "NEW_MESSAGE";

const initialState = {
  messages: [],
};

export function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, payload]
      }

    default:
      return state;
  }
};

export const startChannel = () => ({ type: START_CHANNEL });
export const stopChannel = () => ({ type: STOP_CHANNEL });

export const sendMessage = message => ({
  type: SEND_MESSAGE,
  payload: message,
});

// wrapping functions for socket events (connect, disconnect, reconnect)
const socketServerURL = "localhost:8080";
let socket;

const connect = () => {
  socket = io(socketServerURL);
  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
};

const createSocketChannel = socket => eventChannel((emit) => {
  const handler = (data) => {
    emit(data);
  };
  socket.on('message', handler);
  return () => {
    socket.off('message', handler);
  };
});

function* listenServerSaga() {
  try {
    yield put({ type: CHANNEL_ON });
    const socket = yield call(connect);
    const socketChannel = yield call(createSocketChannel, socket);

    while (true) {
      const payload = yield take(socketChannel);
      yield put({type: NEW_MESSAGE, payload});
    }
  } catch (e) {
    console.log('e', e);
  }
}

function* sendMessagSaga({ payload }) {
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
    yield takeEvery(SEND_MESSAGE, sendMessagSaga);
    yield race({
      task: call(listenServerSaga),
      cancel: take(STOP_CHANNEL),
    });
  }
};
