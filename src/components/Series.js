import React, { Component } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom';
import Global from '../Global';

export default class Series extends Component {
    state = {
        series:[],
        status:false
    }

    loadSeries = () => {
        let request = "api/series";
        let url = Global.URL_ApiSeries + request;
        axios.get(url).then(response=>{
            this.setState({
                series:response.data,
                status:true
            });
        })
    }

    componentDidMount = () =>{
        this.loadSeries();
    }

    render() {
        return (
            <div>
                {
                    this.state.status === true && (
                        this.state.series.map((serie,index)=>{
                            return(
                                <li key={index}>
                                    <NavLink className='dropdown-item' to={`/serie/${serie.idSerie}`}>{serie.nombre}</NavLink>
                                </li>
                            );
                        })
                    )
                }
            </div>
        )
    }
}
