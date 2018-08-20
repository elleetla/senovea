import React, { Component } from 'react';

// import style
import { Container, Row, Col } from 'reactstrap';
import './Footer.css';
import LogoFooter from '../../assets/img/logo-light.png';
import PictoMessage from '../../assets/img/picto_message.svg';
import {connect} from "react-redux";

class Footer extends Component{
    render(){
        return(
            <footer id="footer-app">
                 <a id="btn-call">
                      <img src={PictoMessage}/>
                 </a>
                 <Container>
                      <Row>
                           <Col lg="6">
                                <img id="logo-footer" src={LogoFooter} alt=""/>
                           </Col>
                           <Col lg="6" className="text-right">
                                <a href="#">Mentions légales</a> - <a href="#">Conditions générales</a> - <a href="#">FAQ</a> - <a href="#">Nous contacter</a>
                           </Col>
                      </Row>
                 </Container>
            </footer>
        )
    }
}

function mapStateToProps( state ){
    return {
        "user":state.user,
        "appSettings":state.appSettings,
        "paniers":state.paniers,
        "paniersSettings" : state.paniersSettings,
    }
}

export default connect(mapStateToProps)(Footer);