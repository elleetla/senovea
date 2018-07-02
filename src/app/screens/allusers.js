import React from 'react';

// import grid Bootstrap
import { Container, Row, Col } from 'reactstrap';
import Users from './users';

export class AllUsers extends React.Component{
    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <Col xs="12">Page : Acheteurs</Col>
                        <Users/>
                    </Row>
                </Container>
            </div>
        )
    }
}
