import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import rankingAction from '../redux/action/rankingAction';

const minAnswer = 3;

class Feedback extends Component {
  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  ranking = () => {
    const { history, dispatch, score, email, playerName } = this.props;
    history.push('/ranking');
    dispatch(rankingAction({ score, email, playerName }));
  };

  render() {
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        <div>
          <p data-testid="feedback-text">
            {assertions < minAnswer ? 'Could be better...' : 'Well Done!' }
          </p>
        </div>
        <h2 data-testid="feedback-total-score">{ score }</h2>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.playAgain }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.ranking }
        >
          Ranking
        </button>
      </>

    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
  email: state.gravatar.email,
  playerName: state.gravatar.name,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
