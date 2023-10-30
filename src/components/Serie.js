import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default class Serie extends Component {
    state = {
        serie:{},
        status:false
    }

    getSerieById = () => {
        let idSerie = this.props.idserie;
        let request = `api/series/${idSerie}`;
        let url = Global.URL_ApiSeries + request;
        axios.get(url).then(response=>{
            this.setState({
                serie:response.data,
                status:true
            })
        });
    }

    componentDidMount = () => {
        this.getSerieById();
    }

    componentDidUpdate = (oldProps) => {
        if(oldProps.idserie!== this.props.idserie){
            this.getSerieById();
        }
    }

    render() {
        return (
            <div className='container'>
                <br/>
                <div className="card mx-auto d-block" style={{width: "45rem"}}>
                    <img src={this.state.serie.imagen} className="card-img-top mx-auto d-block" alt="img_equipo"/>
                        <div className="card-body">
                            <h3 className="card-title text-uppercase">{this.state.serie.nombre}</h3>
                            <h3 className='card-title'>Puntuación: {this.state.serie.puntuacion}</h3>
                            <p className="card-text">{this.state.serie.anyo}</p>
                            <NavLink className='btn btn-primary' to='/'>Volver</NavLink>
                            <NavLink className='btn btn-success' to={`/personajes/${this.state.serie.idSerie}`}>Personajes</NavLink>
                        </div>
                </div>
            </div>
        )
    }
}
