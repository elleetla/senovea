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
import Filters from '../containers/Filters/Filters';
import CreatePanier from '../containers/Create-panier/Create-panier';

class Home extends Component{

    constructor() {
        super();
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: false
        };
    }

    toggle(){
        this.setState({ collapse: !this.state.collapse });
    }

    render() {

        console.log(this);

        const oldProducts = this.props.products;
        const newProducts = oldProducts;

        if(this.props.user.user_auth.auth_token === '' && this.props.user.user_auth.isAuth === false){
            return(
                <div>
                    <Filters/>
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
                if(this.props.user){
                    return(
                        <div>
                            <Filters/>
                            <CreatePanier/>
                            <Container className="mb-5">
                                <Row>
                                    { newProducts.map((data) => {
                                        return(
                                            <Col xs="12" key={data.id} id={data.id} className="">
                                                <div className="article-bloc">
                                                    <Row>
                                                        <Col xs="2">
                                                            <p>Réf : <b>{data.attributes[0].attr_value}-{data.attributes[1].attr_value}-{data.attributes[2].attr_value}-{data.attributes[3].attr_value}</b></p>
                                                        </Col>
                                                        <Col xs="3">
                                                            <p><b>{data.name}</b></p>
                                                        </Col>
                                                        <Col xs="2">
                                                            <p>À partir de : <b>{data.price} €</b></p>
                                                        </Col>
                                                        <Col xs="2">
                                                            <p>Quantité : </p>
                                                        </Col>
                                                        <Col xs="3" className="text-right">
                                                            <Button style={{marginRight: "10px"}} className="btn-white">Ajouter aux paniers</Button>
                                                            <Button onClick={this.toggle} className="btn-white">Détails</Button>
                                                        </Col>
                                                    </Row>
                                                    <Collapse isOpen={this.state.collapse}>
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
}

function mapStateToProps(state){
    return {
        "products": state.products,
        "user": state.user
    }
}

// export
export default connect(mapStateToProps)(Home)