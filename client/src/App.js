import React from 'react';
import logo from './logo.svg';
import './App.css';

import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';

import { gql } from "apollo-boost";

import { HttpLink } from "apollo-link-http";
import { ApolloLink, concat } from "apollo-link";
//import { onError } from "apollo-link-error";
import { InMemoryCache } from "apollo-cache-inmemory";


const csrftoken = () => {
    // Getting "csrftoken" key from the cookie's single key-value pair.
    let csrftoken;

    if (document.cookie !== "" && document.cookie) {
        try {
            csrftoken = document.cookie.split("=")[1];
        } catch(e) {
            console.log(e);
        }
    }

    return csrftoken;
}

const httpLink = new HttpLink({uri: "/graphql"});

const csrfMiddleware = new ApolloLink((operation, forward) => {
    console.log("TEST");
    operation.setContext((test_args) => {
        console.log(test_args);

        console.log('operation', operation);
        console.log('setContext', operation.setContext);

        return {
            headers: {
                "X-CSRFToken": csrftoken()
            }
        }
    });

    return forward(operation);
});


/*
const onerrorClientLink = ( props ) => {
    if (props && (props.graphQLErrors || props.graphQLErrors)) {
        if (props.graphQLErrors) {
            props.graphQLErrors.forEach(({ message, locations, path }) => {
                console.log(`[GraphQL error]: Custom Link error message: ${message}, Location: ${locations}, Path: ${path}`);
            });
        }

        if (props.networkError) {
            console.log(`[Network error]: ${props.networkError}`);
        }
    }
};

const client = new ApolloClient({
    link: ApolloLink.from([
        onError(onerrorClientLink()),
        csrfMiddleware,
        httpLink,
    ]),
    cache: new InMemoryCache(),
});
*/



// Need to create ApolloClient directly from 'apollo-client' not 'apollo-boost'
// to add custom links.
const client = new ApolloClient({
    link: concat(csrfMiddleware, httpLink),
    cache: new InMemoryCache(),
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
