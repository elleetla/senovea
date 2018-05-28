import React, { Component } from 'react';
import '../App.css';
import logoWp from '../logo-wp.svg';
import FiltrePost from './Filtre-post';

class Header extends Component{
    render(){
        return(
            <header className="App-header">
                <a href="/"><img src={logoWp} className="App-logo" alt="logo wp" /></a>
                <h1><a href={this.props.link} target="_blank">{this.props.name}</a></h1>
                <h2>{this.props.desc}</h2>
                <p>Mon panier : {this.props.shop}</p>
                <FiltrePost/>
            </header>
        )
    }
}

export default Header