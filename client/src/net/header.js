import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import { InMemoryCache } from "apollo-cache-inmemory";

import { fetchToken, getToken } from '../store/actions';

import store from "../store/just_store.js";

/*
// For convenience, we returned a promise from the dispatch function
// so we can resolve it here separately and get the value.
const token = store.dispatch(fetchToken()).then((tokenAction) => {

    // This returns the tokenAction
    console.log(tokenAction);
    console.log("token action token", tokenAction.token);
});
*/


const getAuthToken = () => {
    // Doesn't work because token is added asynchronously and this gets called before its set.
    //
    // get token from tokenApp somehow
    //const state = store.getState();
    //const token = state.tokenReducer.token;

    const token = "TEMP";
    return "Token: " + token;
}


// Source: https://docs.djangoproject.com/en/3.0/ref/csrf/
function __getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}



// Need trailing slash, without which, will never load json.
// The response will always be html.
//
// The problem is that I am spoiled from using django, it has a setting
// APPEND_SLASH set to True by default, that redirects urls to the version
// with the trailing slash when http://example.com/api is used, for example.
// Since redirects don't carry the state of the request with them, the
// original POST data is dropped.
//
// I learned to always add the slash at the end today.
//
// See: https://stackoverflow.com/questions/9738824/django-post-url-error
//
// (Note that using ApolloBoost, it works without the trailing slash)

const httpLink = new HttpLink({
    uri: "/graphql/",
});





const csrfAndAuthMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(() => {
        return {
            headers: {
                "X-CSRFToken": __getCookie("csrftoken"),
                "Authorization": getAuthToken(),
            },
            fetchOptions: {
                mode: "cors",
                credentials: "include",
            }
        }
    });

    return forward(operation);
});


const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            console.log(`[GraphQL error]: Custom Link error message: ${message}, Location: ${locations}, Path: ${path}`);
        });
    }

    if (networkError) {
        console.log(`[Network error]: ${networkError}`);
    }
});


// Need to create ApolloClient directly from 'apollo-client' not 'apollo-boost'
// to add custom links.
// - https://www.apollographql.com/docs/react/migrating/boost-migration/
//
// Think of it this way: httpLink has the final graphql endpoint, so the network chain
// does down the list, so each item that occurs in the list does its work, and the
// next chain the list has access to do that work done.
const client = new ApolloClient({
    link: ApolloLink.from([
        errorLink,
        csrfAndAuthMiddleware,
        httpLink,
    ]),
    cache: new InMemoryCache(),
});


//exports.getAuthToken = getAuthToken;
//exports.client = client;
//export default { getAuthToken, client };

export default client;
