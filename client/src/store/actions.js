

// There can only be one user logged in per client at a time.

// XXX Add Username to redux too after on successful login


export const REQUEST_TOKEN="REQUEST_TOKEN";
export const ADD_TOKEN="ADD_TOKEN";
export const DELETE_TOKEN="DELETE_TOKEN";

export function getToken() {
    return {
        type: REQUEST_TOKEN,
    }
}

export function addToken(token) {
    return {
        type: ADD_TOKEN,
        token,
    }
}

export function deleteToken(token) {
    return {
        type: DELETE_TOKEN,
        token,
    }
}
