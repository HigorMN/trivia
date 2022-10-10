import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import getQuestionsAPI from '../services/getQuestionsAPI';
import { addScore } from '../redux/action/addScore';

const TIMER = 33000;
const SECONDS = 1000;
const FOUR = 4;
const defaultScore = 10;

class Trivia extends Component {
  state = {
    invalidToken: false,
    category: '',
    question: '',
    index: 0,
    alternatives: [],
    buttonGreen: '',
    buttonRed: '',
    timer: 30,
    questionDisabled: false,
    difficulty: '',
  };

  componentDidMount() {
    this.countdownTimer();
    this.creatingGamePage();
  }

  creatingGamePage = async () => {
    const reponseTriviaAPI = await getQuestionsAPI();
    console.log(reponseTriviaAPI);
    if (reponseTriviaAPI.length === 0) {
      this.setState({ invalidToken: true });
      localStorage.removeItem('token');
    } else {
      this.questionAPI(reponseTriviaAPI);
      setInterval(() => {
        this.setState((state) => ({
          index: state.index === FOUR ? FOUR : state.index + 1,
          buttonGreen: '',
          buttonRed: '',
          timer: 30,
          questionDisabled: false,
        }), () => {
          this.questionAPI(reponseTriviaAPI);
        });
      }, TIMER);
    }
  };

  questionAPI = (reponseTriviaAPI) => {
    const { index } = this.state;
    const randomIndex = Math.floor(Math.random() * reponseTriviaAPI.length);
    this.setState({
      difficulty: reponseTriviaAPI[index].difficulty,
    });

    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = reponseTriviaAPI[index];

    const alternatives = [...incorrectAnswers];
    alternatives.splice(randomIndex, 0, correctAnswer);
    this.setState({
      category, question, alternatives, correctAnswer });
  };

  handleClick = (e) => {
    this.setState({ buttonGreen: 'button-green', buttonRed: 'button-red' });
    this.checkAnswer(e);
  };

  countdownTimer = () => {
    setInterval(() => {
      this.setState((state) => ({
        timer: state.timer === 0 ? 0 : state.timer - 1,
        questionDisabled: state.timer < 2,
      }));
    }, SECONDS);
  };

  getScore = () => {
    const { timer, difficulty } = this.state;
    const score = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    return defaultScore + (timer * score[difficulty]);
  };

  scoreUpdate = (name) => {
    if (name === 'correct') {
      const { dispatch } = this.props;
      dispatch(addScore(this.getScore()));
    }
  };

  checkAnswer = (e) => {
    this.scoreUpdate(e.target.value);
  };

  render() {
    const { invalidToken, category, question, alternatives, correctAnswer } = this.state;
    const { buttonRed, buttonGreen, timer, questionDisabled } = this.state;
    return (
      <>
        {invalidToken && <Redirect to="/" />}
        <Header />
        <main>
          <div>
            <h3 data-testid="question-category">{category}</h3>
            <p data-testid="question-text">{question}</p>
          </div>
          <div>
            <p>{timer}</p>
            {alternatives.map((e, index) => (
              <div key={ index } data-testid="answer-options">
                <button
                  type="button"
                  data-testid={
                    e === correctAnswer ? 'correct-answer' : `wrong-answer-${index}`
                  }
                  value={ e === correctAnswer ? 'correct' : `wrong-${index}` }
                  className={ e === correctAnswer ? buttonGreen : buttonRed }
                  onClick={ this.handleClick }
                  disabled={ questionDisabled }
                >
                  {e}
                </button>
              </div>
            ))}
          </div>
        </main>
      </>
    );
  }
}

Trivia.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Trivia);
