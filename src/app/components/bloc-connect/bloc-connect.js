import React, {Component} from 'react';

import { Container, Row, Col, } from 'reactstrap';

import PictoUser from '../../assets/img/picto_user.svg';

class BlocConnect extends Component{
    render(){
        return(
            <div>
                <Container>
                    <Row className="mt-5 mb-5">
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <div className="connect-bloc">
                                <img src={PictoUser} className="picto-user"/>
                                <p className="title-connect-bloc">Veuillez vous connecter ou créer un compte pour faire une recherche</p>
                                <ul>
                                    <li><a>Connexion</a></li>
                                    <li><a>Inscription</a></li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default BlocConnect;