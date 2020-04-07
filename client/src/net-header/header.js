import ApolloClient from 'apollo-client';
import { HttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import { InMemoryCache } from "apollo-cache-inmemory";


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


// XXX
// 
// Need trailing slash, without which, will cause hidden
// bugs for a long time and will never load json.
// The response will always be html.
//
// Research this and add some urls here.
//
// Note that using ApolloBoost, it works without the trailing slash.
const httpLink = new HttpLink({
    uri: "/graphql/",
});

const csrfMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(() => {
        return {
            headers: {
                "X-CSRFToken": __getCookie("csrftoken"),
            },
            fetchOptions: {
                mode: "cors",
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
const client = new ApolloClient({
    link: ApolloLink.from([
        errorLink,
        csrfMiddleware,
        httpLink,
    ]),
    cache: new InMemoryCache(),
});


export default client;
