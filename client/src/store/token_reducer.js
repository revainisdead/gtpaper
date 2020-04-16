import { REQUEST_TOKEN, RECEIVE_TOKEN, DELETE_TOKEN } from './actions.js';


const initialState = {
    token: null,
    isFetching: false,
};


function tokenReducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_TOKEN:
            return Object.assign({}, state, {
                isFetching: true,
            });

        case RECEIVE_TOKEN:
            return Object.assign({}, state, {
                token: action.token,
                isFetching: false,
                lastUpdated: action.receivedAt,
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

export default tokenReducer;
