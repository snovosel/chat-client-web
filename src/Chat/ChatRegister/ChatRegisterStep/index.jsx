import React, { Component } from "react";
import CSSModules from "react-css-modules";

import styles from "./index.styles.scss";

const ChatRegisterStep = ({ children, stepName, initialValue, onChange }) => (
  <div styleName="step">
    <p styleName="step-header">
      enter your <b>{stepName}</b>
    </p>
    <input
      styleName="step-text"
      value={initialValue}
      onChange={({ target: { value } }) => onChange({ stepName, value })}
    />
    <div styleName="children">{children}</div>
  </div>
);

const ChatRegisterStepStyled = CSSModules(ChatRegisterStep, styles, {
  allowMultiple: true
});

export default ChatRegisterStepStyled;
