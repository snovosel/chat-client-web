import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import styles from './index.style.scss';

class InputText extends Component {
  render() {
    const { placeholder } = this.props;

    return (
      <input placeholder={placeholder} styleName="input-text" />
    );
  }
}

const InputTextStyled = CSSModules(InputText, styles, {
  allowMultiple: true,
});

export default InputTextStyled;
