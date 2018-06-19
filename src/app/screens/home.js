import React from 'react';

// import grid Bootstrap
import {
    Container,
    Row,
    Col } from 'reactstrap';

export class Home extends React.Component{
    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <Col xs="12">Page : Home</Col>

                    </Row>
                </Container>
            </div>
        )
    }
}