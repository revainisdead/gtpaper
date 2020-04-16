import React from "react";
import { connect } from "react-redux";

import { receiveToken, fetchToken } from "../../store/actions.js";




export function fakeAsyncLogin(dispatch) {
    const url = "http://192.168.10.129:3000/api/token-auth/";
    const payload = {
        "username": "admin",
        "password": "life6565",
    };

    return fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: new Headers({
            "Content-Type": "application/json",
            "credentials": "include",
        }),
        credentials: "include",
    })
    .then((response) => {
        let data = response.json();

        console.log("TESTING", data);
        return data;
    })
    .then((data) => {
        let token = data["token"];
        console.log("TOKEN IN FETCH", token);

        return dispatch(receiveToken(token));
    })
    .catch(error => {
        console.error("Error retrieving auth token from restful api", error);
    });


    //let data = requestPost(url, tempdata);
    //let token = data["token"];
    //return token;

    //let token = data["token"];
    //console.log("TESTING2", token);
}


function Login(props) {
    //{ token } = props;

    //let token = fakeAsyncLogin();

    // Must wait for fakeLogin to finish, use redux-thunk
    //let tokenPromise = props.receiveToken(token);
    //props.receiveToken();

    let token = props.fetchToken();
    console.log("FINAL TOKEN", token);

    return (
        <div>
            "Test login"
        </div>
    );
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        //receiveToken: (token) => dispatch(receiveToken(token)),
        fetchToken: () => dispatch(fetchToken()),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
