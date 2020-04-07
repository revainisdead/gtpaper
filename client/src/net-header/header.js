import ApolloClient from 'apollo-client';
import { HttpLink } from "apollo-link-http";
import { ApolloLink, concat } from "apollo-link";
//import { onError } from "apollo-link-error";
import { InMemoryCache } from "apollo-cache-inmemory";


const __csrftoken = () => {
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
                "X-CSRFToken": __csrftoken()
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
// - https://www.apollographql.com/docs/react/migrating/boost-migration/
const client = new ApolloClient({
    link: concat(csrfMiddleware, httpLink),
    cache: new InMemoryCache(),
});


export default client;
