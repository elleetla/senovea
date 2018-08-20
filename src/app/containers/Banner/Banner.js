import React from 'react';
import './Banner.css';

// import style
import {
    Container,
    Row,
    Col } from 'reactstrap';

class Banner extends React.Component{
    constructor(props){
        super(props);
    }

    displayContent(){
        return(
            <Col md={{ size: 8, offset: 2 }}>
                 <h1>{this.props.titleBanner}</h1>
                 {this.props.desc ? <p className="desc-banner" style={{marginBottom: '0px'}}>{this.props.desc}</p> : null}
            </Col>
        )
    }

    render(){
        return(
            <section id="banner">
                <Container>
                    <Row>
                         {this.displayContent()}
                    </Row>
                </Container>
            </section>
        )
    }
}

export default Banner;