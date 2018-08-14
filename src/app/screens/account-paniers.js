import React from "react";
import Account from "./account";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Row, Col, Container } from 'reactstrap';
import { Link } from "react-router-dom"
import _ from "lodash"
import {delete_panier} from "../actions";
import moment from "moment/moment";

const statutPanier = {
     "statut1": "À validé",
     "statut2": "En cours",
     "statut3": "Accepté",
     "statut4": "Refusé"
};

class AccountPaniers extends React.Component{

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

     optionPanierRender(statut, id){
          if(statut === statutPanier.statut2){
               return(
                   <Link to={{ pathname: `/account/paniers/${id}`}}>
                        <button className="btn-green">Valider le panier</button>
                   </Link>
               )
          } else{
               return(
                   <button className="btn-green" onClick={() => {alert("Ça marche")}}>+ d'infos</button>
               )
          }
     }

     render(){
          return(
              <Account>
                   {
                        _.isEmpty(this.props.paniers) ?
                            <div>
                                 <h3>Il n'y a aucun panier lié à votre compte</h3>
                                 <button>Créer un panier</button>
                            </div>
                            :
                            <div>
                                 {
                                      _.map( this.props.paniers, (panier) => {
                                           return (
                                               <div key={panier.id} className="bloc-panier" style={{marginBottom:"15px"}}>
                                                    <div className="header-bloc-panier">
                                                         <Container>
                                                              <Row>
                                                                   <Col md={5}>
                                                                        {this.renderPanierStatut(statutPanier.statut2)}
                                                                        {this.props.paniers !== 0 ?
                                                                            <span>Panier du <b>{moment(panier.panier_date_created).locale('fr').format('L')}</b></span> : null
                                                                        }
                                                                   </Col>
                                                                   <Col md={7}>
                                                                        <h3 style={{fontSize: "22px", textAlign: "right"}}>{panier.nicename}</h3>
                                                                   </Col>
                                                              </Row>
                                                              <Row>
                                                                   <Col sm={6}>
                                                                        {_.map( panier.lots, (lot) => {
                                                                             return(
                                                                                 <p key={lot.panier_lot_articles.panier_article_id}>
                                                                                      {lot.panier_lot_articles.length} {lot.panier_lot_articles.length > 1 ? "articles" : "article"}
                                                                                 </p>
                                                                             )
                                                                        })}
                                                                   </Col>
                                                                   <Col sm={6} className="text-right">
                                                                        {this.optionPanierRender(statutPanier.statut2, panier.id)}
                                                                   </Col>
                                                              </Row>
                                                         </Container>
                                                    </div>
                                                    <div>
                                                         <div>
                                                              <div>
                                                                   {
                                                                        _.isEmpty( panier.lots ) || panier.lots === false ?
                                                                            <div>Il n'y a aucun lot associé à ce panier</div>
                                                                            :
                                                                            _.map( panier.lots, (lot) => {
                                                                                 return(
                                                                                     <div key={`${panier.id}_${lot.panier_lot_id}`}>
                                                                                          <ul>
                                                                                               <ul>
                                                                                                    {_.isEmpty( lot.panier_lot_articles ) || lot.panier_lot_articles === false ?
                                                                                                        <li><div> Articles empty </div></li>
                                                                                                        :
                                                                                                        _.map( lot.panier_lot_articles, (article, i) => {
                                                                                                             return <li key={`${panier.id}_${lot.panier_lot_id}_${article.panier_article_id}_${i}`}><div> <strong>Article ID :</strong> {article.panier_article_id} </div></li>
                                                                                                        } )
                                                                                                    }
                                                                                               </ul>
                                                                                          </ul>
                                                                                     </div>
                                                                                 )
                                                                            } )
                                                                   }
                                                              </div>
                                                         </div>
                                                    </div>
                                               </div>
                                           )
                                      })
                                 }
                            </div>
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