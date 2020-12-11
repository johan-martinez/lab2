import React, {Component} from 'react';
import Alert from './Alert';

class Server extends Component{

    constructor(props){
        super(props)
        this.handleInput=this.handleInput.bind(this)
    }

    handleInput(e){
        const {value, name}=e.target;
        this.setState({
            [name]:value
        });
    }

    render(){
        
        return(
            <div className='row justify-content-center h-100'>
                <div className="col-sm-8 align-self-center text-left">
                    <div className="card-header text-center">
                        <Alert ref={e=>{this.alertDiv=e}}/>
                        <h5 className="card-title">AGREGA UN SERVIDOR</h5>
                    </div>
                    <br/>
                    <div className='form-group'>
                        <label >Ip:</label>
                        <input onChange={this.handleInput} className='form-control pt-2' type="password"  placeholder='Ingresa una contraseña' name="password"/>
                    </div>
                    <br/>
                    <div className='card-footer text-center'>
                        <button onClick={this.onSubmit} className="btn btn-primary" >ENVIAR</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Server;