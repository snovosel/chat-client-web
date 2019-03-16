import React, { Component } from "react";
import CSSModules from "react-css-modules";

import styles from "./index.styles.scss";

class ChatRoomChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
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
    const { sendMessage, room, name } = this.props;

    sendMessage({ message, name, room });
    this.setState({
      message: ""
    });
  }

  renderMessage({ message, name }) {
    const { username } = this.props;
    return (
      <li styleName={name !== username ? "left" : "right"} key={Math.random()}>
        <span>
          <p>{message}</p>
        </span>
        <span styleName={name !== username ? "left-name" : "right-name"}>
          {name !== username ? (
            <p>
              <b>{name}</b>
            </p>
          ) : null}
        </span>
      </li>
    );
  }

  render() {
    const { room, messages } = this.props;

    console.log("messages", messages);

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
            {messages.map(message => this.renderMessage(message))}
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

const ChatRoomChatStyled = CSSModules(ChatRoomChat, styles, {
  allowMultiple: true
});

export default ChatRoomChatStyled;
