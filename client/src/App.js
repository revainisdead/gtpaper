import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { gql } from "apollo-boost";
import { BrowserRouter } from "react-router-dom";

import GlobalRoutes from "./global-routes";

import client from "./net/header";


const App = (props) => {
  return (
    <ApolloProvider client={client}>
        <BrowserRouter basename="/">
            <GlobalRoutes/>
        </BrowserRouter>
    </ApolloProvider>
  );
}

/*
*/
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
        .then(result => console.log("TEST", result));
}
test()


export default App;
