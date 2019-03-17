export const START_CHANNEL = "START_CHANNEL";
export const STOP_CHANNEL = "STOP_CHANNEL";

export const CHANNEL_ON = "CHANNEL_ON";

export const CHANNEL_OFF = "CHANNEL_OFF";

export const SEND_MESSAGE = "SEND_MESSAGE";
export const NEW_MESSAGE = "NEW_MESSAGE";

const initialState = {
  messages: [],
  connected: false,
  room: null,
  currentUser: null
};

export function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case NEW_MESSAGE:
      return {
        ...state,
        messages: [payload, ...state.messages]
      };

    case START_CHANNEL:
      return {
        ...state,
        currentUser: payload.name,
        room: payload.room
      };

    case CHANNEL_OFF:
      return {
        ...state,
        room: null,
        connected: false,
        messages: []
      };

    case CHANNEL_ON:
      return {
        ...state,
        connected: true
      };

    default:
      return state;
  }
}

export const getChatDetails = state => state.chat;

export const startChannel = payload => ({ type: START_CHANNEL, payload });
export const stopChannel = () => ({ type: STOP_CHANNEL });

export const sendMessage = payload => ({
  type: SEND_MESSAGE,
  payload
});
