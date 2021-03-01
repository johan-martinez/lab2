import React, {Component} from 'react';
import Alert from './Alert';
import Success from './Success';

class Email extends Component{

    constructor(props){
        super(props)
        this.state={
            email:""
        }
        this.onSubmit=this.onSubmit.bind(this)
        this.handleInput=this.handleInput.bind(this)
        this.validateData=this.validateData.bind(this)
    }

    validateData(){
        var validator=true
        var msg="";
        var mail=/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
        if (this.state.email===""||!(mail.test(this.state.email))) {
            validator=false
            msg="POR FAVOR INGRESE UN CORREO ELECTRÓNICO VÁLIDO "
        }
        if (msg==="") 
            msg=null
        this.alertDiv.setAlert(msg)
        return validator
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
        if (this.validateData()) {
            let {email} =this.state
            fetch(`${this.props.server}email`, {
                method: 'post',
                body: JSON.stringify({email: email}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                return response.json()
            }).then((data) => {
                this.successDiv.setAlert('Su correo se ha almacenado')
            }).catch((e) => this.alertDiv.setAlert('El correo ya existe.'));
        }
        
    }

    render(){
        return(
            <div className='row justify-content-center h-100'>
                <div className="col-sm-8 align-self-center text-left">
                    <Alert ref={e=>{this.alertDiv=e}}/>
                    <Success ref={e=>{this.successDiv=e}}/>
                    <div className="card-header text-center">
                        <h5 className="card-title">AGREGA UN CORREO ELECTRÓNICO PARA RECIBIR NOTIFICACIONES DE FALLOS</h5>
                    </div>
                    <div className='form-group'>
                        <br/>
                        <label >Email:</label>
                        <input onChange={this.handleInput} className='form-control pt-2' type="email"  placeholder='Ingresa un correo electrónico' name="email"/>
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

export default Email;