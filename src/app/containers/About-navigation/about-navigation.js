import React, {Component} from 'react';

// import style
import './about-navigation.css';
import {Container, Row, Col} from 'reactstrap';

class AboutNavigation extends Component{

    constructor(props){
        super(props);
        this.state = {
            navAboutScroll : false,
        }
        this.navScrollAbout = this.navScrollAbout.bind(this)
    }

    componentDidMount() {
        window.addEventListener('scroll', this.navScrollAbout);
    }

    navScrollAbout(){
        const nav = document.querySelector("#centralisNav");
        const sticky = nav.offsetTop;

        if (window.pageYOffset > sticky) {
            this.setState({
                navAboutScroll: true
            });
        } else {
            this.setState({
                navAboutScroll: false
            });
        }
    }    
    

    render(){
         return(
             <nav id="centralisNav" onScroll={this.navScrollAbout} className={this.state.navAboutScroll === true ? "sticky-nav-fixed" : ""}>
                  <Container fluid={true}>
                       <Row>
                            <Col sm={12}>
                                 <ul>
                                      <li><a href={this.props.about}>Qui sommes-nous ?</a></li>
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
