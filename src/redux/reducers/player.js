import { ADD_SCORE } from '../action/addScore';

const INITIAL_STATE = {
  score: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + action.score,
    };
  default:
    return state;
  }
};

export default player;
