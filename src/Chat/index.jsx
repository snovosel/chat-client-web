import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { startChannel, sendMessage, stopChannel } from "./ducks.js";

import ChatRoom from "./ChatRoom/index.jsx";
import ChatRegister from "./ChatRegister/index.jsx";

const mapStateToProps = ({
  chat: { messages, connected, room, currentUser }
}) => ({
  messages,
  connected,
  room,
  currentUser
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      startChannel,
      sendMessage,
      stopChannel
    },
    dispatch
  );

export const Chat = ({ connected, ...restProps }) =>
  connected ? <ChatRoom {...restProps} /> : <ChatRegister {...restProps} />;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
