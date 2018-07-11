import React, { Component } from 'react';

// import style
import './Filters.css';
import { Container, Row, Col, FormGroup, Input } from 'reactstrap';
import {connect} from "react-redux";
import { update_modal_settings } from '../../actions/index';
import iconSearch from '../../assets/img/icon_search.svg';
import { bindActionCreators } from "redux"

class Filters extends Component{

    constructor(props){
        super(props)
        this.handleModalToggle = this.handleModalToggle.bind(this)
    }

    handleModalToggle( component ){

        const modalsize = component === "register" ? "big" : "medium";

        this.props.update_modal_settings( {
            "isOpen":true,
            "title":component,
            "component":component,
            "size":modalsize
        } )

    }

    render(){
        return(
            
                <nav id="Filters" onClick={ () => { 

                    this.props.user.user_auth.auth_token === '' && this.props.user.user_auth.isAuth === false ?
                    this.handleModalToggle( 'login' ) 
                    :
                    null
                    
                } }>
                {/*
                    <div className="blocked-filter" onClick={ () => {alert("Connectez-vous !")} }>
                    </div>
                */}
                    <Container>
                        <Row>
                            <Col lg="3">
                                <ul className="category-filter">
                                    <li><a onClick={this.filterTest.bind(this)}>ingénierie</a></li>
                                    <li><a onClick={this.filterTest.bind(this)}>Travaux</a></li>
                                </ul>
                            </Col>
                            <Col lg="4">
                                <FormGroup className="mb-0">
                                    <Input type="text" name="email" placeholder="Saisir une préstation, ex : Espace Vert" />
                                    <span className="icon-search">
                                        <img src={iconSearch} alt="icon search filter"/>
                                    </span>
                                </FormGroup>
                            </Col>
                            <Col lg="3">
                                <FormGroup className="mb-0">
                                    <Input type="text" name="email" placeholder="Référence article" />
                                    <span className="icon-search">
                                        <img src={iconSearch} alt="icon search filter"/>
                                    </span>
                                </FormGroup>
                            </Col>
                            <Col lg="2">
                                <button className="btn-green">Reinitialiser</button>
                            </Col>
                        </Row>
                    </Container>
                </nav>
        )
    }

    filterTest(){
        this.props.products.map((data) => {
            if(data.categories[0].slug === "travaux"){
                console.log(data.name);
            }
        })
    }

    filterTest2(){
        this.props.products.map((data) => {
            if(data.categories[0].slug === "ingenieurie"){
                console.log(data.name);
            }
        })
    }
}

// export
function mapStateToProps(state){
    return {
        "products": state.products,
        "user": state.user
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        "update_modal_settings":update_modal_settings
    },dispatch)
}
//       
// export
export default connect(mapStateToProps,mapDispatchToProps)(Filters)