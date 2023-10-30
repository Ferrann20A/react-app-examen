import React, { Component } from 'react'
import Global from '../Global'
import axios from 'axios';

export default class NuevoPersonaje extends Component {

    state = {
        status: false,
        series: [],
        status_s:false,
        mensaje:""
    }

    cajaId = React.createRef();
    cajaNombre = React.createRef();
    cajaImagen = React.createRef();
    cajaSerie = React.createRef();

    loadSeries = () => {
        let request = "api/series";
        let url = Global.URL_ApiSeries + request;
        axios.get(url).then(response => {
            this.setState({
                series: response.data,
                status_s: true
            });
        })
    }

    componentDidMount = () => {
        this.loadSeries();
    }

    insertarPersonaje = (e) => {
        e.preventDefault();
        let id = parseInt(this.cajaId.current.value);
        let nombre = this.cajaNombre.current.value;
        let imagen = this.cajaImagen.current.value;
        let serie = parseInt(this.cajaSerie.current.value);
        let personaje = {
            idPersonaje:id,
            nombre:nombre,
            imagen: imagen,
            idSerie:serie
        }
        console.log(personaje);
        let request = "api/personajes";
        let url = Global.URL_ApiSeries + request;
        axios.post(url, personaje).then(response => {
            this.setState({
                status: true,
                mensaje:"Personaje insertado correctamente!"
            })
        });
    }

    render() {
        return (
            <div className='container'>
                <h1>CreatePersonaje</h1>
                <br />
                <form className='mx-auto d-block' style={{ width: "40rem" }}>
                    <label>Id</label>
                    <input type='number' ref={this.cajaId} className='form-control' />
                    <label>Nombre</label>
                    <input type='text' ref={this.cajaNombre} className='form-control' />
                    <label>Imagen</label>
                    <input type='text' className='form-control' ref={this.cajaImagen} /><br />
                    <label>Series</label>
                    {/* Aqui hay que cargar con un select las series que hay disponibles */}
                    <select className='form-control' ref={this.cajaSerie}>
                        {this.state.status_s === true && (
                            this.state.series.map((serie,index)=>{
                                return(
                                    <option key={index} value={serie.idSerie}>{serie.nombre}</option>
                                );
                            })
                        )}
                    </select>
                    <br />
                    <button onClick={this.insertarPersonaje} className='btn btn-outline-success'>Insertar Personaje</button>
                </form>
                <br/><br/>
                <h2>{this.state.mensaje}</h2>
            </div>
        )
    }
}
