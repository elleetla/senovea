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
import arrowPanier from '../assets/img/arrow-product.svg';

class AccountPaniers extends Component{
    
    constructor(props){
        super(props);
        this.renderBlocDetails = this.renderBlocDetails.bind(this);
    }

    renderBlocDetails(value){
        const blocPanier = document.querySelector(`#c${value}`);
        blocPanier.style.display = (blocPanier.style.display == 'block') ? 'none' : 'block';
    }

    renderNotSentPanier( panier ){
        return(
            <div key={panier.id} className="bloc-panier">
                <Row style={{marginBottom:"15px"}}>
                    <Col md={6}>
                        <div style={{display:"flex",alignItems:"center"}}>
                            <div className="statut-panier">À validé</div>
                            <div>
                                {
                                    this.props.paniers !== 0 ?
                                    <span>Panier du : <strong>{moment(panier.panier_date_created).locale('fr').format('L')}</strong></span>
                                    : null
                                }
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <h3 style={{fontSize: "22px", textAlign: "right"}}>{panier.nicename}</h3>
                    </Col>
                </Row>
                <Row>
                     <Col md={6} className="d-flex align-items-center">
                          <ul className="list-infos-panier">
                               <li><b  style={{color: "#2C3948"}}>{panier.quantity}</b> {panier.quantity > 1 ? 'articles' : 'article'}</li>
                               <li>Montant Total HT <b  style={{color: "#2C3948"}}>{panier.price.toFixed(2)}</b> €</li>
                          </ul>
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

    detailsCard (articlesSupplier, cardId) {
        return (
            <div id={'c'+cardId} className="bloc-panier-table">
                <div className="bloc-panier-header">
                    <div>N°Bon De Commande</div>
                    <div>Statut</div>
                    <div className="bloc-panier-header-lot">Lot</div>
                    <div>Nbr D'Articles</div>  
                    <div>Fournisseur</div>  
                    <div>Total HT</div>  
                    <div>Lien</div>
                </div>
                <div className="bloc-panier-content">
            
                    {_.map( articlesSupplier , ( articles, indexF ) => {
                        const groupedArticlesByLot = _.groupBy( articles , ( article ) => article.lot.lot_id);
                        return (
                            <div key={indexF} >
                                {_.map( groupedArticlesByLot , ( articles, index ) => {
                                    
                                    const global_lot = {
                                        "lot_id":articles[0].lot.lot_id,
                                        "lot_name":articles[0].lot.lot_name,
                                        "lot_fournisseur_r1":articles[0].lot.lot_fournisseur_r1.user_nicename
                                    }

                                    return (
                                        <div key={index} className="bloc-panier-content-lot">
                                            <div className="bloc-panier-content-lot-header">
                                                <div>
                                                    {articles[0].attributes[0].attr_value[0]}-
                                                    {articles[0].attributes[1].attr_value[0]}-
                                                    {articles[0].attributes[2].attr_value[0]}-
                                                    {articles[0].attributes[3].attr_value[0]}
                                                </div>
                                                <div>
                                                </div>
                                                <div className="bloc-panier-content-lot-header-lot">{ global_lot.lot_name } </div>    
                                                <div>{articles[0].quantity}</div>
                                                <div>{ global_lot.lot_fournisseur_r1 }</div>
                                                <div>{articles[0].price} €</div>
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
                                                })}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>       
                        )
                    })}
                </div>
            </div>
        )
    }
    
    renderSentPanier( panier ){
        const groupedArticlesByFournisseurs = _.groupBy( panier.products_lots , ( product ) => product.lot.lot_fournisseur_r1.ID);
        return(
            <div>
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
                                <li><b>{panier.quantity}</b> {panier.quantity > 1 ? 'articles' : 'article'}</li>
                                <li>Montant Total HT <b>{panier.price.toFixed(2)}</b> €</li>
                            </ul>
                        </Col>
                        <Col md={4}>
                             <button onClick={() => this.renderBlocDetails()} className="arrow">
                                  <img src={arrowPanier} alt="flèche produit"/>
                             </button>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Col md={12}>
                        {!_.isEmpty( groupedArticlesByFournisseurs ) ? this.detailsCard(groupedArticlesByFournisseurs, panier.id) : null }
                    </Col>
                </Row>
            </div>
        )
        
    }
    
    render(){
        return(
            <Account>
                {
                    _.isEmpty(this.props.paniers) ?
                        <div style={{textAlign: "center"}} className="bloc-panier">
                            <div className="header-bloc-panier">
                                <img height="auto" style={{width: "50px", marginBottom: "30px"}} src={Panier} alt="Icon Panier"/>
                                <h4>Il n'y a aucun panier lié à votre compte</h4>
                            </div>
                        </div>
                    :
                        _.map( this.props.paniers, panier => panier.status === "sended" ? this.renderSentPanier( panier ) : this.renderNotSentPanier( panier ))
                }
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