import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default class Personajes extends Component {
    state = {
        personajes:[],
        status:false
    }

    getPersonajesBySerie = () =>{
        let idserie = this.props.idserie;
        let request = `api/series/personajesserie/${idserie}`;
        let url = Global.URL_ApiSeries + request;
        axios.get(url).then(response=>{
            this.setState({
                personajes:response.data,
                status:true
            })
        })
    }

    componentDidMount = () =>{
        this.getPersonajesBySerie();
    }

    render() {
        return (
            <div className='container'>
                <h1>Personajes de la serie {this.props.idserie}</h1>
                <NavLink to={`/serie/${this.props.idserie}`} className='btn btn-outline-danger'>Volver</NavLink>
                <br/>
                {
                    this.state.status === true && (
                        <table className='table table-striped table-hover table-bordered'>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Imagen</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.personajes.map((personaje, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{personaje.nombre}</td>
                                            <td><img src={personaje.imagen} style={{height:"180px",width:"200px"}} alt="img_jugador"/></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )
                }
            </div>
        )
    }
}
