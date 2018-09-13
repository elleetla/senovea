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
        this.handleAddToPanier = this.handleAddToPanier.bind(this);
    }
    componentDidMount( ){
        ////////////console.logthis)
        //this.props.call_product(this.props.user.user_arrondissement);
    }

    toggle(){
        this.setState({ collapse: !this.state.collapse });
    }

    handleAddToPanier( key ){
        ////////////console.log'handleAddToPanier')
        ////////////console.logkey)
    }

    render() {
        console.log("test de fifou: ", this.props.products);
        const groupedLotsByFournisseurs = _.groupBy( this.props.productsFiltered , lot => {
            return lot.lot_fournisseur_R1.ID;
        });
    
        return(
            <section className="p-section">
                { this.props.products.length > 0 ?
                    this.props.products.map(data => {
                        return (
                            <Container key={data.lot_id}>
                                <Row>
                                    <Col md="12" style={{marginBottom:"30px"}}>
                                        <Row className="bloc-suppliers" style={{marginBottom:"11px", marginLeft: "0px", marginRight: "0px"}}>
                                            <Col sm={12} style={{background: "#ffffff"}}>
                                                <Row>
                                                    <h3>{data.lot_name}</h3>
                                                    <p>id : {data.lot_id}</p>
                                                    <p>id : {data.lot_id}</p>
                                                     {/*<Col sm={8}>
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
                                                                         <li>Email : <strong> { fournisseurLots[0].lot_fournisseur_R1.email } </strong></li>
                                                                    </Col>
                                                               </Row>
                                                          </div>
                                                     </Col>
                                                     <Col sm={4} className="p-0">
                                                          <div style={{borderTopRightRadius:"4px",borderBottomRightRadius:"4px",height:"100%",background:"url('https://senovea.juliengrelet.com/wp-content/uploads/2018/08/photo_fournisseur@2x.jpg')",backgroundSize:"cover",backgroundPosition:"center"}}>
                                                          </div>
                                                    </Col>*/}
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row>
                                            {/*<Col>
                                            {
                                                _.map( fournisseurLots , ( lot, indexL ) => {
                                                    
                                                    return (
                                                        <div className="bloc-lot" key={indexL}>
                                                            <div className="title-bloc-lot">
                                                                <p>{lot.lot_name}<span style={{paddingLeft: "84px"}}><strong>{lot.lot_products.length}</strong> {lot.lot_products.length === 1 ? "article" : "articles"}</span></p>
                                                            </div>
                                                            {_.map( lot.lot_products , ( article, indexA ) => {
                                                            
                                                                ////console.log article )
                                                                return (
                                                                    <div key={article.id}>
                                                                        <Product key={article.id} product_value={article} product_key={article.id} lot_key={indexL} mode="catalog"   />
                                                                    </div>
                                                                )

                
                                                            })}
                                                        </div>
                                                    )

                                                })
                                            }
                                        </Col> */}
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

    // * * * * * * * *
    // Si il y a des produits associés 
    
    let lotWithProducts = _.filter( state.products, (lot) => {
        return !_.isEmpty( lot.lot_products )
    } );

    // * * * * * * * *
    // Catégories
    
    let productsFilterCateg = []
    
    switch( state.productsFilterSettings.categorie ){
        case "ingenieurie":{
            productsFilterCateg = _.filter( lotWithProducts, ( product ) => {
                return product.lot_products[0].attributes[4].attr_value[0] === "Ingénieurie"
            } )
            break;
        }
        case "travaux":{
            productsFilterCateg = _.filter( lotWithProducts, ( product ) => {
                return product.lot_products[0].attributes[4].attr_value[0] === "Travaux"
            } )
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
            //////console.logproduct)
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

    //////console.loglotWithProducts);

 
    //////console.log productsFilterCateg );

    return {
        "products": state.products,
        //"productsFilterCateg":productsFilterCateg,
        //"productsFilterCategPresta":productsFilterCategPresta,
        //"productsFilterCategPrestaRef":productsFilterCategPrestaRef,
        "productsFiltered":lotWithProducts,
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