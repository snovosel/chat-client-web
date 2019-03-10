import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import styles from './index.style.scss';

class InputTextArea extends Component {
  render() {
    const { placeholder } = this.props;
    return (
      <textarea styleName="text-area" placeholder={placeholder} />
    );
  }
}

const InputTextAreaStyled = CSSModules(InputTextArea, styles, {
  allowMultiple: true,
});

export default InputTextAreaStyled;
