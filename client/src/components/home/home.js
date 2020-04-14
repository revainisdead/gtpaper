import React from 'react';
import { connect } from "react-redux";

import { getToken } from "../../store/actions.js";
import Login from "../auth/login.jsx";

import './home.css';


const Home = (props) => {

    return (
        <div className="App">
          <header className="App-header">
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
            <Login />
          </header>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {};
};

// to dispatch call: props.getToken(token_value)
const mapDispatchToProps = (dispatch) => {
    return {
        getToken: () => dispatch(getToken()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
