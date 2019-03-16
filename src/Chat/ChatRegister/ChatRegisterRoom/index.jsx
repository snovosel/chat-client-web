import React, { Component, Fragment } from "react";
import CSSModules from "react-css-modules";

import ChatRegisterStep from "../ChatRegisterStep/index.jsx";
import ChatRegisterStepButton from "../ChatRegisterStep/ChatRegisterStepButton/index.jsx";

import styles from "./index.styles.scss";

class ChatRegisterRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const {
      actions: { saveValue, next }
    } = this.props;
    saveValue("name", this.state.value);
    next();
  }

  // render() {
  //   const {
  //     actions: { back }
  //   } = this.props;
  //   return (
  //     <div styleName="input">
  //       <span>
  //         <p>
  //           enter your <b>room</b>
  //         </p>
  //         <input
  //           styleName="text"
  //           value={this.state.value}
  //           onChange={({ target: { value } }) => this.setState({ value })}
  //         />
  //       </span>
  //       <div styleName="nav">
  //         <button
  //           styleName="back"
  //           onClick={() => this.setState({ value: "" }, () => back())}
  //         >
  //           back
  //         </button>
  //         <button
  //           styleName={`button ${
  //             this.state.value !== "" ? "active" : "disabled"
  //           }`}
  //           disabled={this.state.value === ""}
  //           onClick={this.handleSubmit}
  //         >
  //           ready
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  render() {
    const {
      actions: { back }
    } = this.props;
    return (
      <ChatRegisterStep stepName="room">
        {value => (
          <Fragment>
            <ChatRegisterStepButton color="warn" label="back" onClick={back} />
            <ChatRegisterStepButton
              disabled={!value}
              label="ready"
              onClick={this.handleSubmit}
            />
          </Fragment>
        )}
      </ChatRegisterStep>
    );
  }
}

const ChatRegisterRoomStyled = CSSModules(ChatRegisterRoom, styles, {
  allowMultiple: true
});

export default ChatRegisterRoomStyled;
