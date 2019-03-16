import React, { Component } from "react";
import CSSModules from "react-css-modules";

import styles from "./index.styles.scss";

import ChatRegisterName from "./ChatRegisterName/index.jsx";
import ChatRegisterRoom from "./ChatRegisterRoom/index.jsx";

const registerSteps = {
  name: ChatRegisterName,
  room: ChatRegisterRoom
};

class ChatRegister extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: "name",
      values: {
        name: "",
        room: ""
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(direction) {
    const {
      currentStep,
      values: { name, room }
    } = this.state;
    const { startChannel } = this.props;

    if (
      direction === "next" &&
      currentStep === "room" &&
      room !== "" &&
      name !== ""
    ) {
      startChannel({ name, room });
    }

    if (direction === "next" && currentStep === "name") {
      this.setState({
        currentStep: "room"
      });
    }

    if (direction === "back" && currentStep === "room") {
      this.setState({
        currentStep: "name"
      });
    }
  }

  handleChange({ stepName, value }) {
    this.setState({
      values: {
        ...this.state.values,
        [stepName]: value
      }
    });
  }

  render() {
    const { currentStep, values } = this.state;
    const Step = registerSteps[currentStep];

    return (
      <div styleName="container">
        <Step
          initialValue={values[currentStep]}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const ChatRegisterStyled = CSSModules(ChatRegister, styles);

export default ChatRegisterStyled;
