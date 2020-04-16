// XXX Add Username to redux too after on successful login
import { fakeAsyncLogin } from '../components/auth/login';


// Stating that an async call is about to fetch the token
export const REQUEST_TOKEN="REQUEST_TOKEN";
export function requestToken() {
    return {
        type: REQUEST_TOKEN,
    }
}

export const RECEIVE_TOKEN="RECEIVE_TOKEN";
export function receiveToken(token) {
    return {
        type: RECEIVE_TOKEN,
        token: token,
        receivedAt: Date.now(),
    }
}

export const DELETE_TOKEN="DELETE_TOKEN";
export function deleteToken(token) {
    return {
        type: DELETE_TOKEN,
        token,
    }
}

export function fetchToken() {

    function thunk(dispatch) {
        dispatch(requestToken())
        return fakeAsyncLogin(dispatch);
    }

    return thunk;
}
