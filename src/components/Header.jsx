import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  state = {
    generatedHash: '',
  };

  componentDidMount() {
    this.getTokenLocalStorage();
  }

  getTokenLocalStorage = () => {
    const { email } = this.props;
    const generatedHash = md5(email).toString();
    this.setState({ generatedHash });
  };

  render() {
    const { generatedHash } = this.state;
    const { playerName, score } = this.props;
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${generatedHash}` }
          alt="Imagem do Gravatar"
          data-testid="header-profile-picture"
        />
        <h1 data-testid="header-player-name">{playerName}</h1>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  playerName: state.gravatar.name,
  score: state.player.score,
  email: state.gravatar.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
