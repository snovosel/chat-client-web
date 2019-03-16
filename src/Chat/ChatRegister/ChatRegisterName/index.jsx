import React, { Component } from "react";

import ChatRegisterStep from "../ChatRegisterStep/index.jsx";
import ChatRegisterStepButton from "../ChatRegisterStep/ChatRegisterStepButton/index.jsx";

const ChatRegisterName = ({ initialValue, onSubmit, ...restProps }) => (
  <ChatRegisterStep initialValue={initialValue} stepName="name" {...restProps}>
    <ChatRegisterStepButton
      disabled={initialValue === ""}
      label="next"
      onClick={() => onSubmit("next")}
    />
  </ChatRegisterStep>
);

export default ChatRegisterName;
