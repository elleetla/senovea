import React from "react"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash"
import Product from "./product"

import { order_panier } from "../actions/index"
import { add_alert } from "../actions/index"

import { Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Container, Row, Col, Badge, Input, Label, FormGroup } from 'reactstrap';

    import LoadingSvg from '../assets/img/icon-preloader-connect.svg';


class AccountPaniersDetail extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            "orderLoading":false
        }

        this.handleOrder = this.handleOrder.bind(this)
    }

    handleOrder(  ){
        
        this.setState({
            "orderLoading":true
        })

        // ici on valide le panier 
        // ( creation d'une order )
        this.props.order_panier( this.props.panier.id, ( order_panier_status ) =>{
            
            // Callback
            if( order_panier_status === "success" ){

                this.props.add_alert({
                    "status":"success",
                    "content":`Le panier a bien été commandé!`
                })
            }else{

                this.props.add_alert({
                    "status":"error",
                    "content":`Erreur lors de la commande du panier`
                })
            }

            this.setState({
                "orderLoading":false
            })


        })

    } 

    renderPanierStatus( status ){

        switch( status ){
            case"not sended":{
                return <Badge color="warning"> {status} </Badge>
            }
            default:
                return <Badge color="info"> No status </Badge>
        }
    }


    render(){

        //console.log(this);
        //////console.log(this.props.products)
        ////console.log(this);
        return(
            <Container>
                <Row style={{marginTop:"25px", marginBottom:"25px"}}>
                    <Col md="12">
                    <Container>
                        <Row>
                            <Col md="12">
                                <Card style={{padding:"25px"}}>
                                    <h4> { this.renderPanierStatus( this.props.panier.status )} </h4>
                                    <h2> { this.props.panier.nicename } </h2>
                                    <div>
                                        <ul>
                                            <li>[panier date]</li>
                                            <li>[panier nb article]</li>
                                            <li>[panier total price]</li>
                                        </ul>
                                    </div>
                                    <Row>
                                        <Col md="6">
                                            <button style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}  className="btn-green"  onClick={ this.handleOrder } >
                                                <div style={{lineHeight:"1"}}> Commander mon panier </div>
                                                <div style={ this.state.orderLoading ? {marginLeft:"0",opacity:"1"} : {marginLeft:"0",opacity:"0"} } className="preloader-connect-user"><img src={LoadingSvg}/></div>
                                            </button>
                                        </Col>
                                        <Col md="6">
                                            <button style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}  className="btn-green"  onClick={ this.handleOrder } >
                                                <div style={{lineHeight:"1"}}> Supprimer mon panier </div>
                                                <div style={{marginLeft:"0",opacity:"0"}} className="preloader-connect-user"><img src={LoadingSvg}/></div>
                                            </button>
                                        </Col>

                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                        </Container>
                    </Col>
                </Row>
                <Row style={{marginBottom:"25px"}}>
                    <Col md="12">
                    <Container>
                    <Row>
                    <Col md="12">
                    <Card style={{padding:"25px"}}>
                        <form>
                        <Row>
                            
                            <Col md="6">
                                <div>
                                    <h4> Adresse du lieu d'intervention </h4>
                                    <FormGroup>
                                        <Label> Code Arrondissement </Label>
                                        <Input disabled type="text" placeholder="Code Arrondissement"  defaultValue={this.props.panier.arrondissement}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label> Code Postal </Label>
                                        <Input type="text" placeholder="Code Postal" defaultValue={this.props.panier.code_postal}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label> Adresse Intervention </Label>
                                        <Input type="text" placeholder="Ville"  defaultValue={this.props.panier.adresse}/>
                                    </FormGroup>
                                </div>
                            </Col>
                            <Col md="6">
                                <div>
                                    <h4> Message à l'attention du fournisseur </h4>
                                    <FormGroup>
                                        <Label> Message </Label>
                                        <Input type="textarea" defaultValue="message"  defaultValue={this.props.panier.message}/> 
                                    </FormGroup>
                                    <div>
                                    <button style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}  className="btn-green">
                                        <div style={{lineHeight:"1"}}> Sauvegarder Informations Panier </div>
                                        <div style={{marginLeft:"0",opacity:"0"}} className="preloader-connect-user"><img src={LoadingSvg}/></div>
                                    </button>
                                    </div>
                                </div>
                            </Col>

                        </Row>

                        </form>
                        </Card>


                    </Col>
                </Row>
            </Container>
                    </Col>
                </Row>
                
                <Row>
                    <Col md="12">

                            { this.props.products.length === 0 ? 
                                    <Container>
                                        <Row>
                                            <Col md="12">
                                                No Products in panier
                                            </Col>
                                        </Row>
                                    </Container>
                                    :                    
                                    <Container>
                                                                        <Row>
                                    <Col md="12">
                                        <p>Tous les <strong>lots</strong> du panier </p>
                                    </Col>
                                </Row>
                                        <Row>
                                            {/*
                                                _.map(this.props.products, (categories_values, categories_keys) => {
                                                    ////////console.log(categories_keys)
                                                    ////////console.log(categories_values)
                                                    return _.isEmpty( categories_values ) === false ?
                                                                _.map(categories_values, (lots_values, lots_keys) => {
                                                                    // ne retourner que les lots qui sont dans le panier
                                                                    return  _.has( this.props.panierProducts, lots_keys ) ?
                                                                        <Col md="12" key={categories_keys}>
                                                                            <h1>{categories_keys}</h1>
                                                                            <div key={lots_keys}>
                                                                                <div className="bloc-lot">
                                                                                    <div className="title-bloc-lot">
                                                                                        <p>name : {lots_values.lot_name}</p>
                                                                                        <p>Fournisseurs R1 du lot : {lots_values.lot_fournisseur_r1.user_email}</p>
                                                                                        { 
                                                                                            _.isEmpty( lots_values.lot_products ) === false ?
                                                                                                _.map( this.props.panierProducts[lots_keys], ( product_key ) => {
                                                                                                    return _.map( lots_values.lot_products, ( prestations_values, prestations_keys ) =>{
                                                                                                        ////////console.log(parseInt( product_key ))
                                                                                                        ////////console.log(parseInt(prestations_values.id))

                                                                                                        return parseInt(prestations_values.id) === parseInt( product_key ) || parseInt(prestations_values.id) ? 
                                                                                                        <div key={prestations_keys}>
                                                                                                            <Product key={prestations_keys} product_value={prestations_values} product_key={prestations_keys} lot_key={lots_keys}  />
                                                                                                        </div>
                                                                                                            :
                                                                                                            null
                                                                                                    })
                                                                                                })
                                                                                            :
                                                                                            null
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Col>
                                                                        :
                                                                        null
                                                                })
                                                        :
                                                        null
                                                })
                                            */}
                                            { _.map(this.props.products, (categories_values, categories_keys) => {

                                                ////////console.log(categories_keys)
                                                ////////console.log(categories_values)

                                                return(
                                                    <Col xs="12" key={categories_keys}>
                                                        {/*<h1>{categories_keys}</h1>*/}
                                                        { _.map( categories_values, ( lots_values, lots_keys ) => {
                                                            //////console.log(lots_values)
                                                            return(
                                                                <div key={lots_keys}>
                                                                    <div className="bloc-lot">
                                                                    <div style={{marginBottom:"10px",display:"flex",alignItems:"stretch",backgroundColor:"#FFF",border:"1px solid #D9E1E8",borderRadius:"4px",boxShadow:"0px 2px 16px rgba(61, 68, 139, 0.05)"}} className="senovea-fournisseur-block">

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
                                                                            ////////console.log(prestations_values)
                                                                            return(
                                                                                <Product key={prestations_keys} product_value={prestations_values} product_key={prestations_keys} lot_key={lots_keys} mode="panier"  />
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

                    </Col>
                </Row>
            </Container>
        )
    }

}

function mapStateToProps(state, props){

    // Good panier
    const the_panier_id = props.routeProps.match.params.id;
    const the_panier = _.get( _.pick( state.paniers, [the_panier_id] ), the_panier_id, {} )

    // Panier Products
    const lots_mapKeys = _.mapKeys( the_panier.lots, ( lot ) => {
        return lot.panier_lot_id
    })
    ////////console.log('mapStateToProps')
    ////////console.log(lots_mapKeys)
    const lots_mapValues = _.mapValues( lots_mapKeys, ( lot ) => {
        return _.map( lot.panier_lot_articles, ( article ) => {
            return article.panier_article_id
        })
    })
    ////////console.log(lots_mapValues)

    // Filters Lots
    const lotsFiltered = _.mapValues( state.products, ( cat_val, cat_key ) => {
        ////////console.log(cat_val)
        ////////console.log( lots_mapValues )
        
        const filtered = _.filter(cat_val, (lot_val,lot_key)=>{
            return _.has(lots_mapValues, lot_key)
        })

        return _.isEmpty( filtered ) ? 
            {}:
            _.mapKeys( filtered, (lot_val,lot_key) =>{
                return lot_val.lot_id
            })

    } )

    // Filters Products
    let new_product = {}
    for( let cat_name in lotsFiltered ){
        if( _.isEmpty( lotsFiltered[cat_name] ) === false ){
            new_product[cat_name] = {}
            for( let lot_id in lotsFiltered[cat_name] ){
                new_product[cat_name][lot_id] = {}
                
                new_product[cat_name][lot_id].lot_id = lotsFiltered[cat_name][lot_id].lot_id
                new_product[cat_name][lot_id].lot_name = lotsFiltered[cat_name][lot_id].lot_name
                new_product[cat_name][lot_id].lot_fournisseur_r1 = lotsFiltered[cat_name][lot_id].lot_fournisseur_r1

                let products_array = []
                // Good Products 
                for( let product of lotsFiltered[cat_name][lot_id].lot_products ){

                    // Si variation empty
                    if( _.isEmpty( product.variations ) === false ){
                        for( let good_product_id of lots_mapValues[lot_id] ){
                            for( let variation of product.variations ){
                                if( parseInt(variation.variation_id) === parseInt(good_product_id) ){
                                    // ajout 
                                    products_array.push( product )
                                }
                            }
                        }
                    }else{
                        for( let good_product_id of lots_mapValues[lot_id] ){
                            if( parseInt(product.id) === parseInt(good_product_id) ){
                                // ajout 
                                products_array.push( product )
                            }
                        }
                    }

                }   

                // Add Products
                new_product[cat_name][lot_id].lot_products = products_array;

            }
        }
    }

    //////console.log(new_product)
    ////////console.log(lotsFiltered)


    // Good product 
    
    return {
        "user":state.user,
        "products":new_product,
        "panier":the_panier,
        "panierProducts":lots_mapValues,
        "paniersSettings":state.paniersSettings
    }

}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        "order_panier":order_panier,
        "add_alert":add_alert
    },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPaniersDetail)