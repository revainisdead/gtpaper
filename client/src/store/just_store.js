import { createStore, compose, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';

import reducers from './reducers.js';


// createStore takes only 2 arguments, use compose to pass redux devtools extension
const store = createStore(
    reducers,
    compose(
        applyMiddleware(
            thunkMiddleware,
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ),
);

export default store;
