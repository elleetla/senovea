import React from 'react';

// import grid Bootstrap
import { Container, Row, Col } from 'reactstrap';

export class AllUsers extends React.Component{
    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <Col xs="12">Page : Utilisateurs</Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

