import React from 'react';
import ReactDOM from 'react-dom';
//import axios from "axios";

import './index.css';
import App from './app.js';
import * as serviceWorker from './serviceWorker';


// Not currently adding the header to other urls (non graphql) as I would expect
//axios.defaults.xsrfCookieName = "csrftoken";
//axios.defaults.xsrfHeaderName = "X-CSRFToken";


ReactDOM.render(
  <React.StrictMode>
        <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
