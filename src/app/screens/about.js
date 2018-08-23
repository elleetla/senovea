import React, { Component } from 'react';

// import styles
import {Row, Col, Table} from 'reactstrap';

// import component centralis
import Banner from '../containers/Banner/Banner';
import AboutNavigation from '../containers/About-navigation/about-navigation';
import { urlApi } from '../../../config/config-api';
import { update_modal_settings, pageAbout } from "../actions";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

class About extends Component{

     constructor(props){
          super(props);
          this.handleModalToggle = this.handleModalToggle.bind(this);

          this.state = {
               modalRegistration: false,
          };
     }

     componentWillMount(){
          this.props.pageAbout();
     }

     handleModalToggle(component){
          const modalSize = component === "register" ? "big" : "medium";
          this.props.update_modal_settings({
               "isOpen": true,
               "title": component,
               "component": component,
               "size": modalSize
          });
     }

     render(){
          console.log(this.props.aboutPage.section_about !== undefined ? this.props.aboutPage : null);
          return(
              <div>
                   <Banner titleBanner="Présentation"/>

                   <AboutNavigation about={
                        {
                             "section1" : "#section1",
                             "section2" : "#section2",
                             "section3" : "#section3",
                             "section4" : "#section4",
                             "section5" : "#section5"
                        }
                   }/>

                   <section className="container">
                        <Row>
                             <Col sm={12} className="mb-4 mt-4">
                                  <p>
                                       « Les acheteurs qui recourent à une centrale d'achat pour la réalisation de travaux ou l'acquisition de fournitures ou de services sont
                                       considérés comme ayant respecté leurs obligations de publicité et de mise en concurrence. »
                                       (Art. 26 de l'Ordonnance n° 2015-899 du 23 juillet 2015)
                                  </p>
                             </Col>
                        </Row>
                   </section>

                   <section id="section1" className="container section-bloc-about">
                        <Row className="bloc-about">
                             <Col sm={8} className="align-self-center content-bloc">
                                  <h3>Qui sommes-nous ?</h3>
                                  <p>Centralis® est une centrale d’achat public dédiée aux prestations d’ingénierie et de travaux.</p>
                                  <p className="mb-0">Il s’agit d’une association loi 1901 à but non lucratif, dont chaque acheteur est membre.</p>
                             </Col>
                             <Col sm={4} className="p-0">
                                  <img className="img-fluid" src={`${urlApi}/wp-content/uploads/2018/08/about-picture-1.jpg`} alt=""/>
                             </Col>
                        </Row>
                   </section>

                   <section id="section2" className="container section-bloc-about">
                        <Row className="bloc-about">
                             <Col sm={4} className="p-0 content-bloc-img">
                                  <img className="img-fluid" src={`${urlApi}/wp-content/uploads/2018/08/chateau_chantier@2x.jpg`} alt=""/>
                             </Col>
                             <Col sm={8} className="align-self-center content-bloc">
                                  <h3>Quel est l’intérêt ?</h3>
                                  <p>En devenant adhérent, l’acheteur dispose de <strong>coûts de prestations avantageux
                                       et gagne du temps</strong> pour ses projets car <strong>il est considéré comme ayant respecté
                                       ses obligations de publicité et de mise en concurrence</strong></p>
                                  <p>Les entreprises titulaires des marchés sont déjà  retenues dans le respect
                                       des marchés publics et les commandes s’effectuent sur <strong>un catalogue en ligne</strong>.</p>
                                  <p>La centrale permet de commander diverses prestations permettant <strong>la rénovation et l’entretien de patrimoine</strong>.</p>
                                  <p>Exemple : des m2 de chaussées, de peinture, d’isolants… mais également des jours de bureaux d’études spécialisés.</p>
                                  <p className="mb-0">Les prix varient en fonction des quantités commandées.</p>
                             </Col>
                        </Row>
                   </section>

                   <section id="section3" className="container section-bloc-about">
                        <Row className="bloc-about">
                             <Col sm={8} className="align-self-center content-bloc">
                                  <h3>Qui sont les fournisseurs ?</h3>
                                  <p>En moyenne, les entreprises référencées sont situées à moins d’une heure du
                                       chantier de l’acheteur car le maillage géographique de nos marchés correspond <strong>aux arrondissements</strong> de l’échelle départementale. </p>
                                  <p className="mb-0">Les entreprises sont sélectionnées selon des critères strictes
                                       tels que les compétences et les moyens alloués.</p>
                             </Col>
                             <Col sm={4} className="p-0 content-bloc-img">
                                  <img className="img-fluid" src={`${urlApi}/wp-content/uploads/2018/08/femme_centralis@2x.jpg`} alt=""/>
                             </Col>
                        </Row>
                   </section>

                   <section id="section4" className="container section-bloc-about">
                        <Row className="bloc-about">
                             <Col sm={4} className="p-0 content-bloc-img">
                                  <img className="img-fluid" src={`${urlApi}/wp-content/uploads/2018/08/acheteur-centralis.jpg`} alt=""/>
                             </Col>
                             <Col sm={8} className="align-self-center content-bloc">
                                  <h3>Comment ça fonctionne pour l’acheteur ?</h3>
                                  <ul className="list-section-about">
                                       <li>
                                            <span className="icon-list-about">1</span>
                                            Si vous n’êtes pas déjà adhérent, <a className="link-bloc-about" href={`${urlApi}/wp-content/uploads/2018/08/bulletin-adhesion.pdf`} target="_blank">téléchargez le bulletin d’adhésion
                                            à compléter</a> et <a className="link-bloc-about" onClick={()=>{this.handleModalToggle('register')}}>inscrivez-vous en ligne</a>.
                                            <br/>
                                            <br/>
                                            Le mot de passe sera envoyé rapidement dès validation de votre inscription par Centralis®.
                                       </li>
                                       <li>
                                            <span className="icon-list-about">2</span>
                                            Précisez le lieu des travaux, sélectionnez les prestations qui vous intéressent et validez votre panier.
                                       </li>
                                       <li>
                                            <span className="icon-list-about">3</span>
                                            Dès validation du panier, la centrale envoie les bons de commande
                                            aux différentes entreprises concernées qui disposent de quelques
                                            jours pour accuser réception et prendre contact avec vous.</li>
                                       <li>
                                            <span className="icon-list-about">4</span>
                                            Les entreprises interviennent dans le cadre contractuel et vous
                                            facturent directement leurs prestations conformément à la commande,
                                            sans autres frais de commission.
                                       </li>
                                  </ul>
                             </Col>
                        </Row>
                   </section>

                   <section id="section5" className="container section-bloc-about">
                        <Row className="bloc-about">
                             <Col sm={8} className="align-self-center content-bloc">
                                  <h3>Quel est le montant de l’adhésion ?</h3>
                                  <Table size="sm" className="text-center" striped>
                                       <thead>
                                       <tr>
                                            <th>Adhésion annuelle</th>
                                            <th>Pour les collectivités<br/>(en habitants)</th>
                                            <th>Pour les autres organismes<br/>(en salariés)</th>
                                       </tr>
                                       </thead>
                                       <tbody>
                                       <tr>
                                            <td><strong>500 €</strong></td>
                                            <td><strong>Moins de 1 000</strong></td>
                                            <td><strong>1</strong></td>
                                       </tr>
                                       <tr>
                                            <td>1000 €</td>
                                            <td>1 001 à 2 000</td>
                                            <td>2</td>
                                       </tr>
                                       <tr>
                                            <td><strong>5000 €</strong></td>
                                            <td><strong>2 001 à 3 000</strong></td>
                                            <td><strong>3</strong></td>
                                       </tr>
                                       <tr>
                                            <td>10 000 €</td>
                                            <td>3 001 à 5 000</td>
                                            <td>4</td>
                                       </tr>
                                       <tr>
                                            <td><strong>15 000 €</strong></td>
                                            <td><strong>5 001 à 10 000</strong></td>
                                            <td><strong>5 à 10</strong></td>
                                       </tr>
                                       <tr>
                                            <td>20 000 €</td>
                                            <td>10 001 à 20 000</td>
                                            <td>11 à 20</td>
                                       </tr>
                                       <tr>
                                            <td><strong>25 000 €</strong></td>
                                            <td><strong>20 001 à 50 000</strong></td>
                                            <td><strong>21 à 50</strong></td>
                                       </tr>
                                       <tr>
                                            <td>30 000 €</td>
                                            <td>50 001 à 100 000</td>
                                            <td>51 à 100</td>
                                       </tr>
                                       <tr>
                                            <td><strong>35 000 €</strong></td>
                                            <td><strong>Plus de 100 000</strong></td>
                                            <td><strong>Plus de 100</strong></td>
                                       </tr>
                                       </tbody>
                                  </Table>
                             </Col>
                             <Col sm={4} className="p-0 content-bloc-img">
                                  <img className="img-fluid" src={`${urlApi}/wp-content/uploads/2018/08/adhesion-centralis.jpg`} alt=""/>
                             </Col>
                        </Row>
                   </section>

                   <section id="section5" className="container section-bloc-about" style={{marginBottom: "100px"}}>
                        <Row>
                             <Col sm={12}>
                                  <button className="btn-green" onClick={() => {this.handleModalToggle('register')}}>Inscrivez-vous !</button>
                             </Col>
                        </Row>
                   </section>
              </div>
          )
     }
}

function mapStateToProps(state){
     return {
          "aboutPage": state.aboutPage
     }
}

function mapDispatchToProps(dispatch){
     return bindActionCreators({
          "update_modal_settings":update_modal_settings,
          "pageAbout": pageAbout
     }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(About);