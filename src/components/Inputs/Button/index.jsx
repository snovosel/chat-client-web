import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import styles from './index.style.scss';

class Button extends Component {
  render() {
    const { label, styleType } = this.props;

    return (
      <button styleName={`button ${styleType}`}>
        {label}
      </button>
    );
  }
}

Button.defaultProps = {
  styleType: '',
};

const ButtonStyled = CSSModules(Button, styles, {
  allowMultiple: true,
});

export default ButtonStyled;
