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
  messages,
  connected
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
      message: "",
      name: "",
    }

    this.handleSend = this.handleSend.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.startChannel = this.startChannel.bind(this);
    this.handleChangeNickname = this.handleChangeNickname.bind(this);
  }

  // componentDidMount() {
  //   this.startChannel();
  // }

  startChannel() {
    const { startChannel } = this.props;
    const { name } = this.state;
    startChannel(name);
  }

  handleChangeNickname({ target: { value }}) {
    this.setState({
      name: value
    });
  }

  handleChange({ target: { value }}) {
    this.setState({
      message: value,
    });
  }

  handleSend() {
    const { message, name } = this.state;
    const { sendMessage } = this.props;

    sendMessage({ message, name });
    this.setState({
      message: ""
    });
  }

  render() {
    const {
      messages,
      connected
    } = this.props;

    if (connected) {
      return (
        <div>
          <ul>
            {messages.map(message => <li key={Math.random()}><div><span>{message.message}</span><span>{message.name}</span></div></li>)}
          </ul>
          <input placeholder="send a message" value={this.state.message} onSubmit={this.handleSend} onChange={this.handleChange} />
          <button onClick={this.handleSend} type="submit">send</button>
        </div>
      );
    }

    return (
      <div>
        <p>enter your name</p>
        <input value={this.state.name} onChange={this.handleChangeNickname} />
        <button onClick={this.startChannel}>Ready</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
