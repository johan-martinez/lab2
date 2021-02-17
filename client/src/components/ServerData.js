import React, {Component} from 'react'

class ServerData extends Component{

    constructor(props){
        super(props)
        this.state={
            ip:props.ip,
            port:props.port,
            status:props.status
        }
    }

    render(){
        let options;
        if (this.state.status) {
            options=(<div className="row">
                <span className="badge bg-success">ACTIVO</span>
            </div>)
        }else{
            options=(<div className="row">
                <span className="badge bg-danger">INACTIVO</span>
                <button className="btn btn-primary">ENCENDER</button>
            </div>)
        }
        return (
            <div className="row">
                <p>{this.state.ip}:{this.state.port}</p>
                {options}
            </div>
        )
    }
}

export default ServerData