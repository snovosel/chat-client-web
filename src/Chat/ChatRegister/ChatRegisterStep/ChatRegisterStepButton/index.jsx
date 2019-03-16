import React from "react";
import CSSModules from "react-css-modules";

import styles from "./index.styles.scss";

const ChatRegisterStepButton = ({ color, disabled, onClick, label }) => (
  <button
    styleName={`button ${color} ${!disabled ? "" : "disabled"}`}
    disabled={disabled}
    onClick={onClick}
  >
    {label}
  </button>
);

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
