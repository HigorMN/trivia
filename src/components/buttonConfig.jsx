import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class ButtonConfig extends Component {
  state = {
    clickButton: false,
  };

  handleConfig = () => {
    this.setState({
      clickButton: true,
    });
  };

  render() {
    const { clickButton } = this.state;
    return (
      <>
        {
          clickButton && <Redirect to="/config" />
        }
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleConfig }
          className="login-button btn-settings"
        >
          Configuração
        </button>
      </>
    );
  }
}
