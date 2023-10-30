import React, { Component } from 'react'
import Global from '../Global'
import axios from 'axios'


export default class ModificarPersonaje extends Component {

    cajaSelectSeries = React.createRef();
    cajaSelectPersonajes = React.createRef();

    state = {
        series:[],
        status_s:false,
        personajes:[],
        status_p:false,
        serie:{},
        personaje:{},
        status_serie:false,
        status_personaje:false,
        statusUpdate:false,
        mensaje:""
    }

    loadSeries = () => {
        let request = "api/series";
        let url = Global.URL_ApiSeries + request;
        axios.get(url).then(response=>{
            this.setState({
                series:response.data,
                status_s:true
            });
        })
    }

    loadPersonajes = () => {
        let request = "api/personajes";
        let url = Global.URL_ApiSeries + request;
        axios.get(url).then(response=>{
            this.setState({
                personajes:response.data,
                status_p:true
            })
        })
    }

    componentDidMount = () =>{
        this.loadSeries();
        this.loadPersonajes();
    }

    getSerieById = (e) => {
        e.preventDefault();
        let idSerie = this.cajaSelectSeries.current.value;
        let request = `api/series/${idSerie}`;
        let url = Global.URL_ApiSeries + request;
        axios.get(url).then(response=>{
            this.setState({
                serie:response.data,
                status_serie:true
            });
        })
    }

    getPersonajeById = (e) => {
        e.preventDefault();
        let idPersonaje = this.cajaSelectPersonajes.current.value;
        let request = `api/personajes/${idPersonaje}`;
        let url = Global.URL_ApiSeries + request;
        axios.get(url).then(response=>{
            this.setState({
                personaje:response.data,
                status_personaje:true
            });
        })
    }

    modificaPersonaje = (e) => {
        e.preventDefault();
        let idSerie = this.cajaSelectSeries.current.value;
        let idPersonaje = this.cajaSelectPersonajes.current.value;
        let request = `api/personajes/${idPersonaje}/${idSerie}`;
        let url = Global.URL_ApiSeries + request;
        axios.put(url).then(response=>{
            this.setState({
                statusUpdate:true,
                mensaje:"Modificado correctamente!"
            })
        })
    }

    render() {
        return (
            <div className='container'>
                <h1>Personajes y Series</h1>
                <br/>
                <form>
                    <label>Seleccione una serie</label>
                    <select onChange={this.getSerieById} className='form-control' ref={this.cajaSelectSeries}>
                        {/* Aqui cargamos todas las series */}
                        {this.state.status_s === true && (
                            this.state.series.map((serie,index)=>{
                                return(
                                    <option key={index} value={serie.idSerie}>{serie.nombre}</option>
                                );
                            })
                        )}
                    </select>
                    <br/>
                    <label>Seleccione un Personaje</label>
                    <select onChange={this.getPersonajeById} className='form-control' ref={this.cajaSelectPersonajes}>
                        {/* Aqui cargamos todos los personajes */}
                        {this.state.status_p === true && (
                            this.state.personajes.map((personaje,index)=>{
                                return(
                                    <option key={index} value={personaje.idPersonaje}>{personaje.nombre}</option>
                                );
                            })
                        )}
                    </select>
                    <br/>
                    <button onClick={this.modificaPersonaje} className='btn btn-info'>Guardar cambios</button>
                    <h2>{this.state.mensaje}</h2>
                </form>
                <hr/>
                {
                    this.state.status_serie === true && (
                        <>
                            <h2>{this.state.serie.nombre}</h2><br/>
                            <img src={this.state.serie.imagen} alt="img_serie"/>
                        </>
                    )
                }
                {
                    this.state.status_personaje === true && (
                        <>
                            <h2>{this.state.personaje.nombre}</h2><br/>
                            <img src={this.state.personaje.imagen} alt="img_personaje"/>
                        </>
                    )
                }
            </div>
        );
    }
}
