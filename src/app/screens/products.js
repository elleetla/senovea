import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from "lodash";

// Components
import Filters from '../containers/Filters/Filters';
import CreatePanier from '../containers/Create-panier/Create-panier';

// Actions
import { call_product } from '../actions/index';

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

class Products extends Component{

    constructor(props) {
        super(props);
        this.state = {
            collapse: false
        }
        this.toggle = this.toggle.bind(this);
    }
    componentDidMount( ){
        console.log(this)
        this.props.call_product(this.props.user.user_arrondissement);
    }
    toggle(){
        this.setState({ collapse: !this.state.collapse });
    }
    render() {

        console.log("PRODUCTS")
        console.log(this);

        return(
            <div>
                            { this.props.products.length === 0 ? 
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
                                :
                                <Container className="mb-5">
                                <Row>
                                    { _.map(this.props.products, (categories_values, categories_keys) => {

                                        console.log(categories_keys)
                                        console.log(categories_values)

                                        return(
                                            <Col xs="12" key={categories_keys}>
                                                {/*<h1>{categories_keys}</h1>*/}
                                                { _.map( categories_values, ( lots_values, lots_keys ) => {
                                                    return(
                                                        <div key={lots_keys}>
                                                            <div className="bloc-lot">
                                                                <div className="title-bloc-lot">
                                                                    <p>Lot {lots_values.lot_name} {/*lots_values.lot_fournisseur_r1.user_email*/}</p>
                                                                </div>

                                                                { _.map( lots_values.lot_products, ( prestations_values, prestations_keys ) =>{
                                                                    console.log(prestations_values)
                                                                    return(
                                                                        <div key={prestations_keys} className="article-bloc">
                                                                            <Row>
                                                                                <Col xs="2">
                                                                                    <p>Réf : <b> { `${prestations_values.attributes[0].attr_value[0]}.${prestations_values.attributes[1].attr_value[0]}.${prestations_values.attributes[2].attr_value[0]}.${prestations_values.attributes[3].attr_value[0]}.${prestations_values.attributes[5].attr_value[0]}` } </b> </p>
                                                                                </Col>
                                                                                <Col xs="3">
                                                                                    <p><b>{prestations_values.name}</b></p>
                                                                                </Col>
                                                                                <Col xs="2">
                                                                                    <p>À partir de : <b>{prestations_values.price} €</b></p>
                                                                                </Col>
                                                                                <Col xs="2">
                                                                                    <p>Quantité : </p>
                                                                                </Col>
                                                                                <Col xs="3" className="text-right">
                                                                                    <Button style={{marginRight: "10px"}} className="btn-white">Ajouter aux paniers</Button>
                                                                                    <Button onClick={this.toggle} className="btn-white">Détails</Button>
                                                                                </Col>
                                                                            </Row>
                                                                            <Collapse isOpen={false}>
                                                                                <Card>
                                                                                    <CardBody dangerouslySetInnerHTML={{__html: prestations_values.description}}>
                                                                                    </CardBody>
                                                                                </Card>
                                                                            </Collapse>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </Col>
                                        )
                                    })}
                                </Row>
                                </Container>
                            }
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        "products": state.products,
        "user": state.user
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        "call_product":call_product
    },dispatch)
}
// export
export default connect(mapStateToProps, mapDispatchToProps)(Products)