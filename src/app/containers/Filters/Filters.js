import React, { Component } from 'react';

// import style
import { Container, Row, Col } from 'reactstrap';
import './Filters.css';

class Filters extends Component{
    render(){
        return(
            <nav id="Filters">
                <Container>
                    <Row>
                        <Col lg="3">
                        </Col>
                        <Col lg="3">
                        </Col>
                        <Col lg="3">
                        </Col>
                        <Col lg="3">
                            <button className="btn-green">Rechercher</button>
                        </Col>
                    </Row>
                </Container>
            </nav>
        )
    }
}

// export
export default Filters;