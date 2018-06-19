import React, { Component } from 'react';

// import style
import { Container, Row, Col } from 'reactstrap';
import './Footer.css';

class Footer extends Component{
    render(){
        return(
            <footer id="footer-app">
                <Container>
                    <Row>
                        <Col lg="6">
                            Logo
                        </Col>
                        <Col lg="6">
                            Mentions
                        </Col>
                    </Row>
                </Container>
            </footer>
        )
    }
}

// export
export default Footer;