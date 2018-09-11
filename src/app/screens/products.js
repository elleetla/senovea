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

        //////console.logthis.props)
        
        const groupedLotsByFournisseurs = _.groupBy( this.props.productsFiltered , ( lot ) => {
            return lot.lot_fournisseur_R1.ID;
        } );

        ////console.log groupedLotsByFournisseurs );
    
        return(
            <section className="p-section">
                {!_.isEmpty( groupedLotsByFournisseurs ) ?
                    _.map( groupedLotsByFournisseurs , ( fournisseurLots, indexF ) => {

                        //////console.log fournisseurLots )

                        /*const groupedArticlesByLot = _.groupBy( articles , ( article ) => {
                            return article.lot.lot_id;
                        });*/

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
                                                                         <li>Email : <strong> { fournisseurLots[0].lot_fournisseur_R1.email } </strong></li>
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
                                            </Col> 
                                        </Row>
                                        

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
                
                            {/*{ this.props.products.length === 0 ? 
                                null
                                :
                                <Container>
                                <Row>
                                    { _.map(this.props.products, (categories_values, categories_keys) => {

                                        ////////////console.logcategories_keys)
                                        //////////console.logcategories_values)

                                        return(
                                            <Col md="12" key={categories_keys}>
                                                { _.map( categories_values, ( lots_values, lots_keys ) => {
                                                    return(
                                                        <div key={lots_keys}>

                                                            <div className="bloc-lot">
                                                                <div style={{marginBottom:"15px",display:"flex",alignItems:"stretch",backgroundColor:"#FFF",border:"1px solid #D9E1E8",borderRadius:"4px",boxShadow:"0px 2px 16px rgba(61, 68, 139, 0.05)"}} className="senovea-fournisseur-block">

                                                                    <div style={{flexGrow:"1"}} className="senovea-fournisseur-block-infos">
                                                                        <div style={{padding:"20px",borderBottom:"1px solid #D9E1E8"}}>
                                                                            <p style={{margin:"0px",color:"#17D5C8",fontWeight:"500"}}>{lots_values.lot_fournisseur_r1.supplier_organisme}</p>
                                                                        </div>
                                                                        <div style={{padding:"20px"}}> 
                                                                            <ul>
                                                                                <li>Lot: <strong> {lots_values.lot_name} </strong></li>
                                                                                <li>Secteur: <strong> {lots_values.lot_fournisseur_r1.supplier_arrondissement} </strong></li>
                                                                                <li>Adresse: <strong> {lots_values.lot_fournisseur_r1.supplier_adresse} </strong></li>
                                                                                <li>Contact: <strong> {lots_values.lot_fournisseur_r1.supplier_contact} </strong></li>
                                                                                <li>Téléphone: <strong> {lots_values.lot_fournisseur_r1.supplier_phone} </strong></li>
                                                                                <li>Email: <strong> {lots_values.lot_fournisseur_r1.user_email} </strong></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <div style={{width:"25%",backgroundColor:"#EDEDED"}} className="senovea-fournisseur-block-img">
                                                                        <div style={{borderTopRightRadius:"4px",borderBottomRightRadius:"4px",height:"100%",background:"url('http://www.tremoine.com/UserFiles_tremoine/image/portraits/thierry.JPG')",backgroundSize:"cover",backgroundPosition:"center"}}>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                </div>
                                                                <div className="title-bloc-lot">
                                                                    <p>{lots_values.lot_name} ({lots_values.lot_products.length} articles)</p>
                                                                </div>
                                                            { _.map( lots_values.lot_products, ( prestations_values, prestations_keys ) =>{
                                                                ////////////console.logprestations_values)
                                                                return(
                                                                    <Product key={prestations_keys} product_value={prestations_values} product_key={prestations_keys} lot_key={lots_keys} mode="catalog"   />
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
                            }*/}
            </section>
        )
    }
}

function mapStateToProps(state){

    // * * * * * * * *
    // Si il y a des produits associés 
    
    let lotWithProducts = _.filter( state.products, ( lot ) => {
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