import React, { Component } from 'react';
import ButtonConfig from '../components/buttonConfig';

export default class Login extends Component {
  state = {
    isDisabled: true,
    playerName: '',
    email: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      const { playerName, email } = this.state;
      if (playerName.length >= 1 && /\S+@\S+\.\S+/.test(email)) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('oi');
  };

  render() {
    const { isDisabled, playerName, email } = this.state;
    return (
      <main>
        <form
          onSubmit={ this.handleSubmit }
        >
          <input
            type="email"
            data-testid="input-gravatar-email"
            required
            name="email"
            onChange={ this.handleChange }
            value={ email }
          />
          <input
            type="text"
            data-testid="input-player-name"
            required
            name="playerName"
            onChange={ this.handleChange }
            value={ playerName }
          />
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ isDisabled }
          >
            Play
          </button>
        </form>
        <ButtonConfig />
      </main>
    );
  }
}
