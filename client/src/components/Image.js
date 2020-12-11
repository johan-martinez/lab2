import React, {Component} from 'react';
import * as FormData from "form-data";

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
        this.closeAlert=this.closeAlert.bind(this)
        this.setAlert=this.setAlert.bind(this)
        this.changePhase=this.changePhase.bind(this)
    }

    changePhase(){
        this.setState({phase:true})
        document.getElementById('img-test').src=""
        document.getElementById('img-test').style.width="0%"
        document.getElementById('img-test').style.height="0%"
    }

    setAlert(msg){
        this.setState({
            err:msg
        })
    }

    closeAlert(){
        this.setState({
            err:""
        })
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
            this.setState({
                err:"Debe rellenar todos los campos para poder enviar"
            })
        }else{
            var form=new FormData(document.getElementById('form-image'))
            fetch(this.props.server, {
                method: 'post',
                body: form,
            })
            .then((response) => {
                this.setState({phase:false})
                this.render()
                return response.blob()
            }).then((image) => {
                let url=URL.createObjectURL(image)
                document.getElementById('img-test').src=url
                document.getElementById('img-test').style.width="50%"
                document.getElementById('img-test').style.height="50%"
            }).catch((e) => console.log(e));
        }
        
    }
    

    render(){
        var msg;
        if (this.state.err!=="") {
            msg= (
                <div className="alert alert-danger" role="alert">
                    {this.state.err}
                    <button onClick={this.closeAlert} className="btn btn-danger">x</button>
                </div>
            )
        }
        var form,back;
        if (this.state.phase) {
            form=(
                <div className='row justify-content-center h-100'>
                {msg}
                <div className="col-sm-8 align-self-center text-left">
                    <div>
                        <div className="card-header text-center">
                            <h5 className="card-title">Colocale un texto a una imagen</h5>
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
                {back}
                {form}
                <br/>
                <div id="div-image">
                    <img id="img-test" className="card-img-top"></img>
                </div>
            </div>
        )
    }
}

export default Image;