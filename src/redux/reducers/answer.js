import { ANSWER_CORRECT } from '../action/corrects';

const INITIAL_STATE = {
  answerCorrect: 0,
};

const answer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ANSWER_CORRECT:
    return {
      ...state,
      answerCorrect: action.answerCorrect,
    };
  default:
    return state;
  }
};

export default answer;
