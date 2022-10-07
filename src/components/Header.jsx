import React, { Component } from 'react';

export default class Header extends Component {
  state = {
    token: '',
  };

  componentDidMount() {
    this.getTokenLocalStorage();
  }

  getTokenLocalStorage = () => {
    const token = localStorage.getItem('token');
    this.setState({ token });
  };

  render() {
    const { token } = this.state;
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${token}` }
          alt="Imagem do Gravatar"
          data-testid="header-profile-picture"
        />
        <h1 data-testid="header-player-name">PlayerName</h1>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}
