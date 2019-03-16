import React, { Component } from "react";
import CSSModules from "react-css-modules";

import ChatMessage from "./ChatMessage/index.jsx";

import styles from "./index.styles.scss";

class ChatRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
  }

  handleChange({ target: { value } }) {
    this.setState({
      message: value
    });
  }

  handleLeave() {
    const { stopChannel } = this.props;
    stopChannel();
  }

  handleSend() {
    const { message } = this.state;
    const { sendMessage, room, currentUser } = this.props;

    sendMessage({ message, username: currentUser, room });
    this.setState({
      message: ""
    });
  }

  render() {
    const { room, messages } = this.props;
    const { currentUser } = this.props;

    return (
      <div styleName="container">
        <div styleName="chatroom">
          <div styleName="header">
            <button
              styleName="back active"
              onClick={this.handleLeave}
              type="submit"
            >
              leave
            </button>
            <div styleName="header-text">
              <p>
                You are connected to: <b>{room}</b>
              </p>
            </div>
          </div>
          <ul styleName="message-list">
            {messages.map(message => (
              <ChatMessage
                key={Math.random()}
                messageInfo={message}
                currentUser={currentUser}
              />
            ))}
          </ul>
          <div styleName="message">
            <input
              styleName="message-text"
              value={this.state.message}
              onSubmit={this.handleSend}
              onChange={this.handleChange}
            />
            <button
              styleName={`button ${
                this.state.message !== "" ? "active" : "disabled"
              }`}
              disabled={this.state.message === ""}
              onClick={this.handleSend}
            >
              psst
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const ChatRoomStyled = CSSModules(ChatRoom, styles, {
  allowMultiple: true
});

export default ChatRoomStyled;
