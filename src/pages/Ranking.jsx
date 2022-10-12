import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import restScore from '../redux/action';

class Ranking extends Component {
  goHome = () => {
    const { history, dispatch } = this.props;
    history.push('/');
    dispatch(restScore());
  };

  render() {
    const { playrs } = this.props;
    playrs.sort((a, b) => b.score - a.score);
    return (
      <main>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.goHome }
        >
          Ir para Home
        </button>
        <div>
          {playrs.map((e, index) => (
            <div key={ index }>
              <img
                src={ `https://www.gravatar.com/avatar/${md5(e.email).toString()}` }
                alt="Imgaem Gravatar"
              />
              <p data-testid={ `player-name-${index}` }>{e.playerName}</p>
              <p data-testid={ `player-score-${index}` }>{e.score}</p>
            </div>
          ))}
        </div>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  playrs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  playrs: state.player.playrs,
});

export default connect(mapStateToProps)(Ranking);
