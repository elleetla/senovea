import React, { Component } from 'react';

// import grid Bootstrap
import { Container, Row, Col } from 'reactstrap';

export class Downloading extends Component{
    render() {
        return(
            <div>
                <Container>
                    <Row>
                        <Col xs="6" className="mt-5 mb-5">
                            <a className="btn-green">Télécharger la charte d'adhésion</a>
                        </Col>
                        <Col xs="6" className="mt-5 mb-5">
                            <a className="btn-green">Télécharger le second document</a>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
