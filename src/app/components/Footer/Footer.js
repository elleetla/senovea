import React, { Component } from 'react';

// import style
import { Container, Row, Col } from 'reactstrap';
import './Footer.css';
import LogoFooter from '../../assets/img/logo-light.png';

class Footer extends Component{
    render(){
        return(
            <footer id="footer-app">
                 <a id="btn-call" href="mailto:contact@centralis.com">
                      Besoin d'une assistance ?
                 </a>
                 <Container>
                      <Row>
                           <Col lg="6">
                                <img id="logo-footer" src={LogoFooter} alt="logo Centralis"/>
                           </Col>
                           <Col lg="6" className="text-right">
                                <a href="#">Mentions légales</a> - <a href="#">Conditions générales</a> - <a href="#">RGPD</a> - <a href="#">FAQ</a> - <a href="#">Nous contacter</a>
                           </Col>
                      </Row>
                 </Container>
            </footer>
        )
    }
}

// export class
export default Footer;