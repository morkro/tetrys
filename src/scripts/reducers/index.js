import { combineReducers } from 'redux';
import game from './game';
import activeBlock from './activeBlock';
import score from './score';

export default combineReducers({ game, activeBlock, score });
