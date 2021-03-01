import React, {Component} from 'react';
import * as FormData from "form-data";
import Alert from './Alert';
import Success from './Success';

class Image extends Component{

    constructor(props){
        super(props)
        this.state={
            phase:true,
            phrase:"",
            image:"",
            err:""
        }
        this.onSubmit=this.onSubmit.bind(this)
        this.handleInput=this.handleInput.bind(this)
        this.changePhase=this.changePhase.bind(this)
        
    }

    changePhase(){
        this.setState({phase:true})
        this.alertDiv.setAlert(null)
        this.successDiv.setAlert(null)
        document.getElementById('img-test').src=""
        document.getElementById('img-test').style.width="0%"
        document.getElementById('img-test').style.height="0%"
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
        if (this.state.phrase===""||this.state.image==="") {
            this.alertDiv.setAlert("Debe rellenar todos los campos para poder enviar")
        }else {
            var form=new FormData(document.getElementById('form-image'))
            fetch(`${this.props.server}image`, {
                method: 'post',
                body: form,
            })
            .then((response) => {
                this.setState({phase:false})
                this.render()
                if(response.status == 400){
                    throw new Error('¡Ups!');
                } else if(response.status == 400){
                    
                }
                return response.blob()
            }).then((image) => {
                this.successDiv.setAlert('La imagen se ha cargado perfectamente')
                let url=URL.createObjectURL(image)
                document.getElementById('img-test').src=url
                document.getElementById('img-test').style.width="50%"
                document.getElementById('img-test').style.height="50%"
            }).catch((e) => this.alertDiv.setAlert('Ha ocurrido un problema con el servidor'));
        }
        
    }
    

    render(){
        var form,back;
        if (this.state.phase) {
            form=(
                <div className='row justify-content-center h-100'>
                <div className="col-sm-8 align-self-center text-left">
                    <div>
                        <div className="card-header text-center">
                            <h5 className="card-title">COLOCA UN TEXTO A UNA IMAGEN</h5>
                        </div>
                        <form id="form-image">

                            <div className='form-group'>
                                <label >Frase:</label>
                                <input onChange={this.handleInput} className='form-control' type="text" id="phrase" placeholder='ingresa una frase' name="phrase"/>
                            </div>
                            <br/>
                            <div className='form-group'>
                                <label >Imagen:</label>
                                <input onChange={this.handleInput}  className='form-control'  type="file" id="image" name="image"/>
                            </div>
                            <br/>
                            <div className='card-footer text-center'>
                                <button onClick={this.onSubmit} className="btn btn-primary" >ENVIAR</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            )
        }else{
            form=(<div></div>)
        }
        if (!this.state.phase) {
            back=(
                <div className='row justify-content-center h-100'>
                    <div className="col-sm-8 align-self-center text-left">
                        <button className="btn btn-outline-primary btn-lg" onClick={this.changePhase}>VOLVER</button>
                    </div>
                </div>
            )
            
        } else {
            back=(<div></div>)
        }
        
        return (
            <div>
                <div className='row justify-content-center h-100'>
                    <div className="col-sm-8 align-self-center text-left">
                        <Alert ref={e=>{this.alertDiv=e}}/>
                        <Success ref={e=>{this.successDiv=e}}/>
                    </div>
                </div>
                {back}
                {form}
                <br/>
                <div className='row justify-content-center h-100'>
                    <div className="col-sm-8 align-self-center text-left">
                        <div id="div-image">
                            <img id="img-test" className="card-img-top"></img>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Image;