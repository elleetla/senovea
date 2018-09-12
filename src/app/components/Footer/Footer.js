import React, { Component } from 'react';

// import style
import { Container, Row, Col } from 'reactstrap';
import './Footer.css';
import LogoFooter from '../../assets/img/logo-light.png';
import { Link } from 'react-router-dom';

class Footer extends Component{

    render(){
        return(
            <footer id="footer-app">
                 <a id="btn-call" href="mailto:contact@centralis.com">Besoin d'une assistance ?</a>
                 <Container>
                      <Row>
                           <Col lg="6">
                                <img id="logo-footer" src={LogoFooter} alt="logo Centralis"/>
                           </Col>
                           <Col lg="6" className="text-right">
                                <Link to="/mentions-legales">Mentions légales</Link> - 
                                <Link to="/conditions-generales">Conditions générales</Link> - 
                                <Link to="/rgpd">RGPD</Link> - <Link to="/faq">FAQ</Link> - 
                                <Link to="/nous-contacter">Nous contacter</Link>
                           </Col>
                      </Row>
                 </Container>
            </footer>
        )
    }
}

// export class
export default Footer;