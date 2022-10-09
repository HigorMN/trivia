import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import getQuestionsAPI from '../services/getQuestionsAPI';

const TIMER = 30000;
const FOUR = 4;

export default class Trivia extends Component {
  state = {
    invalidToken: false,
    category: '',
    question: '',
    index: 0,
    alternatives: [],
    buttonGreen: '',
    buttonRed: '',
  };

  componentDidMount() {
    this.creatingGamePage();
  }

  creatingGamePage = async () => {
    const reponseTriviaAPI = await getQuestionsAPI();

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
        }), () => {
          this.questionAPI(reponseTriviaAPI);
        });
      }, TIMER);
    }
  };

  questionAPI = (reponseTriviaAPI) => {
    const { index } = this.state;
    const randomIndex = Math.floor(Math.random() * reponseTriviaAPI.length);

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

  handleClick = () => {
    this.setState({ buttonGreen: 'button-green', buttonRed: 'button-red' });
  };

  render() {
    const { invalidToken, category, question, alternatives, correctAnswer } = this.state;
    const { buttonRed, buttonGreen } = this.state;
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
            {alternatives.map((e, index) => (
              <div key={ index } data-testid="answer-options">
                <button
                  type="button"
                  data-testid={
                    e === correctAnswer ? 'correct-answer' : `wrong-answer-${index}`
                  }
                  className={ e === correctAnswer ? buttonGreen : buttonRed }
                  onClick={ this.handleClick }
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
