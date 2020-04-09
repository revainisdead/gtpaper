import { combineReducers } from 'redux';

import { REQUEST_TOKEN, ADD_TOKEN, DELETE_TOKEN } from './actions.js';

const initialState = {
    token: null,
};

function tokenReducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_TOKEN:
            return state;

        case ADD_TOKEN:
            return Object.assign({}, state, {
                token: state.token,
            });

        case DELETE_TOKEN:
            const { token, ...reststate } = state;
            return {
                ...reststate,
            };

        default:
            return state;
    }
}


const tokenApp = combineReducers({ tokenReducer });

export default tokenApp;
