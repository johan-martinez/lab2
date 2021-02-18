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
            options=(
                <span className="badge bg-success">ACTIVO</span>
            )
        }else{
            options=(
                <span className="badge bg-danger">INACTIVO</span>
            )
        }
        return (
            <tr>
                <td>{this.state.ip}</td>
                <td>{this.state.port}</td>
                <td>{options}</td>
            </tr>
        )
    }
}

export default ServerData