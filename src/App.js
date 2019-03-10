import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { Switch, Route } from 'react-router-dom';

import Landing from 'Landing/index.jsx';
import ComponentLibrary from './components';

import styles from './App.scss';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/components" component={ComponentLibrary} />
      </Switch>
    );
  }
}

export default CSSModules(App, styles);
