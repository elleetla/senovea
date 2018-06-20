import React, { Component } from 'react';

// import grid Bootstrap
import { Container, Row, Col } from 'reactstrap';

export class About extends Component{
    render() {
        return(
            <div>
                <Container>
                    <Row>
                        <Col xs="12">Page : Présentation</Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
