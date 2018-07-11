import React, { Component } from 'react';

// import grid Bootstrap
import { Container, Row, Col } from 'reactstrap';
import Banner from '../containers/Banner/Banner';

export class About extends Component{
    render() {
        return(
            <div>
                <Banner
                    titleBanner="Présentation"
                    desc="Aucun texte pour le moment"
                />
                <Container>
                    <Row>
                        <Col md="12">
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
