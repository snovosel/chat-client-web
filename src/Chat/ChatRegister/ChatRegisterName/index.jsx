import React, { Component } from "react";

import ChatRegisterStep from "../ChatRegisterStep/index.jsx";
import ChatRegisterStepButton from "../ChatRegisterStep/ChatRegisterStepButton/index.jsx";

const ChatRegisterName = ({ actions: { saveValue, next } }) => (
  <ChatRegisterStep stepName="name">
    {value => (
      <ChatRegisterStepButton
        disabled={!value}
        label="next"
        onClick={() => {
          saveValue("name", value);
          next();
        }}
      />
    )}
  </ChatRegisterStep>
);

export default ChatRegisterName;
