import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import ButtonConfig from '../components/buttonConfig';
import gravatarEmail from '../redux/action/gravatarEmail';
import callAPI from '../services/callAPI';

class Login extends Component {
  state = {
    isDisabled: true,
    redirect: false,
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

  handleSubmit = async (event) => {
    event.preventDefault();

    const { dispatch } = this.props;
    const { email, playerName } = this.state;
    dispatch(gravatarEmail(email, playerName));

    this.setState({ isDisabled: true });
    await callAPI();
    this.setState({ redirect: true });
  };

  render() {
    const { isDisabled, playerName, email, redirect } = this.state;
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
        {redirect && <Redirect to="/trivia" />}
      </main>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
