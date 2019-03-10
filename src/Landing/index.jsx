import React, { Component } from 'react';
// import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { startChannel, sendMessage } from '../socket.js';

const mapStateToProps = ({
  socket: {
    messages,
    connected
  }
}) => ({
  messages
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      startChannel,
      sendMessage,
    },
    dispatch
  );

export class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: null,
    }

    this.handleSend = this.handleSend.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { startChannel } = this.props;
    startChannel();
  }

  handleChange({ target: { value }}) {
    this.setState({
      message: value,
    });
  }

  handleSend() {
    const { message } = this.state;

    const { sendMessage } = this.props;
    sendMessage(message);
  }

  render() {
    const { messages, connected } = this.props;

    if (connected) {
      return (
        <div>
          <ul>
            {messages.map(message => <li key={message}>{message}</li>)}
          </ul>
          <input placeholder="send a message" onSubmit={this.handleSend} onChange={this.handleChange} />
          <button onClick={this.handleSend} type="submit">send</button>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
