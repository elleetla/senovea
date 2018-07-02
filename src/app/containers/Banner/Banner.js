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
    render(){
        return(
            <section id="banner-home">
                <Container>
                    <Row>
                        <Col md={{ size: 8, offset: 2 }}>
                            <h1>
                                {this.props.titleBanner}
                            </h1>
                        </Col>
                        {this.props.desc ?
                            <Col md={{size: 8, offset: 2}}>
                                <p className="desc-banner" style={{marginBottom: '0px'}}>{this.props.desc}</p>
                            </Col>
                            :
                            null
                        }
                    </Row>
                </Container>
            </section>
        )
    }
};

export default Banner;