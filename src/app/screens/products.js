import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from "lodash";

// Components
import Filters from '../containers/Filters/Filters';
import CreatePanier from '../containers/Create-panier/Create-panier';

import Product from "./product"

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
        this.handleAddToPanier = this.handleAddToPanier.bind(this);
    }
    componentDidMount( ){
        //console.log(this)
        //this.props.call_product(this.props.user.user_arrondissement);
    }
    toggle(){
        this.setState({ collapse: !this.state.collapse });
    }

    handleAddToPanier( key ){
        //console.log('handleAddToPanier')
        //console.log(key)
    }

    render() {

        //console.log("PRODUCTS")
        //console.log(this);

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

                                        //console.log(categories_keys)
                                        //console.log(categories_values)

                                        return(
                                            <Col xs="12" key={categories_keys}>
                                                {/*<h1>{categories_keys}</h1>*/}
                                                { _.map( categories_values, ( lots_values, lots_keys ) => {
                                                    console.log(lots_values)
                                                    return(
                                                        <div key={lots_keys}>

                                                            <div className="bloc-lot">
                                                                <div className="title-bloc-lot">
                                                                    <p>name : {lots_values.lot_name} {/*lots_values.lot_fournisseur_r1.user_email*/}</p>
                                                                    <p>Fournisseurs R1 du lot : {lots_values.lot_fournisseur_r1.user_email}</p>
                                                                </div>
                                                            { _.map( lots_values.lot_products, ( prestations_values, prestations_keys ) =>{
                                                                //console.log(prestations_values)
                                                                return(
                                                                    <Product key={prestations_keys} product_value={prestations_values} product_key={prestations_keys} lot_key={lots_keys}  />
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