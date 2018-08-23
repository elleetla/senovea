import React, {Component} from "react";
import Account from "./account";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Container, Collapse } from 'reactstrap';
import { Link } from "react-router-dom";
import _ from "lodash";
import {delete_panier} from "../actions";
import moment from "moment/moment";
import Panier from '../assets/img/icon-panier.svg';

class AccountPaniers extends Component{
    
    constructor(props){
        super(props);
    }

    
    renderNotSentPanier( panier ){
        console.log("Panierrrrr à valider : ", panier);
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
                                        Panier du : <strong>{moment(panier.panier_date_created).locale('fr').format('L')}</strong>
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
                                <strong>{panier.quantity}</strong> Articles
                            </div>
                            <div>
                                Montant HT <strong>XXX</strong> $
                            </div>
                    </Col>
                    <Col md={6}>
                        <div style={{display:"flex",alignItems:"flex-end",height:"100%",justifyContent:"flex-end"}}>
                            <Link  to={{ pathname: `/compte/panier/${ panier.id }`}}>
                                <button className="btn-green float-right"> Voir le panier </button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
    
    renderSentPanier( panier ){
         console.log("Panierrrrr en cours : ", panier);
        const groupedArticlesByFournisseurs = _.groupBy( panier.products_lots , ( product ) => {
            return product.lot.lot_fournisseur_r1.ID;
        } );
        
        ////console.log( panier );

        return(
            <div key={panier.id} className="bloc-panier bloc-panier-sent">
                <Row style={{marginBottom:"30px"}}>
                    <Col md={6} className="d-flex align-items-center">
                        <div style={{display:"flex",alignItems:"center"}}>
                            <div className="statut-panier">En Cours</div>
                            { this.props.paniers !== 0 ? <span className="date-panier">Panier du : <b>{moment(panier.panier_date_created).locale('fr').format('L')}</b></span> : null }
                        </div>
                    </Col>
                    <Col md={6} className="d-flex align-items-center">
                        <h3 className="title-panier">{panier.nicename}</h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={8} className="d-flex align-items-center">
                        <ul className="list-infos-panier">
                            <li><b>6</b> Articles</li>
                            <li>Montant Total HT <b>7000</b> €</li>
                        </ul>
                    </Col>
                    <Col md={4}>
                         <button className="btn-green float-right">+ d'infos</button>
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
        return(
            <Account>   
            <Container>
            {
                _.isEmpty(this.props.paniers) ?
                <div style={{textAlign: "center"}} className="bloc-panier">
                    <div className="header-bloc-panier">
                        <img height="auto" style={{width: "50px", marginBottom: "30px"}} src={Panier} alt="Icon Panier"/>
                        <h4>Il n'y a aucun panier lié à votre compte</h4>
                    </div>
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