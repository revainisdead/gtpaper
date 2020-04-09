

// There can only be one user logged in per client at a time.
// Format username: token

export const ADD_TOKEN="ADD_TOKEN";
export const DELETE_TOKEN="DELETE_TOKEN";

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

//const boundAddToken = (token) => dispatch(addToken(token));
//const boundDeleteToken = (token) => dispatch(deleteToken(token));
