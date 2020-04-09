import { combineReducers } from 'redux';

import { ADD_TOKEN, DELETE_TOKEN } from './actions.js';

const initialState = {
    token: null,
};

function getToken(state = initialState, action) {
    switch (action.type) {
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


const tokenApp = combineReducers({ getToken });

export default tokenApp;
