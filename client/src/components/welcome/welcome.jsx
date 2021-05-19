import React from 'react';
import { connect } from "react-redux";

import { requestToken } from "../../store/actions.js";
import Login from "../auth/login.jsx";

import './welcome.css';


// button as link options:
let opt1 = (
    <form action="https://google.com/">
        <input type="submit" value="Go to Google" />
    </form>
);
let opt2 = (
    <a href="https://google.com" className="button">Go to Google</a>
);

// pattern 1: const Welcome = (props) => {...}
// pattern 1: const {prop1, prop2, prop3} = props;

// pattern 2: const Weclome = ({prop1, prop2, prop3}) => {...}


const Welcome = (props) => {
    return (
        <div className="App">
            <header className="App-header">
                <p className="app-label">
                    Greater Than Paper
                </p>

                <p className="login-label">
                    Login
                </p>

                {/*
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
                */}
            </header>
            <Login />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {};
};

// to dispatch call: props.getToken(token_value)
const mapDispatchToProps = (dispatch) => {
    return {
        requestToken: () => dispatch(requestToken()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
