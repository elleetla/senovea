import React, {Component} from 'react';

// import style
import './about-navigation.css';
import {Container, Row, Col} from 'reactstrap';

class AboutNavigation extends Component{
    
    constructor(props){
        super(props);
    }

    render(){
         return(
             <nav id="centralisNav">
                  <Container fluid={true}>
                       <Row>
                            <Col sm={12}>
                                 <ul>
                                      <li><a href={this.props.about.section1}>Qui sommes-nous ?</a></li>
                                      <li><a href={this.props.about.section2}>Quel est l'intérêt ?</a></li>
                                      <li><a href={this.props.about.section3}>Qui sont les fournisseurs ?</a></li>
                                      <li><a href={this.props.about.section4}>Comment ça fonctionne pour l'acheteur ?</a></li>
                                      <li><a href={this.props.about.section5}>Quel est le montant de l'adhésion ?</a></li>
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
