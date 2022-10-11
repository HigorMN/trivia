import { combineReducers } from 'redux';
import gravatar from './gravatar';
import player from './player';
import answer from './answer';

const rootReducer = combineReducers({ gravatar, player, answer });

export default rootReducer;
