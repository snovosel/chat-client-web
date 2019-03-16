import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  startChannel,
  sendMessage,
  stopChannel,
  setUsername,
  clearUsername
} from "../socket.js";

import ChatRoom from "./ChatRoom/index.jsx";
import ChatRegister from "./ChatRegister/index.jsx";

const mapStateToProps = ({
  socket: { messages, connected, room, username }
}) => ({
  messages,
  connected,
  room,
  username
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      startChannel,
      sendMessage,
      stopChannel,
      setUsername,
      clearUsername
    },
    dispatch
  );

export const Chat = ({ connected, ...restProps }) =>
  connected ? <ChatRoom {...restProps} /> : <ChatRegister {...restProps} />;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
