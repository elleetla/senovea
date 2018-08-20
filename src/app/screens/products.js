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
import { filter_products_actions } from '../actions/index';

// import grid Bootstrap
import {
    Container,
    Row,
    Col } from 'reactstrap';

class Products extends Component{

    constructor(props) {
        super(props);
        this.state = {
            collapse: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        const groupedArticlesByFournisseurs = _.groupBy( this.props.productsFiltered , ( product ) => {
            return product.lot.lot_fournisseur_r1.ID;
        });
    
        return(
            <div>
                {!_.isEmpty( groupedArticlesByFournisseurs ) ?
                    _.map( groupedArticlesByFournisseurs , ( articles, indexF ) => {
                        const groupedArticlesByLot = _.groupBy( articles , ( article ) => {
                            return article.lot.lot_id;
                        });
                        return (
                            <Container key={indexF}>
                                <Row>
                                    <Col md="12" style={{marginBottom:"30px"}}>
                                        <Row className="bloc-suppliers" style={{marginBottom:"11px", marginLeft: "0px", marginRight: "0px"}}>
                                            <Col sm={12} style={{background: "#ffffff"}}>
                                                <Row>
                                                     <Col sm={8}>
                                                          <div style={{padding:"20px",borderBottom:"1px solid #D9E1E8"}}>
                                                               <p style={{margin:"0px",color:"#17D5C8",fontWeight:"500", fontSize: "22px"}}>{articles[0].lot.lot_fournisseur_r1.supplier_organisme}</p>
                                                          </div>
                                                          <div style={{padding:"20px"}}>
                                                               <Row>
                                                                    <Col sm={6}>
                                                                         <li>Lot : <strong> { articles[0].lot.lot_name } </strong></li>
                                                                         <li>Secteur : <strong> { articles[0].lot.lot_fournisseur_r1.supplier_arrondissement } </strong></li>
                                                                         <li>Adresse : <strong> { articles[0].lot.lot_fournisseur_r1.supplier_adresse } </strong></li>
                                                                    </Col>
                                                                    <Col sm={6}>
                                                                         <li>Contact : <strong> { articles[0].lot.lot_fournisseur_r1.supplier_contact} </strong></li>
                                                                         <li>Téléphone : <strong> { articles[0].lot.lot_fournisseur_r1.supplier_phone} </strong></li>
                                                                         <li>Email : <strong> { articles[0].lot.lot_fournisseur_r1.user_email} </strong></li>
                                                                    </Col>
                                                               </Row>
                                                          </div>
                                                     </Col>
                                                     <Col sm={4} className="p-0">
                                                          <div style={{borderTopRightRadius:"4px",borderBottomRightRadius:"4px",height:"100%",background:"url('https://senovea.juliengrelet.com/wp-content/uploads/2018/08/photo_fournisseur@2x.jpg')",backgroundSize:"cover",backgroundPosition:"center"}}>
                                                          </div>
                                                     </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        {_.map( groupedArticlesByLot , ( articles, indexL ) => {
                                            return (
                                                <div className="bloc-lot" key={indexL}>
                                                    <div className="title-bloc-lot">
                                                         <p>{articles[0].lot.lot_name}<span style={{paddingLeft: "84px"}}><strong>{articles.length}</strong> {articles.length === 1 ? "article" : "articles"}</span></p>
                                                    </div>
                                                    {_.map( articles , ( article , indexA ) => {
                                                        return <Product key={article.id} product_value={article} product_key={article.id} lot_key={indexL} mode="catalog"   />
                                                    } )}
                                                </div>
                                            )
                                        })}

                            </Col>
                                </Row>
                            </Container>
                        )
                    })
                    :
                    <Container>
                        <Row>
                            <Col md={12}>
                                 <h5 align="center" style={{marginTop: "30px"}}>Aucun article ne correspond à la recherche.</h5>
                            </Col>
                        </Row>
                     </Container>
                }
            </div>
        )
    }
}

function mapStateToProps(state){

    // Prep Data ( Filter )

    // * * * * * * * *
    // Catégories
    let productsFilterCateg = {}
    switch( state.productsFilterSettings.categorie ){
        case "ingenieurie":{
            productsFilterCateg = _.filter( state.products, ( product ) => {
                return product.categories[0] === "Ingénieurie"
            } )
            break;
        }
        case "travaux":{
            productsFilterCateg = _.filter( state.products, ( product ) => {
                return product.categories[0] === "Travaux"
            } )
            break;
        }
        default:{
            break;
        }
    }

    // * * * * * * * *
    // Prestations
    const productsFilterCategPresta = _.filter( productsFilterCateg, ( product ) => {
        return product.name.toLowerCase().includes( state.productsFilterSettings.prestation.toLowerCase() )
    } )

    // * * * * * * * *
    // Ref
    const productsFilterCategPrestaRef = _.filter( productsFilterCategPresta, ( product ) => {
        const ref = `${product.attributes[0].attr_value[0]}-${product.attributes[1].attr_value[0]}-${product.attributes[2].attr_value[0]}-${product.attributes[4].attr_value[0]}`
        return ref.toLowerCase().includes( state.productsFilterSettings.ref.toLowerCase() )
    } )

    const productsFiltered = productsFilterCategPrestaRef;

    return {
        "products": state.products,
        "productsFilterCateg":productsFilterCateg,
        "productsFilterCategPresta":productsFilterCategPresta,
        "productsFilterCategPrestaRef":productsFilterCategPrestaRef,
        "productsFiltered":productsFiltered,
        "user": state.user,
        "productsSettings": state.productsFilterSettings
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        "call_product":call_product,
        "filter_products_actions":filter_products_actions
    },dispatch)
}
// export
export default connect(mapStateToProps, mapDispatchToProps)(Products)