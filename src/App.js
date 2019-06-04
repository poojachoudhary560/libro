import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Navbar from './Components/Layout/Navbar';
import Index from './Components/Layout/Index';
import { Provider } from './context';
class App extends Component{
  render(){
    return(
      <Provider>
        <Router>
          <Fragment>
            <Navbar />
            <div>
              <Switch>
                <Route exact path="/" component={Index} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
