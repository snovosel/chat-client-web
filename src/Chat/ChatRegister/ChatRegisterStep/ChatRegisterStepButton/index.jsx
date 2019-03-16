import React, { Component } from "react";
import CSSModules from "react-css-modules";

import styles from "./index.styles.scss";

class ChatRegisterStepButton extends Component {
  render() {
    const { color, disabled, onClick, label } = this.props;
    return (
      <button
        styleName={`button ${color} ${!disabled ? "" : "disabled"}`}
        disabled={disabled}
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
}

ChatRegisterStepButton.defaultProps = {
  color: "default"
};

const ChatRegisterStepButtonStyled = CSSModules(
  ChatRegisterStepButton,
  styles,
  {
    allowMultiple: true
  }
);

export default ChatRegisterStepButtonStyled;
