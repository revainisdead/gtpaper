import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';

import reducers from './reducers.js';


const rootreducer = combineReducers({
    reducers,
});

const store = createStore(
    rootreducer,
    applyMiddleware(
        thunkMiddleware,
    ),
);

export default store;
