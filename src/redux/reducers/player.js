import { ADD_SCORE } from '../action/addScore';
import { ANSWER_CORRECT } from '../action/corrects';

const INITIAL_STATE = {
  score: 0,
  assertions: 0,
  playrs: [],
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
  case 'RANKING_ACTION':
    return {
      ...state,
      playrs: [...state.playrs, action.playrs],
    };
  case 'RESET_SCORE':
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  default:
    return state;
  }
};

export default player;
