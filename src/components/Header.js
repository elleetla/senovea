import React, { Component } from 'react';
import '../App.css';
import NavHeader from './Nav-header';

class Header extends Component{
    render(){
        return(
            <header className="App-header">
                <NavHeader link={this.props.link} name={this.props.name} />
            </header>
        )
    }
}

export default Header