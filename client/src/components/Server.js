import React, {Component}from 'react';
import Alert from './Alert';
import Success from './Success';
import ServerData from './ServerData';

class Server extends Component{

    constructor(props){
        super(props)
        this.state={
            server:"",
            serversData:[]
        }
        this.handleInput=this.handleInput.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
    }

    componentDidMount(){
        fetch(`${this.props.server}server/`)
        .then(response=>response.json())
        .then((data)=>{
            this.setState({serversData:JSON.parse(JSON.stringify(data))})
            this.render()
        }).catch(e=>{
            this.alertServersDiv.setAlert('No se han podido cargar el monitoreo de servidores: '+e.toString())
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
        if(this.state.server!==""){
            let {server} =this.state
            fetch(`${this.props.server}server`, {
                method: 'post',
                body: JSON.stringify({server:server}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                return response.json()
            }).then((data) => {
                this.successDiv.setAlert('El servidor se esta creando')
            }).catch((e) => this.alertDiv.setAlert('Ha ocurrido un problema con el servidor'));
        }else{
            this.alertDiv.setAlert("Debe llenar el nombre de la instancia")
        }
    }

    render(){
        let srvs=this.state.serversData.map(server => {
            return (
                <ServerData ip={server.ip}
                    port={server.port}
                    status={server.status}
                />
            )
        })
        return(
            <div className='row justify-content-center h-100'>
                
                <div className="col-sm-8 align-self-center text-left">
                    <Alert ref={e=>{this.alertDiv=e}}/>
                    <Success ref={e=>{this.successDiv=e}}/>
                    <div className="card-header text-center">
                        <h5 className="card-title">AGREGA UN SERVIDOR</h5>
                    </div>
                    <br/>
                    <div className='form-group'>
                        <label >Nombre:</label>
                        <input onChange={this.handleInput} className='form-control' type="text" id="phrase" placeholder='Ingresa un nombre para la instancia' name="server"/>
                    </div>
                    <br/>
                    <div className='card-footer text-center'>
                        <button onClick={this.onSubmit} className="btn btn-primary" >ENVIAR</button>
                    </div>
                </div>
                <br/>
                <br/>
                <div className="col-sm-8 align-self-center text-left pt-5">
                    <Alert ref={e=>{this.alertServersDiv=e}}/>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr className="align-self-center">
                                <th scope="col" className="card-title">
                                    SERVIDORES
                                </th>
                            </tr>
                            <tr>
                                <th>IP</th>
                                <th>PUERTO</th>
                                <th>ESTADO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {srvs}
                        </tbody>
                    </table>
                    
                </div>
            </div>
        )
    }
}

export default Server;