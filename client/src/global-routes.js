import React from 'react';

import {
    Switch,
    Route,
    Link,
} from 'react-router-dom';

import Welcome from "./components/welcome/welcome.jsx";


const NotFound = () => <h3>Error 404: Page not found.</h3>
const About = () => <h3>Sample about page.</h3>;


// Second path with root so it matches all other urls: just a test.
//<Route path="/" component={Home} />


const GlobalRoutes = (props) => {
    let ROOT = "/"
    let LOGIN = "/login"
    let ABOUT = "/about"

    return (
        <div>
            <ul>
                <li><Link to={ROOT}>Root</Link></li>
                <li><Link to={LOGIN}>Login</Link></li>
                <li><Link to={ABOUT}>About</Link></li>
            </ul>
            <Switch>
                <Route exact path="/" component={Welcome} />
                <Route path="/login" component={Welcome} />
                <Route path="/about" component={About} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

export default GlobalRoutes;
