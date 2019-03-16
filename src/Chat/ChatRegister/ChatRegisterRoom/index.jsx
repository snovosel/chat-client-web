import React, { Fragment } from "react";

import ChatRegisterStep from "../ChatRegisterStep/index.jsx";
import ChatRegisterStepButton from "../ChatRegisterStep/ChatRegisterStepButton/index.jsx";

const ChatRegisterRoom = ({ initialValue, onSubmit, ...restProps }) => (
  <ChatRegisterStep initialValue={initialValue} stepName="room" {...restProps}>
    <Fragment>
      <ChatRegisterStepButton
        color="warn"
        label="back"
        onClick={() => onSubmit("back")}
      />
      <ChatRegisterStepButton
        disabled={initialValue === ""}
        label="ready"
        onClick={() => onSubmit("next")}
      />
    </Fragment>
  </ChatRegisterStep>
);

export default ChatRegisterRoom;
