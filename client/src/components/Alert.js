import React, {Component} from 'react';

class Alert extends Component{

    constructor(props){
        super(props)
        this.state={
            err:null
        }
        this.onSubmit=this.onSubmit.bind(this)
        this.setAlert=this.setAlert.bind(this)
    }

    setAlert(msg){
        this.setState({
            err:msg
        })
    }

    onSubmit(e){
        if (e) {
            e.preventDefault()
        }
        this.setState({
            err:""
        })
    }

    render(){
        var msg;
        if (this.state.err!=="") {
            msg= (
                <div className="alert alert-danger text-rigth" role="alert">
                    {this.state.err}{'   '}
                    <button onClick={this.onSubmit} className="btn btn-danger">x</button>
                </div>
            )
        }else{
            msg=(<div></div>)
        }
        return(
            <div className='row justify-content-center h-100'>
                <div className="col-sm-8 align-self-center text-left">
                    {msg}
                </div>
            </div>
        )
    }
}

export default Alert;