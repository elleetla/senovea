import React, { Component } from 'react';

// import styles
import {Row, Col, Table} from 'reactstrap';

// import component centralis
import Banner from '../containers/Banner/Banner';
import AboutNavigation from '../containers/About-navigation/about-navigation';
import {urlApi} from '../../../config/config-api';

export class About extends Component{
    render(){
        return(
            <div>
                 <Banner titleBanner="Présentation"/>
                 <AboutNavigation about={"#qui-sommes-nous"}/>
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

                 <section id="qui-sommes-nous" className="container section-bloc-about">
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

                 <section className="container section-bloc-about">
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

                 <section className="container section-bloc-about">
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

                 <section className="container section-bloc-about">
                      <Row className="bloc-about">
                           <Col sm={4} className="p-0 content-bloc-img">
                                <img className="img-fluid" src={`${urlApi}/wp-content/uploads/2018/08/acheteur-centralis.jpg`} alt=""/>
                           </Col>
                           <Col sm={8} className="align-self-center content-bloc">
                                <h3>Comment ça fonctionne pour l’acheteur ?</h3>
                                <ul className="list-section-about">
                                     <li>
                                          <span className="icon-list-about">1</span>
                                          Si vous n’êtes pas déjà adhérent, <a href="#">téléchargez le formulaire d’adhésion
                                          à compléter</a> et <a href="#">inscrivez-vous en ligne</a>.
                                          <br/>
                                          <br/>
                                          Le mot de passe sera envoyé rapidement dès validation de votre
                                          inscription par Centralis®.
                                     </li>
                                     <li>
                                          <span className="icon-list-about">2</span>
                                          Précisez le lieu des travaux, sélectionnez les prestations qui vous
                                          intéressent et validez votre panier.
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

                 <section className="container section-bloc-about">
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
                                               <td>500 €</td>
                                               <td>Moins de 1 000</td>
                                               <td>1</td>
                                          </tr>
                                          <tr>
                                               <td>1000 €</td>
                                               <td>1 001 à 2 000</td>
                                               <td>2</td>
                                          </tr>
                                          <tr>
                                               <td>5000 €</td>
                                               <td>2 001 à 3 000</td>
                                               <td>3</td>
                                          </tr>
                                          <tr>
                                               <td>10 000 €</td>
                                               <td>3 001 à 5 000</td>
                                               <td>4</td>
                                          </tr>
                                          <tr>
                                               <td>15 000 €</td>
                                               <td>5 001 à 10 000</td>
                                               <td>5 à 10</td>
                                          </tr>
                                          <tr>
                                               <td>20 000 €</td>
                                               <td>10 001 à 20 000</td>
                                               <td>11 à 20</td>
                                          </tr>
                                          <tr>
                                               <td>25 000 €</td>
                                               <td>20 001 à 50 000</td>
                                               <td>21 à 50</td>
                                          </tr>
                                          <tr>
                                               <td>30 000 €</td>
                                               <td>50 001 à 100 000</td>
                                               <td>51 à 100</td>
                                          </tr>
                                          <tr>
                                               <td>35 000 €</td>
                                               <td>Plus de 100 000</td>
                                               <td>Plus de 100</td>
                                          </tr>
                                     </tbody>
                                </Table>
                           </Col>
                           <Col sm={4} className="p-0 content-bloc-img">
                                <img className="img-fluid" src={`${urlApi}/wp-content/uploads/2018/08/adhesion-centralis.jpg`} alt=""/>
                           </Col>
                      </Row>
                 </section>
            </div>
        )
    }
}