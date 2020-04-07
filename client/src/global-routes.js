import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Home from "./home";


// Second path with root so it matches all other urls: just a test.
//<Route path="/" component={Home} />
const GlobalRoutes = (props) => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
        </Switch>
    );
}

export default GlobalRoutes;
