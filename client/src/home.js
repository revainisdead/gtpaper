import React from 'react';

import logo from './logo.svg';
import './App.css';

import { connect } from "react-redux";

import { getToken } from "./store/actions.js";

import Login from "./components/auth/login.jsx";


const Home = (props) => {
    return (

        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        token: () => dispatch(getToken),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
