import React from 'react';

// import grid Bootstrap
import { Container, Row, Col } from 'reactstrap';

export class AllUsers extends React.Component{
    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <Col xs="12">Page : Acheteurs</Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

