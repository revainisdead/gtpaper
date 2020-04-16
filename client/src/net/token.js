import React from "react";
import { connect } from "react-redux";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

//import { getAuthToken } from "../net/header";


// Actions are to MODIFY the store, add, change, delete data in the store.

const Token = (props) => {
    // All data that comes from the backend comes over graphql using Apollo Client.
    // So, to ensure the front end complies to authentication and only allows access to
    // the backend for authenticated users, make sure token exists. The backend will
    // be in charge of making sure it is valid by taking the token from the header.
    //
    // The tricky part: waiting to access the token until it is set (it's async)
    // Using react-redux's connect to solve this.
    //
    // We need this component so connect can be used on it
    // to allow access to the store's token in props
    console.log("test props", props);


    if (props.token) {
        console.log("Async token filled:", props.token);
    }

    const qry = gql`
        query {
            users {
                id
                username
                firstName
                lastName
                email
            }
        }
    `;
    const { loading, error, data } = useQuery(qry);
    console.log("DATA", data);


    // A singular time the client must wait for this props.token to be filled
    // before they can make a request to graphql for data.
    if (loading) {
        // render loading
    } else {
        // render component
    }

    return (
        <></>
    );
};

// To access the store, access it directly or use mapStoreToProps
const mapStateToProps = (state, ownProps) => {
    return {
        token: state.tokenReducer.token,
        isFetching: state.tokenReducer.isFetching,
    };
};

// Adding dispatch as a convention just in case the component needs it.
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
    }
};

const tokenApp = connect(mapStateToProps, mapDispatchToProps)(Token);

export default tokenApp;
