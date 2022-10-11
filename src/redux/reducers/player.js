import { ADD_SCORE } from '../action/addScore';
import { ANSWER_CORRECT } from '../action/corrects';

const INITIAL_STATE = {
  score: 0,
  assertions: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + action.score,
    };
  case ANSWER_CORRECT:
    return {
      ...state,
      assertions: action.answerCorrect,
    };
  default:
    return state;
  }
};

export default player;
