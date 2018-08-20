import React, {Component} from 'react';

// import style
import './about-navigation.css';
import {Container, Row, Col} from 'reactstrap';

class AboutNavigation extends Component{
     render(){
          return(
              <nav className="about-nav">
                   <Container fluid={true}>
                        <Row>
                             <Col sm={12}>
                                  <ul>
                                       <li><a href="#">Qui sommes-nous ?</a></li>
                                       <li><a href="#">Quel est l'intérêt ?</a></li>
                                       <li><a href="#">Qui sont les fournisseurs ?</a></li>
                                       <li><a href="#">Comment ça fonctionne pour l'acheteur ?</a></li>
                                       <li><a href="#">Quel est le montant de l'adhésion ?</a></li>
                                  </ul>
                             </Col>
                        </Row>
                   </Container>
              </nav>
          )
     }
}

// export class
export default AboutNavigation;
