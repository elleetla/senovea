import React, {Component} from 'react';

// import style
import './about-navigation.css';
import {Container, Row, Col} from 'reactstrap';

class AboutNavigation extends Component{

    constructor(props){
        super(props);
        this.state = {
            heightPage: 0
       };
    }

    componentDidMount(){
        return window.addEventListener("scroll", this.handleScroll.bind(this))
    }
    
    componentWillMount() {
        return window.removeEventListener('scroll', this.handleScroll.bind(this))
    }

    handleScroll(){
        const heightPage = window.pageYOffset
        const nav = document.querySelector("#centralisNav");
        const sticky = nav.offsetTop;

        if(heightPage >= sticky){
            nav.classList.add("nav-sticky");
            nav.style.top = nav.clientHeight + "px" - (2) + "px";
        } else{
            nav.classList.remove("nav-sticky");
        }
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
