import React, { Component } from "react";
import CSSModules from "react-css-modules";

import Chat from "Chat/index.jsx";

import styles from "./App.scss";

class App extends Component {
  render() {
    return (
      <div styleName="app-container">
        <h1 styleName="header">Psst...</h1>
        <Chat />
      </div>
    );
  }
}

export default CSSModules(App, styles);
