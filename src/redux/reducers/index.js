import { combineReducers } from 'redux';
import gravatar from './gravatar';
import player from './player';

const rootReducer = combineReducers({ gravatar, player });

export default rootReducer;
