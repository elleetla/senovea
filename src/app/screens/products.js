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

import arrowProduct from "../assets/img/arrow-product.svg";

class Products extends Component{

    constructor(props) {
        super(props); 
    }

    toggleDetails(value){
        const toggleId = document.querySelector(`#d${value}`);
        const toggleButton = document.querySelector(`#b${value}`);
        toggleId.style.display = toggleId.style.display != 'none' ? 'none' : 'block';
    }

    render() {
        console.log("fournisseur :", this.props);
        const groupedLotsByFournisseurs = _.groupBy( this.props.productsFiltered , lot => lot.lot_fournisseur_R1.ID);
        console.log("test", groupedLotsByFournisseurs);
        console.log("props products filter :", this.props.productsFiltered);
        return(
            <section className="p-section">

                {/*  
                    // On fait une boucle sur les lots groupés par fournisseurs R1
                */}
                {!_.isEmpty( groupedLotsByFournisseurs ) ?
                    _.map( groupedLotsByFournisseurs , ( fournisseurLots, indexF ) => {
                        return (
                            <Container key={indexF}>
                                <Row>
                                    <Col md="12" style={{marginBottom:"30px"}}>
                                        <Row className="bloc-suppliers" style={{marginBottom:"11px", marginLeft: "0px", marginRight: "0px"}}>
                                            <Col sm={12} style={{background: "#ffffff"}}>
                                                <Row>
                                                    <Col sm={8}>
                                                          <div style={{padding:"20px",borderBottom:"1px solid #D9E1E8"}}>
                                                               <p style={{margin:"0px",color:"#17D5C8",fontWeight:"500", fontSize: "22px"}}>{ fournisseurLots[0].lot_fournisseur_R1.organisme }</p>
                                                          </div>
                                                          <div style={{padding:"20px"}}>
                                                               <Row>
                                                                    <Col sm={6}>
                                                                         <li>Lot : <strong> { fournisseurLots[0].lot_id } - { fournisseurLots[0].lot_name } </strong></li>
                                                                         <li>Secteur : <strong>{ fournisseurLots[0].lot_fournisseur_R1.arrondissement } - Nom du secteur</strong></li>
                                                                         <li>Adresse : <strong> { fournisseurLots[0].lot_fournisseur_R1.adresse }</strong></li>
                                                                    </Col>
                                                                    <Col sm={6}>
                                                                         <li>Contact : <strong> { fournisseurLots[0].lot_fournisseur_R1.contact }</strong></li>
                                                                         <li>Téléphone : <strong> + 33 (0){ fournisseurLots[0].lot_fournisseur_R1.phone }</strong></li>
                                                                         <li>Email : <strong> { fournisseurLots[0].lot_fournisseur_R1.user_email } </strong></li>
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
                                        <Row>
                                            <Col>
                                                {_.map( fournisseurLots , ( lot, indexL ) => {
                                                        return (
                                                            <div className="bloc-lot" key={indexL}>
                                                                <div className="title-bloc-lot">
                                                                    <p>{lot.lot_name}<span style={{paddingLeft: "84px"}}><strong>{lot.lot_products.length}</strong> {lot.lot_products.length === 1 ? "article" : "articles"}</span></p>
                                                                    <button onClick={() => this.toggleDetails(lot.lot_id)} id={'b'+lot.lot_id} className="arrow">
                                                                        <img src={arrowProduct} alt="flèche produit"/>
                                                                    </button>
                                                                </div>
                                                                {_.map( lot.lot_products , article => {
                                                                    return (
                                                                        <div key={article.id} id={'d'+lot.lot_id}>
                                                                            <Product key={article.id} product_value={article} product_key={article.id} lot_key={lot.lot_id} mode="catalog"   />
                                                                        </div>
                                                                    )
                    
                                                                })}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Col>
                                        </Row>
                                     </Col>
                                </Row>
                            </Container>
                        )
                    })
                    : 
                    <h1>Aucun articles</h1>
                }
            </section>
        )
    }

}

function mapStateToProps(state){

    // Check associated products
    let lotWithProducts = _.filter( state.products, (lot) => !_.isEmpty( lot.lot_products ));

     console.log("state products: ", lotWithProducts);

    // Create array of category
    let productsFilterCateg = [];
    
    switch( state.productsFilterSettings.categorie ){
        
        case "ingenieurie":{
            productsFilterCateg = _.filter( lotWithProducts, ( product ) => product.lot_products[0].attributes[4].attr_value[0] === "Ingénieurie");
            break;
        }
        case "travaux":{
            productsFilterCateg = _.filter( lotWithProducts, ( product ) => product.lot_products[0].attributes[4].attr_value[0] === "Travaux")
            break;
        }
        default:{
            break;
        }

    }

    _.each( productsFilterCateg , ( lot , index ) => {
        // * * * * * * * *
        // Prestations && Ref
        const productsFiltered = _.filter( lot.lot_products, ( product ) => {
            const ref = `${product.attributes[0].attr_value[0]}-${product.attributes[1].attr_value[0]}-${product.attributes[2].attr_value[0]}-${product.attributes[4].attr_value[0]}`
            return product.name.toLowerCase().includes( state.productsFilterSettings.prestation.toLowerCase() ) && ref.toLowerCase().includes( state.productsFilterSettings.ref.toLowerCase() )
        } );

        productsFilterCateg[index].lot_products = productsFiltered

    } );


    // * * * * * * * *
    // Si il y a des produits associés 
    
    lotWithProducts = _.filter( productsFilterCateg, ( lot ) => {
        return !_.isEmpty( lot.lot_products )
    } );

    //////////console.loglotWithProducts);

 
    //////////console.log productsFilterCateg );

    return {
        "products": state.products,
        //"productsFilterCateg":productsFilterCateg,
        //"productsFilterCategPresta":productsFilterCategPresta,
        //"productsFilterCategPrestaRef":productsFilterCategPrestaRef,
        "productsFiltered": lotWithProducts,
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