import React from "react";
import CSSModules from "react-css-modules";

import Wizard from "@snovosel/react-wizard";
import ChatRegisterName from "./ChatRegisterName/index.jsx";
import ChatRegisterRoom from "./ChatRegisterRoom/index.jsx";

import styles from "./index.styles.scss";

const registerSteps = [ChatRegisterName, ChatRegisterRoom];

const ChatRegister = () => (
  <div styleName="container">
    <Wizard steps={registerSteps}>
      {({ CurrentStep, saveValue, next, ...restWizardValues }) => (
        <CurrentStep {...restWizardValues} />
      )}
    </Wizard>
  </div>
);

const ChatRegisterStyled = CSSModules(ChatRegister, styles, {
  allowMultiple: true
});

export default ChatRegisterStyled;
