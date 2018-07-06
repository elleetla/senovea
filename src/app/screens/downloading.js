import React, { Component } from 'react';

// import grid Bootstrap
import { Container, Row, Col } from 'reactstrap';
import Banner from '../containers/Banner/Banner';

export class Downloading extends Component{
    render() {
        return(
            <div>
                <Banner
                    titleBanner="Téléchargement"
                    desc="Aucun texte pour le moment"
                />
                <Container>
                    <Row>
                        <Col md={{ size: 4, offset: 4 }} className="mt-5 mb-5">
                            <a className="btn-green">Télécharger le bulletin d'adhésion</a>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
