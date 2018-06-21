import React, { Component } from 'react';

// import style
import './Filters.css';
import { Container, Row, Col } from 'reactstrap';

class Filters extends Component{
    render(){
        return(
            <nav id="Filters">
                <Container>
                    <Row>
                        <Col sm="3">
                        </Col>
                        <Col sm="3">
                        </Col>
                        <Col sm="3">
                            <button className="btn-primary">Travaux</button>
                            <button className="btn-primary">Ingénieurie</button>
                        </Col>
                        <Col sm="3">
                            <button onClick={()=>{console.log("test")}} className="btn-green">Rechercher</button>
                        </Col>
                    </Row>
                </Container>
            </nav>
        )
    }
}

// export
export default Filters;