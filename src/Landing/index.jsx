import React, { Component, Fragment } from "react";
import CSSModules from "react-css-modules";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  startChannel,
  sendMessage,
  stopChannel,
  setUsername,
  clearUsername
} from "../socket.js";

import styles from "./index.styles.scss";

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

export class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      name: "",
      room: ""
    };

    this.handleSend = this.handleSend.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.startChannel = this.startChannel.bind(this);
    this.handleChangeNickname = this.handleChangeNickname.bind(this);
    this.handleRoomChange = this.handleRoomChange.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.renderStep = this.renderStep.bind(this);
    this.saveUsername = this.saveUsername.bind(this);
  }

  startChannel() {
    const { startChannel } = this.props;
    const { name, room } = this.state;
    startChannel({ name, room });
  }

  saveUsername() {
    const { setUsername } = this.props;
    setUsername(this.state.name);
  }

  handleLeave() {
    const { stopChannel } = this.props;
    stopChannel();
  }

  handleRoomChange({ target: { value } }) {
    this.setState({
      room: value
    });
  }

  handleChangeNickname({ target: { value } }) {
    this.setState({
      name: value
    });
  }

  handleChange({ target: { value } }) {
    this.setState({
      message: value
    });
  }

  handleSend() {
    const { message, name, room } = this.state;
    const { sendMessage } = this.props;

    sendMessage({ message, name, room });
    this.setState({
      message: ""
    });
  }

  renderStep() {
    const { room, username, setUsername, clearUsername } = this.props;

    if (!room && !username) {
      return (
        <div styleName="input">
          <span>
            <p>
              enter your <b>name</b>
            </p>
            <input
              styleName="text"
              value={this.state.name}
              onChange={this.handleChangeNickname}
            />
          </span>
          <button
            styleName={`button ${
              this.state.name !== "" ? "active" : "disabled"
            }`}
            disabled={this.state.name === ""}
            onClick={this.saveUsername}
          >
            ready
          </button>
        </div>
      );
    } else if (!room && username !== null) {
      return (
        <div styleName="input">
          <span>
            <p>
              enter your <b>room</b>
            </p>
            <input
              styleName="text"
              value={this.state.room}
              onChange={this.handleRoomChange}
            />
          </span>
          <div styleName="nav">
            <button styleName="back" onClick={clearUsername}>
              back
            </button>
            <button
              styleName={`button ${
                this.state.room !== "" ? "active" : "disabled"
              }`}
              disabled={this.state.room === ""}
              onClick={this.startChannel}
            >
              ready
            </button>
          </div>
        </div>
      );
    }
  }

  render() {
    const { messages, connected, room, username } = this.props;

    console.log("username", username);

    if (connected) {
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
                <li key={Math.random()}>
                  <span>
                    <p>{message.message}</p>
                  </span>
                  <span styleName="name">
                    <p>
                      <b>{message.name}</b>
                    </p>
                  </span>
                </li>
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
    } else {
      return <div styleName="container">{this.renderStep()}</div>;
    }
  }
}

const LandingStyled = CSSModules(Landing, styles, {
  allowMultiple: true
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingStyled);
