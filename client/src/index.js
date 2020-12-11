import React, {Component} from 'react';
import { render } from 'react-dom';
import Image from './components/Image';

class App extends Component{
  constructor(){
    super();
    this.state={
      server:'http://localhost:5000/'
    }
  }
  
  render(){
    return (
      <div className="App">
        <br/>
        <Image server={this.state.server}/>
      </div>
    )
  }
}

render(<App/>,document.getElementById('root'));