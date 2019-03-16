import React, { Component } from "react";
import CSSModules from "react-css-modules";

import styles from "./index.styles.scss";

const ChatMessage = ({ messageInfo: { message, name }, currentUser }) => (
  <li styleName={name !== currentUser ? "left" : "right"} key={Math.random()}>
    <span>
      <p>{message}</p>
    </span>
    <span styleName={name !== currentUser ? "left-name" : "right-name"}>
      {name !== currentUser ? (
        <p>
          <b>{name}</b>
        </p>
      ) : null}
    </span>
  </li>
);

const ChatMessageStyled = CSSModules(ChatMessage, styles, {
  allowMultiple: true
});

export default ChatMessageStyled;
