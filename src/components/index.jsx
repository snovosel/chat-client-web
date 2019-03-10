import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import Button from './Inputs/Button/index.jsx';
import InputText from './Inputs/InputText/index.jsx';
import InputTextArea from './Inputs/InputTextArea/index.jsx';
import InputCheckBox from './Inputs/InputCheckBox/index.jsx';

import styles from './style.scss';

class ComponentLibrary extends Component {

  render() {
    return (
      <div styleName="app-container">
        <h1>Inputs</h1>
        <h4>Buttons</h4>
        <Button label="check" styleType="wire" />
        <Button label="mate" styleType="wire" />
        <Button label="seconday" styleType="secondary" />
        <Button label="primary" styleType="primary" />
        <Button label="warning" styleType="tertiary" />
        <br />
        <h4>Input Text</h4>
        <InputText placeholder="Enter this here..." />
        <br />
        <h4>Input Text Area </h4>
        <InputTextArea placeholder="Enter text in this text area box..." />
        <h4>Check boxes </h4>
        <InputCheckBox />
        <br />
      </div>
    );
  }

}

const ComponentLibraryStyled = CSSModules(ComponentLibrary, styles);

export default ComponentLibraryStyled;
