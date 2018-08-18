import React, { Component } from 'react';

// import style
import { Container, Row, Col } from 'reactstrap';
import './Footer.css';
import LogoFooter from '../../assets/img/logo-light.png';
import {connect} from "react-redux";

class Footer extends Component{
    render(){
        console.log(this.props);
        return(
            <div>
                 {this.props.user.user_auth.isAuth !== false ?
                     <a id="btn-call">Besoin d'une assistance ?</a> :
                     null
                 }
                <footer id="footer-app">
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
            </div>
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