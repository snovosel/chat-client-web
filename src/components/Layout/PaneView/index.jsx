import React, { Component, Fragment } from 'react';
import CSSModules from 'react-css-modules';
import { Switch, Route } from ' react-router-dom';

import styles from './index.style.scss';

class PaneView extends Component {
  constructor(props) {
    super(props);

    this.renderPane = this.renderPane.bind(this);
    this.closePane = this.closePane.bind(this);
  }

  closePane() {
    const { match: { path }, history } = this.props;

    history.push({
      pathname: `${path}`,
    });
  }

  renderPane() {
    const { match: { path }, route } = this.props;

    return (
      <Switch>
        <Route
          path={`${path}/${route}`}
          render={() => this.props.renderPaneComponent(this.closePane)}
        />
      </Switch>
    );
  }

  render() {
    return (
      <Fragment>
        <section styleName="manage-body">
          <div styleName="container">
            {this.renderPane()}
            <div styleName="content">
              {this.props.renderContent()}
            </div>
          </div>
        </section>
      </Fragment>
    );
  }

}

const PaneViewStyled = CSSModules(PaneView, styles, {
  allowMultiple: true,
});

export default PaneViewStyled;
