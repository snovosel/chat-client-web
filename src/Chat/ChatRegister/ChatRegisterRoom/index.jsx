import React, { Component, Fragment } from "react";
import CSSModules from "react-css-modules";

import ChatRegisterStep from "../ChatRegisterStep/index.jsx";
import ChatRegisterStepButton from "../ChatRegisterStep/ChatRegisterStepButton/index.jsx";

const ChatRegisterRoom = ({ actions: { saveValue, back, next } }) => (
  <ChatRegisterStep stepName="name">
    {value => (
      <Fragment>
        <ChatRegisterStepButton color="warn" label="back" onClick={back} />
        <ChatRegisterStepButton
          disabled={!value}
          label="ready"
          onClick={() => {
            saveValue("name", value);
            next();
          }}
        />
      </Fragment>
    )}
  </ChatRegisterStep>
);

export default ChatRegisterRoom;
