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
        ////console.log(this)
        //this.props.call_product(this.props.user.user_arrondissement);
    }
    toggle(){
        this.setState({ collapse: !this.state.collapse });
    }

    handleAddToPanier( key ){
        ////console.log('handleAddToPanier')
        ////console.log(key)
    }

    render() {

        ////console.log("PRODUCTS")
        ////console.log(this);

        return(
            <div>
                            { this.props.products.length === 0 ? 
                                /*<div>
                                <Container>
                                    <Row>
                                        <Col xs="12" className="mb-5 mt-5 text-center mt-4 mb-4">
                                            <div className="preloader">
                                                <img src={LoadingSvg}/>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                                </div>*/
                                null
                                :
                                <Container>
                                <Row>
                                    <Col md="12">
                                        <p>Tous les <strong>lots</strong> pour l'arrondissement: <strong>{this.props.user.user_arrondissement}</strong></p>
                                    </Col>
                                </Row>
                                <Row>
                                    { _.map(this.props.products, (categories_values, categories_keys) => {

                                        ////console.log(categories_keys)
                                        //console.log(categories_values)

                                        return(
                                            <Col md="12" key={categories_keys}>
                                                {/*<h1>{categories_keys}</h1>*/}
                                                { _.map( categories_values, ( lots_values, lots_keys ) => {
                                                    //console.log(lots_values)
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
                                                                ////console.log(prestations_values)
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