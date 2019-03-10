import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import styles from './index.style.scss';

class InputCheckBox extends Component {
  constructor(props) {

    super(props);

    this.state = {
      selected: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      selected: !this.state.selected,
    });
  }

  render() {
    return (
      <div styleName="container">
        <div styleName={`slider ${this.state.selected === true ? "slider-on" : "slider-off"}`} />
        <input type="checkbox" styleName="box" value={this.state.selected}/>
        <div styleName={`knob ${this.state.selected === true ? "knob-right" : "knob-left"}`} onClick={this.handleClick} />
      </div>
    );
  }

}

const InputCheckBoxStyled = CSSModules(InputCheckBox, styles, {
  allowMultiple: true,
});

export default InputCheckBoxStyled;
