import React, {Component} from 'react';
import Alert from './Alert';

class Server extends Component{

    constructor(props){
        super(props)
        this.handleInput=this.handleInput.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
    }

    handleInput(e){
        const {value, name}=e.target;
        this.setState({
            [name]:value
        });
    }
    onSubmit(e){
        if (e) {
            e.preventDefault()
        }
        fetch(`${this.props.server}server`, {
            method: 'post',
            body: JSON.stringify({}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json()
        }).then((data) => {
            this.successDiv.setAlert('El servidor se ha creado')
        }).catch((e) => this.alertDiv.setAlert('Ha ocurrido un problema con el servidor'));
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