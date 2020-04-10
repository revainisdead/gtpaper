import React from "react";
import { connect } from "react-redux";

import { addToken, getToken } from "../../store/actions.js";


function requestPost(url, payload) {
    let data = fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: new Headers({
            "Content-Type": "application/json",
        }),
    })
    .then(response => {
        let data = response.json();

        return data["token"];
    })
    .catch(error => {
        console.error("Error retrieving auth token from restful api", error);
    });

    return data;
}


function fakeLogin() {
    //const url = "http://127.0.0.1:3000/restful_api/token-auth/";
    const url = "/restful_api/token-auth/";
    const tempdata = {
        "username": "admin",
        "password": "life6565",
    };

    let data = requestPost(url, tempdata);
    let token = data["token"];

    console.log("TOKEN", token);

    return token;
}


fakeLogin()



function Login({ props }) {
    //{ token } = props;

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
    return {};
};

// Okay but how to map props to dispatch? (addToken(token)?)

export default connect(mapStateToProps, mapDispatchToProps)(Login);
