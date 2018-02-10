import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import Home from './components/home';
import About from './components/about';
import Signup from './components/signup';
import Signin from './components/signin';
import Navbar from './components/Navbar';
import history from './History';

// export const history = createBrowserHistory()

class Routers extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={Signin} />
                     <Route exact path="/about" component={About} />
                    <Route exact path="/signup" component={Signup} />
                    
                </div>
            </Router>
        )
    }
}

export default Routers;