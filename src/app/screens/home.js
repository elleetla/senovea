import React, { Component } from 'react';
import { connect } from 'react-redux';

// import grid Bootstrap
import {
    Container,
    Row,
    Col,
    Collapse,
    Button,
    CardBody,
    Card } from 'reactstrap';

import LoadingSvg from '../assets/img/icon-preloader.svg';

class Home extends Component{
    constructor() {
        super();
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: false
        };
    }

    toggle(e){
        //this.setState({ collapse: !this.state.collapse });
        let parent = e.target.parentElement;
        let collapse = parent.querySelector('.collapse');
        collapse.classList.toggle('show');
    }

    render() {
            const oldProducts = this.props.products;
            const newProducts = [...oldProducts];

            if(newProducts.length === 0){
                return(
                    <div>
                        <Container>
                            <Row>
                                <Col xs="12" className="mb-5 mt-5 text-center">
                                    <div className="preloader">
                                        <img src={LoadingSvg}/>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                )
            } else {
                return(
                    <div>
                        <Container className="mb-5 mt-5">
                            <Row>
                                { newProducts.map((data) => {
                                    return(
                                        <Col xs="12" key={data.id} id={data.id} className="">
                                            <div className="article-bloc">
                                                <h5>{data.name}</h5>
                                                <p>{data.categories[0].name}</p>
                                                <Button style={{marginBottom: "20px", marginRight: "10px"}} onClick={()=>{console.log("test")}}>Ajouter aux paniers</Button>
                                                <Button color="primary" style={{marginBottom: "20px", marginRight: "10px"}} onClick={this.toggle}>Détails</Button>
                                                <Collapse>
                                                    <Card>
                                                        <CardBody>
                                                            {data.description}
                                                        </CardBody>
                                                    </Card>
                                                </Collapse>
                                                {/*<Collapse isOpen={this.state.collapse}>
                                                    <Card>
                                                        <CardBody>
                                                            {data.description}
                                                        </CardBody>
                                                    </Card>
                                                </Collapse>*/}

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