import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import restScore from '../redux/action';
import { getPlayrsLocal } from '../services/saveLocal';

import logoTrivia from '../images/logoTrivia.png';
import StarImage from '../components/StarImage';

class Ranking extends Component {
  goHome = () => {
    const { history, dispatch } = this.props;
    history.push('/trivia/');
    dispatch(restScore());
  };

  render() {
    const playrs = getPlayrsLocal() || [];
    playrs.sort((a, b) => b.score - a.score);
    return (
      <main className="ranking-main-container center">
        <img src={ logoTrivia } alt="Logo trivia" className="ranking-logo-trivia" />
        <div className="ranking-container center">
          <h1 data-testid="ranking-title" className="ranking-title">Ranking</h1>
          {playrs.map((e, index) => (
            <div key={ index } className="ranking-container-r center">
              <div className="center">
                <img
                  src={ `https://www.gravatar.com/avatar/${md5(e.email).toString()}` }
                  alt="Imgaem Gravatar"
                  className="ranking-gravatar"
                />
                <p data-testid={ `player-name-${index}` }>{e.playerName}</p>
              </div>
              <div className="ranking-star center">
                <StarImage />
                <p
                  data-testid={ `player-score-${index}` }
                  className="mg1"
                >
                  {e.score}
                </p>
                <p>pontos</p>
              </div>
            </div>
          ))}
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.goHome }
            className="btn-play-again bn"
          >
            JOGAR NOVAMENTE
          </button>
        </div>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  playrs: state.player.playrs,
});

export default connect(mapStateToProps)(Ranking);
