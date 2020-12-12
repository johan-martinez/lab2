import React, {Component} from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
  } from "react-router-dom";


import Image from './components/Image';
import Navbar from './components/Navbar';
import Email from './components/Email';
import Server from './components/Server';

class App extends Component{
  constructor(){
    super();
    this.state={
      server:'http://localhost:8000/'
    }
  }
  
  render(){
    return (
      <div className="App">
        <Router>
          <Navbar></Navbar>
          <br></br>
          <Switch>
            <Route path="/server">
              <Server server={this.state.server}></Server>
            </Route>
            <Route path="/email">
              <Email server={this.state.server}></Email>
            </Route>
            <Route path="/image">
              <Image server={this.state.server}/>
            </Route>
            <Route  path="/">
              <Image server={this.state.server}/>
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

render(<App/>,document.getElementById('root'));