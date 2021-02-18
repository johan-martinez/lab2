import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Navbar extends Component{

    constructor(){
        super()
    }

    render(){
        return(
            <ul className="nav navbar-dark bg-dark px-2">
                <li className="nav-item px-2 py-2">
                    <Link to="/" className="navbar-brand font-weight-bold">
                        <img clasname="pb-3"src='/img/computer.png' width='30px' height='30px'></img>
                        HOME
                    </Link>
                </li>
                <li  className="nav-item">
                    <Link to="/image" className="nav-link active">Image</Link>
                </li>
                <li className="nav-item">
                    <Link to="/email" className="nav-link active">E-mail</Link>
                </li>
                <li className="nav-item">
                    <Link to="/server" className="nav-link active">Server</Link>
                </li>
            </ul>
        )
    }

}

export default Navbar;