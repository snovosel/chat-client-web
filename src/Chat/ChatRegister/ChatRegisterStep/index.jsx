import React, { Component } from "react";
import CSSModules from "react-css-modules";

import styles from "./index.styles.scss";

class ChatRegisterStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }
  render() {
    const { children, stepName } = this.props;

    return (
      <div styleName="input">
        <p>
          enter your <b>{stepName}</b>
        </p>
        <span>
          <input
            styleName="text"
            value={this.state.value}
            onChange={({ target: { value } }) => this.setState({ value })}
          />
        </span>
        {children(this.state.value)}
      </div>
    );
  }
}

const ChatRegisterStepStyled = CSSModules(ChatRegisterStep, styles, {
  allowMultiple: true
});

export default ChatRegisterStepStyled;
