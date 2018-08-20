import React, { Component } from 'react';

// import styles
import {Container, Row, Col} from 'reactstrap';

// import component centralis
import Banner from '../containers/Banner/Banner';
import AboutNavigation from '../containers/About-navigation/about-navigation';

export class About extends Component{
    render(){
        return(
            <div>
                 <Banner titleBanner="Présentation"/>
                 <AboutNavigation/>
                 <Container>
                     <Row>
                         <Col sm={12} className="mb-4 mt-4">
                              <p>
                                   « Les acheteurs qui recourent à une centrale d'achat pour la réalisation de travaux ou l'acquisition de fournitures ou de services sont
                                   considérés comme ayant respecté leurs obligations de publicité et de mise en concurrence. »
                                   (Art. 26 de l'Ordonnance n° 2015-899 du 23 juillet 2015)
                              </p>
                         </Col>
                     </Row>

                      <Row>
                           <Col sm={8}>
                                <h3>Qui sommes-nous ?</h3>
                                <p>Centralis® est une centrale d’achat public dédiée aux prestations d’ingénierie et de travaux.</p>
                                <p>Il s’agit d’une association loi 1901 à but non lucratif, dont chaque acheteur est membre.</p>
                           </Col>
                           <Col sm={4}>
                                <img src="https://via.placeholder.com/350x400" alt=""/>
                           </Col>
                      </Row>
                 </Container>
            </div>
        )
    }
}