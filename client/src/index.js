import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import axios from "axios";

import './index.css';
import App from './app.js';
import * as serviceWorker from './serviceWorker';

import store from "./store/just_store";


// Not currently adding the header to other urls (non graphql) as I would expect
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

// Log initial state
console.log(store.getState());

// Subscribe to log on every store change
const unsubscribe = store.subscribe(() => console.log(store.getState()));


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

unsubscribe();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
