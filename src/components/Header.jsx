import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

import StarImage from './StarImage';
import configIco from '../images/configIco.png';

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
      <header className="header">
        <div className="center">
          <img
            src={ `https://www.gravatar.com/avatar/${generatedHash}` }
            alt="Imagem do Gravatar"
            data-testid="header-profile-picture"
            className="header-img-gravatar"
          />
          <h1
            data-testid="header-player-name"
            className="header-player-name"
          >
            { playerName }
          </h1>
        </div>
        <div className="center header-score-container">
          <StarImage />
          <p className="mg1 bold1">Pontos:</p>
          <p data-testid="header-score" className="bold1">{ score }</p>
        </div>
        <nav className="center header-nav-link">
          <button type="button" className="bg-none">
            <img src={ configIco } alt="configuração" />
          </button>
        </nav>
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
