import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import Serie from './Serie';
import Personajes from './Personajes';
import NuevoPersonaje from './NuevoPersonaje';

export default class Router extends Component {
    render() {
        function SerieElement(){
            let {idserie} = useParams();
            return <Serie idserie={idserie}/>
        }
        function PersonajesElement(){
            let {idserie} = useParams();
            return <Personajes idserie={idserie}/>
        }
        return (
            <div>
                <BrowserRouter>
                    <NavBar/>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/serie/:idserie' element={<SerieElement/>}/>
                        <Route path='/personajes/:idserie' element={<PersonajesElement/>}/>
                        <Route path='/nuevopersonaje' element={<NuevoPersonaje/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}
