import React from 'react'

// import grid Bootstrap
import { Container, Row, Col } from 'reactstrap';

export class AllSuppliers extends React.Component{
    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <Col xs="12">Page : Fournisseurs</Col>
                    </Row>
                </Container>
            </div>
        )
    }
}