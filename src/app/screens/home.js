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
import PictoUser from '../assets/img/picto_user.svg';

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

        console.log(this);

        const oldProducts = this.props.products;
        //const newProducts = [...oldProducts];
        const newProducts = oldProducts;

        if(this.props.user.user_auth.auth_token === '' && this.props.user.user_auth.isAuth === false){
            return(
                <div>
                    <Container>
                        <Row className="mt-5 mb-5">
                            <Col sm="12" md={{ size: 6, offset: 3 }}>
                                <div className="connect-bloc">
                                    <img src={PictoUser} className="picto-user"/>
                                    <p className="title-connect-bloc">Veuillez vous connecter ou créer un compte pour faire une recherche</p>
                                    <ul>
                                        <li><a href="#">Connexion</a></li>
                                        <li><a href="#">Inscription</a></li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
        } else {
            if(newProducts.length === 0){
                return(
                    <div>
                        <Container>
                            <Row>
                                <Col xs="12" className="mb-5 mt-5 text-center mt-4 mb-4">
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
                                                <Row>
                                                    <Col xs="6">
                                                        <h5>{data.name}</h5>
                                                        <p>{data.categories[0]}</p>
                                                    </Col>
                                                    <Col xs="6" className="text-right">
                                                        <Button style={{marginBottom: "20px", marginRight: "10px"}} className="btn-white">Ajouter aux paniers</Button>
                                                        <Button color="primary" style={{marginBottom: "20px", marginRight: "10px"}} className="btn-white">Détails</Button>
                                                    </Col>
                                                </Row>
                                                <Collapse>
                                                    <Card>
                                                        <CardBody dangerouslySetInnerHTML={{__html: data.description}}>
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
}

function mapStateToProps(state){
    return {
        "products": state.products,
        "user": state.user
    }
}

// export
export default connect(mapStateToProps)(Home)