import React from "react"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash"


import { Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Container, Row, Col } from 'reactstrap';
class AccountPaniersDetail extends React.Component{

    constructor(props){
        super(props)

    }

    render(){

        console.log(this);

        return(
            <Container>
                 <hr/>
                <Row style={{marginTop:"50px", marginBottom:"50px"}}>
                    <Col md="12">
                        <Row>
                            <Col md="4">
                                <div>
                                    [panier date]
                                </div>
                                <div>
                                    [panier nb article]
                                </div>
                                <div>
                                    [panier total price]
                                </div>
                            </Col>
                            <Col md="4">
                                <div>
                                    [panier nice name]
                                </div>
                            </Col>
                            <Col md="4">
                                <div>
                                    <button> valider le panier </button>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <hr/>
                <Row style={{marginTop:"50px", marginBottom:"50px"}}>
                    <Col md="12">
                        <Row>
                            <Col md="3">
                                <div>
                                    <button> annuler panier </button>
                                </div>
                            </Col>
                            <Col md="3">
                                <div>
                                    <button> ajouter au panier </button>
                                </div>
                            </Col>
                            <Col md="3">
                                <div>
                                    <button> sauvegarder le panier </button>
                                </div>
                            </Col>
                            <Col md="3">
                                <div>
                                    <button> imprimer le panier </button>
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

                        { 
                            null
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

    // Good Products
    const lots_mapKeys = _.mapKeys( the_panier.lots, ( lot ) => {
        return lot.panier_lot_id
    })
    const lots_mapValues = _.mapValues( lots_mapKeys, ( lot ) => {
        return _.map( lot.panier_lot_articles, ( article ) => {
            return article.panier_article_id
        })
    })

    console.log(lots_mapValues);

    // Good product 
    
    return {
        "user":state.user,
        "products":state.products,
        "panier":the_panier,
        "paniersSettings":state.paniersSettings
    }

}

function mapDispatchToProps(dispatch){
    return bindActionCreators({

    },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPaniersDetail)