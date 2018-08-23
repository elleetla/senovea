import React, {Component} from "react";
import Account from "./account";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Container, Collapse } from 'reactstrap';
import { Link } from "react-router-dom";
import _ from "lodash";
import {delete_panier} from "../actions";
import moment from "moment/moment";

class AccountPaniers extends Component{
    
    constructor(props){
        super(props);
    }
    
    renderPanierStatut(statut){
        switch (statut){
            case "À validé": {
                return <span className="statut-panier">À validé</span>
            }
            case "En cours": {
                return <span className="statut-panier">En cours</span>
            }
            case "Accepté": {
                return <span className="statut-panier">Accepté</span>
            }
            case "Refusé": {
                return <span className="statut-panier">Refusé</span>
            }
            default:
            return null
        }
    }
    
    detailPanier(statut, id){
        if(statut === statutPanier.statut2){
            return(
                <Link to={{ pathname: `/account/paniers/${id}`}}>
                <button className="btn-green float-right">Voir le panier</button>
                </Link>
            )
        } else{
            return(
                <button className="btn-green float-right" onClick={this.toggle}>+ d'infos</button>
            )
        }
    }
    
    renderNotSentPanier( panier ){
        
        //console.log( panier );
        
        return(
            <div key={panier.id} className="bloc-panier">
                <Row style={{marginBottom:"15px"}}>
                    <Col md={6}>
                        <div style={{display:"flex",alignItems:"center"}}>
                            <div className="statut-panier">À validé</div>
                            <div>
                                {
                                    this.props.paniers !== 0 ?
                                    <span>
                                        Panier du : 
                                        <strong>
                                            {moment(panier.panier_date_created).locale('fr').format('L')}
                                        </strong>
                                    </span>
                                    : 
                                    null
                                }
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <h3 style={{fontSize: "22px", textAlign: "right"}}>{panier.nicename}</h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                            <div>
                                <strong>XX</strong> Articles
                            </div>
                            <div>
                                Montant HT <strong>XXX</strong> $
                            </div>
                    </Col>
                    <Col md={6}>
                        <div style={{display:"flex",alignItems:"flex-end",height:"100%",justifyContent:"flex-end"}}>
                            <Link style={{textAlign:"right"}} to={{ pathname: `/account/paniers/${ panier.id }`}}>
                                <button className="btn-green float-right"> Voir le panier </button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </div>
        )
        
    }
    
    renderSentPanier( panier ){

        const groupedArticlesByFournisseurs = _.groupBy( panier.products_lots , ( product ) => {
            return product.lot.lot_fournisseur_r1.ID;
        } );
        
        ////console.log( panier );

        return(
            <div key={panier.id} className="bloc-panier bloc-panier-sent">
                <Row style={{marginBottom:"15px"}}>
                    <Col md={6}>
                        <div style={{display:"flex",alignItems:"center"}}>
                            <div className="statut-panier">En Cours</div>
                            <div>
                                {
                                    this.props.paniers !== 0 ?
                                    <span>
                                        Panier du : 
                                        <strong>
                                            {moment(panier.panier_date_created).locale('fr').format('L')}
                                        </strong>
                                    </span>
                                    : 
                                    null
                                }
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <h3 style={{fontSize: "22px", textAlign: "right"}}>{panier.nicename}</h3>
                    </Col>
                </Row>
                <Row style={{marginBottom:"15px"}}>
                    <Col md={12}>
                        <div>
                            <strong>XX</strong> Articles
                        </div>
                        <div>
                            Montant HT <strong>XXX</strong> $
                        </div>
                    </Col>
                </Row>
                <Row>

                                <Col md={12}>

                                    {
                                        !_.isEmpty( groupedArticlesByFournisseurs ) ?

                                        <div className="bloc-panier-table">
                                            <div className="bloc-panier-header">
                                                <div>
                                                    N°Bon De Commande
                                                </div>
                                                <div>
                                                    Statut
                                                </div>
                                                <div className="bloc-panier-header-lot">
                                                    Lot
                                                </div>
                                                <div>
                                                    Nbr D'Articles
                                                </div>  
                                                <div>
                                                    Fournisseur
                                                </div>  
                                                <div>
                                                    Total HT
                                                </div>  
                                                <div>
                                                    Lien
                                                </div>  
                                            </div>
                                            <div className="bloc-panier-content">
                                        
                                        {_.map( groupedArticlesByFournisseurs , ( articles, indexF ) => {
                                            const groupedArticlesByLot = _.groupBy( articles , ( article ) => {
                                                return article.lot.lot_id;
                                            })
                                            console.log( groupedArticlesByLot )
                                            return (
                                                <div key={indexF} >
                                                    {_.map( groupedArticlesByLot , ( articles, indexL ) => {
                                                        ////console.log("articles")
                                                        ////console.log(articles)

                                                        const global_lot = {

                                                            "lot_id":articles[0].lot.lot_id,
                                                            "lot_name":articles[0].lot.lot_name,
                                                            "lot_fournisseur_r1":articles[0].lot.lot_fournisseur_r1,

                                                        }

                                                        return (
                                                            <div key={indexL} className="bloc-panier-content-lot">
                                                                <div className="bloc-panier-content-lot-header">
                                                                    <div>
                                                                    </div>
                                                                    <div>

                                                                    </div>
                                                                    <div className="bloc-panier-content-lot-header-lot">
                                                                        { global_lot.lot_name } 
                                                                    </div>
                                                                        
                                                                    <div>
                                                                        { articles.length }
                                                                    </div>
                                                                    <div>
                                                                    </div>
                                                                    <div>
                                                                    </div>
                                                                    <div>
                                                                    </div>
                                                                </div>
                                                                <div className="bloc-panier-content-lot-content">

                                                                        {_.map( articles , ( article , indexA ) => {
                                                                            return(
                                                                                <div key={indexA} >
                                                                                    <p>article</p>
                                                                                </div>
                                                                            )
                                                                        } )}
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>       
                                            )
                                        })}

                                            </div>
                                        </div>

                                        :

                                        null

                                    }

                                </Col>

                </Row>
            </div>
        )
        
    }
    
    render(){
        
        //console.log( "compte paniers" )
        //console.log( this.props )
        
        return(
            <Account>   
            <Container>
            {
                _.isEmpty(this.props.paniers) ?
                <div style={{textAlign: "center"}}>
                    <h3>Il n'y a aucun panier lié à votre compte</h3>
                </div>
                :
                
                _.map( this.props.paniers, (panier) => {
                    return panier.status === "sended" ? this.renderSentPanier( panier ) : this.renderNotSentPanier( panier )
                })   
            }
            </Container>
            </Account>
        )
        
    }
}

function mapStateToProps(state){
    return {
        "paniers":state.paniers,
        "deletePanier": state.deletePanier
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        deletePanier: delete_panier()
    },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPaniers)