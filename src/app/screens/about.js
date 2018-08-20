import React, { Component } from 'react';

// import styles
import {Row, Col} from 'reactstrap';

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

                 <section id="qui-sommes-nous" className="mb-5 container">
                      <Row className="bloc-about">
                           <Col sm={8} className="align-self-center">
                                <h3>Qui sommes-nous ?</h3>
                                <p>Centralis® est une centrale d’achat public dédiée aux prestations d’ingénierie et de travaux.</p>
                                <p>Il s’agit d’une association loi 1901 à but non lucratif, dont chaque acheteur est membre.</p>
                           </Col>
                           <Col sm={4} className="p-0">
                                <img className="img-fluid" src={`${urlApi}/wp-content/uploads/2018/08/about-picture-1.jpg`} alt=""/>
                           </Col>
                      </Row>
                 </section>

                 <section id="qui-sommes-nous" className="mb-5 container">
                      <Row className="bloc-about">
                           <Col sm={4} className="p-0">
                                <img className="img-fluid" src={`${urlApi}/wp-content/uploads/2018/08/chateau_chantier@2x.jpg`} alt=""/>
                           </Col>
                           <Col sm={8} className="align-self-center">
                                <h3>Quel est l’intérêt ?</h3>
                                <p>En devenant adhérent, l’acheteur dispose de coûts de prestations avantageux
                                     et gagne du temps pour ses projets car il est considéré comme ayant respecté
                                     ses obligations de publicité et de mise en concurrence</p>
                                <p>Les entreprises titulaires des marchés sont déjà  retenues dans le respect
                                     des marchés publics et les commandes s’effectuent sur un catalogue en ligne.</p>
                                <p>La centrale permet de commander diverses prestations permettant la rénovation et l’entretien de patrimoine.</p>
                                <p>Exemple : des m2 de chaussées, de peinture, d’isolants… mais également des jours de bureaux d’études spécialisés.</p>
                                <p>Les prix varient en fonction des quantités commandées.</p>
                           </Col>
                      </Row>
                 </section>

                 <section id="qui-sommes-nous" className="mb-5 container">
                      <Row className="bloc-about">
                           <Col sm={8} className="align-self-center">
                                <h3>Qui sommes-nous ?</h3>
                                <p>Centralis® est une centrale d’achat public dédiée aux prestations d’ingénierie et de travaux.</p>
                                <p>Il s’agit d’une association loi 1901 à but non lucratif, dont chaque acheteur est membre.</p>
                           </Col>
                           <Col sm={4} className="p-0">
                                <img className="img-fluid" src={`${urlApi}/wp-content/uploads/2018/08/femme_centralis@2x.jpg`} alt=""/>
                           </Col>
                      </Row>
                 </section>
            </div>
        )
    }
}