import React, { Component } from "react";
import CSSModules from "react-css-modules";

import Landing from "Landing/index.jsx";

import styles from "./App.scss";

class App extends Component {
  render() {
    return (
      <div styleName="app-container">
        <h1 styleName="header">Psst...</h1>
        <Landing />
      </div>
    );
  }
}

export default CSSModules(App, styles);
