import React, { Component } from 'react'
import imgHome from '../assets/images/home.jpg'

export default class Home extends Component {
    render() {
        return (
            <div className='container'>
                <h1>Home</h1>
                <img className='img-thumbnail mx-auto d-block' src={imgHome} style={{width:"20rem"}} alt="img_home"/>
            </div>
        )
    }
}
