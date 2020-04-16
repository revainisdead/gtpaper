import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import GlobalRoutes from "./global-routes";
import store from "./store/just_store";
import client from "./net/header";


/* eslint ignore no-unused-vars */
const unsubscribe = store.subscribe(() => {
    // Subscribe to log on every store change

    console.log("Subscription:", store.getState())
});

const App = (props) => {
  return (
    <ReduxProvider store={store}>
        <ApolloProvider client={client}>
            <BrowserRouter basename="/">
                <GlobalRoutes/>
            </BrowserRouter>
        </ApolloProvider>
    </ReduxProvider>
  );
}


//unsubscribe();

export default App;
