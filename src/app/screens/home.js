import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import Filters from '../containers/Filters/Filters';
import CreatePanier from '../containers/Create-panier/Create-panier';
import Products from './products';

// Actions
import { call_product } from '../actions/index';

// import grid Bootstrap
import {
    Container,
    Row,
    Col,
    Collapse,
    Button,
    CardBody,
    Card } from 'reactstrap';
import LoadingSvg from '../assets/img/icon-preloader.svg';
import PictoUser from '../assets/img/picto_user.svg';

class Home extends Component{

    constructor(props) {
        super(props);

        this.state = {
            collapse: false
        }

        this.toggle = this.toggle.bind(this);
    }
    toggle(){
        this.setState({ collapse: !this.state.collapse });
    }
    render() {

        console.log("HOME")
        console.log(this);

        return(
            <div>
                <Filters/>
                    { this.props.user.user_auth.auth_token === '' && this.props.user.user_auth.isAuth === false ? 
                        <div>
                            <Container>
                                <Row className="mt-5 mb-5">
                                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                                        <div className="connect-bloc">
                                            <img src={PictoUser} className="picto-user"/>
                                            <p className="title-connect-bloc">Veuillez vous connecter ou créer un compte pour faire une recherche</p>
                                            <ul>
                                                <li><a href="javascript:void(0)">Connexion</a></li>
                                                <li><a href="javascript:void(0)">Inscription</a></li>
                                            </ul>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div> 
                        :
                        <div>
                            <CreatePanier/>
                            <Products/>
                        </div>
                    }
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        "products": state.products,
        "user": state.user
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        "call_product":call_product
    },dispatch)
}
// export
export default connect(mapStateToProps, mapDispatchToProps)(Home)