import { createStore, combineReducers } from "redux";

import reducers from './reducers.js';


const rootreducer = combineReducers({
    reducers,    
});

const store = createStore(rootreducer);

export default store;
