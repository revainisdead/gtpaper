import React from 'react';
import logo from './logo.svg';
import './App.css';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import { gql } from "apollo-boost";


// ---
import { HttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";


const csrftoken = () => {
    // Getting "csrftoken" key from the cookie's single key-value pair.
    let csrftoken;

    if (document.cookie !== "" && document.cookie) {
        //try {
        csrftoken = document.cookie.split("=")[1];
        //} catch(e) {
            //console.log(e);
        //}
    }

    console.log("Received csrf token of " + csrftoken + ".");
    return csrftoken;
}

const httpLink = new HttpLink({uri: "/graphql"});

const csrfMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers: {
            "X-CSRFToken": csrftoken()
        },
    });

    return forward(operation);
});


// ---

const client = new ApolloClient({
    uri: '/graphql',
    link: csrfMiddleware.concat(httpLink),
});

const App = (props) => {
  return (
    <ApolloProvider client={client}>

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

    </ApolloProvider>
  );
}


let options = {
    options: {
        context: {
            headers: {
                "X-CSRFToken": csrftoken(),
            }
        },
    }
}

const test = (props) => {
    client
        .query({
            query: gql`
                {
                    users {
                        username
                        firstName
                        lastName
                        email
                    }
                }
            `,
        })
        .then(result => console.log("TEST", result));
}

test()

export default App;
