import React from "react"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash"
import Product from "./product"

import { Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Container, Row, Col } from 'reactstrap';
class AccountPaniersDetail extends React.Component{

    constructor(props){
        super(props)

    }

    render(){

        console.log(this);
        console.log(this.props.products)

        return(
            <Container>
                <Row style={{marginTop:"50px", marginBottom:"50px"}}>
                    <Col md="12">
                        <Row>
                            <Col md="12">
                                <Card body>
                                    <h1> { this.props.panier.nicename } </h1>
                                    <h4> { this.props.panier.status } </h4>
                                    <div>
                                        <div>
                                            [panier date]
                                        </div>
                                        <div>
                                            [panier nb article]
                                        </div>
                                        <div>
                                            [panier total price]
                                        </div>
                                    </div>
                                    <Button> valider/envoyer le panier </Button>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{marginTop:"50px", marginBottom:"50px"}}>
                    <Col md="12">
                        <Row>
                            <Col md="3">
                                <div>
                                    <Button> annuler/supprimer panier </Button>
                                </div>
                            </Col>
                            <Col md="3">
                                <div>
                                    <Button> ajouter au panier </Button>
                                </div>
                            </Col>
                            <Col md="3">
                                <div>
                                    <Button> sauvegarder le panier </Button>
                                </div>
                            </Col>
                            <Col md="3">
                                <div>
                                    <Button> imprimer le panier </Button>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <hr/>
                <Row style={{marginTop:"50px", marginBottom:"50px"}}>
                    <Col md="12">
                        <form>
                        <Row>
                            
                            <Col md="6">
                                <div>
                                    <h4> Adresse du lieu d'intervention </h4>
                                    <div>
                                        <label> Code Postal </label>
                                        <input type="text" placeholder="Code Postal" />
                                    </div>
                                    <div>
                                        <label> Code Arrondissement </label>
                                        <input type="text" placeholder="Code Arrondissement" />
                                    </div>
                                    <div>
                                        <label> Ville </label>
                                        <input type="text" placeholder="Ville" />
                                    </div>
                                    <div>
                                        <label> Adresse </label>
                                        <input type="text" placeholder="Adresse" />
                                    </div>
                                </div>
                            </Col>
                            <Col md="6">
                                <div>
                                    <h4> Message à l'attention du fournisseur </h4>
                                    <div>
                                        <label> Message </label>
                                        <textarea defaultValue="message" /> 
                                    </div>
                                    <div>
                                        <button> Sauvegarder Détail </button>
                                    </div>
                                </div>
                            </Col>
                           
                        </Row>
                        </form>
                    </Col>
                </Row>
                <hr/>
                <Row style={{marginTop:"50px", marginBottom:"50px"}}>
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
                                            {/*
                                                _.map(this.props.products, (categories_values, categories_keys) => {
                                                    //console.log(categories_keys)
                                                    //console.log(categories_values)
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
                                                                                                        //console.log(parseInt( product_key ))
                                                                                                        //console.log(parseInt(prestations_values.id))

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

                                                //console.log(categories_keys)
                                                //console.log(categories_values)

                                                return(
                                                    <Col xs="12" key={categories_keys}>
                                                        <h1>{categories_keys}</h1>
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
                <hr/>
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
    //console.log('mapStateToProps')
    //console.log(lots_mapKeys)
    const lots_mapValues = _.mapValues( lots_mapKeys, ( lot ) => {
        return _.map( lot.panier_lot_articles, ( article ) => {
            return article.panier_article_id
        })
    })
    //console.log(lots_mapValues)

    // Filters Lots
    const lotsFiltered = _.mapValues( state.products, ( cat_val, cat_key ) => {
        //console.log(cat_val)
        //console.log( lots_mapValues )
        
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

    console.log(new_product)
    //console.log(lotsFiltered)


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

    },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPaniersDetail)