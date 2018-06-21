import React, { Component } from 'react';
import { connect } from 'react-redux'

// import grid Bootstrap
import {
    Container,
    Row,
    Col,
    Collapse,
    Button,
    CardBody,
    Card } from 'reactstrap';

class Home extends Component{

    constructor() {
        super();
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: false,
            loading: true
        };
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    render(){
        const oldProducts = this.props.products;
        const newProducts = [...oldProducts];
        if(this.state.loading){
            return(
                <p>Loader test</p>
            )
        } else {
            return(
                <div>
                    <Container>
                        <Row>
                            { newProducts.map((data) => {
                                return(
                                    <Col xs="12" key={data.id} id={data.id}>
                                        <div className="article-bloc">
                                            <h5>{data.name}</h5>
                                            <p>{data.acf.unite}</p>
                                            <Button style={{marginBottom: "20px"}} onClick={this.toggle}>Détails</Button>
                                            <Collapse isOpen={this.state.collapse}>
                                                <Card>
                                                    <CardBody>
                                                        {data.description}
                                                    </CardBody>
                                                </Card>
                                            </Collapse>
                                        </div>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Container>
                </div>
            )
        }
    }
}

function mapStateToProps(state){
    return {
        "products": state.products
    }
}

// export
export default connect(mapStateToProps)(Home)