import { combineReducers } from 'redux';

import tokenReducer from './token_reducer.js';


const reducers = combineReducers({
    tokenReducer,
});

export default reducers;
