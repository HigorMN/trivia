import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import { createLocal, saveLocal } from '../services/saveLocal';

import logoTrivia from '../images/logoTrivia.png';

const minAnswer = 3;

class Feedback extends Component {
  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  ranking = () => {
    const { history, score, email, playerName } = this.props;
    createLocal();
    saveLocal({ score, email, playerName });
    history.push('/ranking');
  };

  render() {
    const { assertions, score, email } = this.props;
    return (
      <>
        <header className="dp-none">
          <Header />
        </header>
        <main className="feedback-container center">
          <img src={ logoTrivia } alt="Logo trivia" className="feedback-logo-trivia" />
          <img
            src={ `https://www.gravatar.com/avatar/${md5(email).toString()}?s=200` }
            alt="gravatar img"
            className={ assertions < minAnswer ? 'could-be-better-img' : 'well-done-img' }
          />
          <div className="feedback-resumo-container center">
            <div className="feedback-assertion-c-w center">
              <h1
                data-testid="feedback-text"
                className={ assertions < minAnswer ? 'could-be-better' : 'well-done' }
              >
                {assertions < minAnswer ? 'Could be better...' : 'Well Done!' }
              </h1>
            </div>
            <div className="center">
              <h4>Você acertou</h4>
              <h4
                data-testid="feedback-total-question"
                className="mg1"
              >
                { assertions }
              </h4>
              <h4>questões!</h4>
            </div>
            <div className="center">
              <h4>Um Total de</h4>
              <h4
                data-testid="feedback-total-score"
                className="mg1"
              >
                { score }
              </h4>
              <h4>pontos</h4>
            </div>
          </div>
          <div>
            <button
              type="button"
              data-testid="btn-ranking"
              onClick={ this.ranking }
              className="btn-ranking"
            >
              VER RANKING
            </button>
            <button
              type="button"
              data-testid="btn-play-again"
              onClick={ this.playAgain }
              className="btn-play-again"
            >
              JOGAR NOVAMENTE
            </button>
          </div>
        </main>
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
  email: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
