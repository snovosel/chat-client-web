import React from "react";
import CSSModules from "react-css-modules";

import styles from "./index.styles.scss";

const ChatMessage = ({ messageInfo: { message, username }, currentUser }) => (
  <li styleName={username !== currentUser ? "left" : "right"}>
    <span>
      <p>{message}</p>
    </span>
    <span styleName={username !== currentUser ? "left-name" : "right-name"}>
      {username !== currentUser ? (
        <p>
          <b>{username}</b>
        </p>
      ) : null}
    </span>
  </li>
);

const ChatMessageStyled = CSSModules(ChatMessage, styles, {
  allowMultiple: true
});

export default ChatMessageStyled;
