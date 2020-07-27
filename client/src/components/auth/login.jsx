import React from "react";
import { connect } from "react-redux";
//import { gql } from "apollo-boost";

import "./login.css";

import { receiveToken, fetchToken } from "../../store/actions.js";

import Token from "../../net/token.js";


// UI
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";


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
        }),
        credentials: "include",
    })
    .then((response) => {
        let data = response.json();

        return data;
    })
    .then((data) => {
        let token = data["token"];

        return dispatch(receiveToken(token));
    })
    .catch(error => {
        console.error("Error retrieving auth token from restful api", error);
    });
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

    // Must wait for fakeLogin to finish, use redux-thunk
    props.fetchToken();

    return (
        <Card>
            <Card.Body>
                <Form>
                    <Form.Group controlId="formUsername">
                        <Form.Control placeholder="Username"></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Control type="password" placeholder="Password"></Form.Control>
                    </Form.Group>
                </Form>

                <Button>
                    Login
                </Button>
                <Token />
            </Card.Body>
        </Card>
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
