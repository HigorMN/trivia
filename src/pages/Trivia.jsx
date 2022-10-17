import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import getQuestionsAPI from '../services/getQuestionsAPI';
import { addScore } from '../redux/action/addScore';
import { answerAction } from '../redux/action/corrects';
import timerImg from '../images/timer.png';
import logoTrivia from '../images/logoTrivia.png';
import iconeTrybe from '../images/iconeTrybe.png';
import certo from '../images/certo.png';
import errado from '../images/errado.png';
import Loading from '../components/loading';

const TIMER = 33000;
const SECONDS = 1000;
const FOUR = 4;
const FIVE = 5;
const defaultScore = 10;
const abcd = ['A', 'B', 'C', 'D'];

class Trivia extends Component {
  state = {
    category: '',
    question: '',
    index: 0,
    alternatives: [],
    buttonGreen: '',
    buttonRed: '',
    timer: 30,
    questionDisabled: false,
    difficulty: '',
    btnNextAppear: false,
    corrects: 0,
    randindex: 0,
    isloading: true,
  };

  componentDidMount() {
    this.creatingGamePage();
    this.countdownTimer();
  }

  componentDidUpdate() {
    const { timer, index } = this.state;
    if (timer === 0) {
      clearInterval(this.idTimer);
    }
    if (index === FOUR && timer === 0) {
      clearInterval(this.idGamer);
      clearInterval(this.idTimer);
    }
  }

  resetState = () => {
    this.setState({
      buttonGreen: '',
      buttonRed: '',
      timer: 30,
      questionDisabled: false,
      btnNextAppear: false,
    });
  };

  creatingGamePage = async () => {
    this.setState({ isloading: true });
    const responseTriviaAPI = await getQuestionsAPI();
    this.setState({ data: responseTriviaAPI, isloading: false }, () => {
      const { data } = this.state;
      if (data.length === 0) {
        const { history } = this.props;
        localStorage.removeItem('token');
        history.push('/');
      } else { this.startGame(); }
    });
  };

  startGame = () => {
    const { data } = this.state;
    this.questionAPI(data);

    this.idGamer = setInterval(() => {
      this.setState((state) => ({ index: state.index + 1 }), () => {
        this.resetState();
        this.questionAPI(data);
        this.countdownTimer();
      });
    }, TIMER);
  };

  questionAPI = (data) => {
    const { index, randindex } = this.state;
    const randomIndex = Math.floor(Math.random() * data.length);
    this.setState({ randindex: randomIndex });
    const indexValid = randomIndex !== randindex ? randomIndex : randomIndex - 1;
    this.setState({ difficulty: data[index].difficulty });

    const { category, question, correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = data[index];
    const alternatives = [...incorrectAnswers];

    alternatives.splice(indexValid, 0, correctAnswer);
    this.setState({ category, question, alternatives, correctAnswer });
  };

  handleClickAnswer = (event) => {
    this.setState({ buttonGreen: 'button-green', buttonRed: 'button-red' });
    this.checkAnswer(event);
    this.setState({
      buttonGreen: 'button-green',
      buttonRed: 'button-red',
      btnNextAppear: true,
      questionDisabled: true,
    });
    clearInterval(this.idGamer);
  };

  handleNext = () => {
    this.setState((state) => ({ index: state.index + 1 }), () => {
      const { index } = this.state;
      const { history } = this.props;
      if (index === FIVE) {
        history.push('/feedback');
      } else {
        clearInterval(this.idGamer);
        this.startGame();
      }
    });
    this.resetState();
  };

  countdownTimer = () => {
    this.idTimer = setInterval(() => {
      this.setState((state) => ({ timer: state.timer - 1 }), () => {
        const { timer } = this.state;
        this.setState((s) => ({
          questionDisabled: timer === 0 || s.questionDisabled }));
      });
    }, SECONDS);
  };

  getScore = () => {
    const { timer, difficulty } = this.state;
    const score = { easy: 1, medium: 2, hard: 3 };
    return defaultScore + (timer * score[difficulty]);
  };

  scoreUpdate = (name) => {
    if (name === 'correct') {
      const { dispatch } = this.props;
      dispatch(addScore(this.getScore()));
      this.setState((state) => ({ corrects: state.corrects + 1 }), () => {
        const { corrects } = this.state;
        dispatch(answerAction(corrects));
      });
    }
  };

  checkAnswer = (e) => {
    this.scoreUpdate(e.target.value);
  };

  c = (e, correctAnswer, cert, err) => (e === correctAnswer ? cert : err);

  render() {
    const { isloading, category, question, alternatives, correctAnswer } = this.state;
    const { buttonRed, buttonGreen, timer, questionDisabled, btnNextAppear } = this.state;
    return (
      <>
        <Header />
        {isloading ? (<Loading />) : (
          <main className="center trivia-main-container">
            <div className="triviar-left-container center">
              <img src={ logoTrivia } alt="Logo Trivia" className="trivia-logo" />
              <div className="trivia-question-category center">
                <h3 data-testid="question-category">{category}</h3>
              </div>
              <div className="trivia-question-container center">
                <p data-testid="question-text" className="trivia-question">{question}</p>
              </div>
              <div className="trivia-timer-container center">
                <img src={ timerImg } alt="timer" />
                <p className="mg1">Tempo:</p>
                <p>{timer}</p>
                <span>s</span>
              </div>
              <img src={ iconeTrybe } alt="Logo trybe" className="trivia-logo-trybe" />
            </div>
            <div className="trivia-rigth-container center">
              <div className="trivia-answer-container center">
                {alternatives.map((e, quest) => (
                  <div
                    key={ quest }
                    data-testid="answer-options"
                    className="trivia-container-button"
                  >
                    {btnNextAppear ? (
                      <div
                        className={ `${this.c(e, correctAnswer, 'cert', 'err')} center` }
                      >
                        <img
                          src={ this.c(e, correctAnswer, certo, errado) }
                          alt="Imagem"
                        />
                      </div>)
                      : (<div className="trivia-abc center"><p>{abcd[quest]}</p></div>)}
                    <button
                      type="button"
                      data-testid={
                        e === correctAnswer ? 'correct-answer' : `wrong-answer-${quest}`
                      }
                      value={ this.c(e, correctAnswer, 'correct', `wrong-${quest}`) }
                      className={ `${e === correctAnswer
                        ? buttonGreen : buttonRed} button-answer-options center` }
                      onClick={ this.handleClickAnswer }
                      disabled={ questionDisabled }
                    >
                      {e}
                    </button>
                  </div>
                ))}
              </div>
              <div className="trivia-button-next-container">
                { (btnNextAppear || timer === 0) && (
                  <button
                    type="button"
                    data-testid="btn-next"
                    onClick={ this.handleNext }
                    className="trivia-button-next"
                  >
                    PRÓXIMA
                  </button>)}
              </div>
            </div>
          </main>)}
      </>
    );
  }
}

Trivia.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default connect()(Trivia);
