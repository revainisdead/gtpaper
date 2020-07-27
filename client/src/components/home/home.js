import React from 'react';
import { connect } from "react-redux";

import { requestToken } from "../../store/actions.js";
import Login from "../auth/login.jsx";

import './home.css';


const Home = (props) => {

    return (
        <div className="App">
            <header className="App-header">
                <p class="app-label">
                    Greater Than Paper
                </p>

                <p class="login-label">
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
