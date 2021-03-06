import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Navbar from './Components/Layout/Navbar';
import Index from './Components/Layout/Index';
import Lyrics from './Components/Tracks/Lyrics';
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
                <Route exact path="/lyrics/track/:id" component={Lyrics} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
