import React, { Component } from 'react';

// import style
import { Container, Row, Col } from 'reactstrap';
import './Footer.css';
import LogoFooter from '../../img/logo-light.png';

class Footer extends Component{
    render(){
        return(
            <footer id="footer-app">
                <Container>
                    <Row>
                        <Col lg="6">
                            <img id="logo-footer" src={LogoFooter} alt=""/>
                        </Col>
                        <Col lg="6" className="text-right">
                            Mentions légales - <a href="#">Conditions générales</a> - <a href="#">FAQ</a> - <a href="#">Nous contacter</a>
                        </Col>
                    </Row>
                </Container>
            </footer>
        )
    }
}

// export
export default Footer;