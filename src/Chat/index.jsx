import React, { Component } from "react";
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

import ChatRoom from "./ChatRoom/index.jsx";
import ChatRegister from "./ChatRegister/index.jsx";

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

const signInSteps = [
  () => <ChatRegister stepName="name" />,
  () => <ChatRegister stepName="room" />,
  () => (
    <div styleName="input">
      <span>
        <p>
          enter your <b>room</b>
        </p>
        <input styleName="text" />
      </span>
      <div styleName="nav">
        <button styleName="back" onClick={clearUsername}>
          back
        </button>
        <button
          styleName={`button ${this.state.room !== "" ? "active" : "disabled"}`}
          disabled={this.state.room === ""}
          onClick={this.startChannel}
        >
          ready
        </button>
      </div>
    </div>
  )
];

export class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      name: "",
      room: ""
    };

    this.startChannel = this.startChannel.bind(this);
    this.handleChangeNickname = this.handleChangeNickname.bind(this);
    this.handleRoomChange = this.handleRoomChange.bind(this);
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

  renderStep() {
    const { room, username, clearUsername } = this.props;

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
    const { connected, ...restProps } = this.props;

    if (connected) {
      return <ChatRoom {...restProps} />;
    } else {
      return <ChatRegister {...restProps} />;
    }
  }
}

const ChatStyled = CSSModules(Chat, styles);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatStyled);
