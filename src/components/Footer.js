import React, { Component } from 'react';
import '../App.css';

class Footer extends Component{
    render() {
        return(
            <footer className="App-footer">
                <p><b>{this.props.name}</b> 2018</p>
            </footer>
        )
    }
}

export default Footer