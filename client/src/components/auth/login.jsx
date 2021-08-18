import React, { useState } from "react";
import { connect } from "react-redux";
//import { gql } from "apollo-boost";

import "./login.css";

import { receiveToken, fetchToken } from "../../store/actions.js";

import Token from "../../net/token.js";

import inMemoryCache from "../../cache_map.js";


// UI
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";


const handleJson = (response) => response.json();

// Part 1: /graphql/
// Part2: /api - The RESTful API is used for token generation ONLY.
//
// HOWEVER: proxy in package.json is set up for all backend urls (localhost:5000)
// So: using the url without the host should work fine:
//   This:      "/api/token-auth/"
//   Over this: "http://192.168.10.129:3000/
//
// Note: Proxy must be working correctly for the full url with host to work
// (because it's using port 3000, the proxied port, and not port 5000, the api's original port)

export function fakeAsyncLogin(dispatch, ) {
    //const url = "http://192.168.10.129:3000/api/token-auth/";
    const url = "/api/token-auth/";
    const payload = {
        "username": "admin",
        "password": "life6565",
    };

    return fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        credentials: "include",
    })
    .then(handleJson)
    .then((data) => {
        let token = data["token"];

        return dispatch(receiveToken(token));
    })
    .catch(error => {
        console.error("Error retrieving auth token from restful api", error);
    });
}

const handleSubmit = (e) => {
    //e.preventDefault();
}

function Login(props) {
    //{ token } = props;

    /*
    const test = (props) => {
        client
            .query({
                query: gql`
                    query {
                        users {
                            id
                            username
                            firstName
                            lastName
                            email
                        }
                    }
                `,
            })
            .then(result => console.log("graphql test", result));
    }
    test()
    */

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Must wait for fakeLogin to finish, use redux-thunk
    props.fetchToken();

    return (
        <div className="login-flexbox">
            <Form>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
            </Form>

            <p>
                <Button>
                    Login
                </Button>
            </p>
            <Token />
        </div>
        /*
        <form action="/api/token-auth/" method="POST" onSubmit={handleSubmit}>
            <ul>
                <li>
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username"></input>
                </li>
                <li>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password"></input>
                </li>
                <li className="button">
                    <button type="submit">Login</button>
                </li>
            </ul>
        </form>
        */
    );
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchToken: () => dispatch(fetchToken()),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
