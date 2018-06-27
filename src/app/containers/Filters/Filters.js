import React, { Component } from 'react';

// import style
import './Filters.css';
import { Container, Row, Col, FormGroup, Input } from 'reactstrap';
import {connect} from "react-redux";

class Filters extends Component{
    render(){
        return(
            this.props.user.user_auth.auth_token === '' && this.props.user.user_auth.isAuth === false ?
                <nav id="Filters">
                    <div className="blocked-filter" onClick={ () => {alert("Connectez-vous !")} }>
                    </div>
                    <Container>
                        <Row>
                            <Col lg="3">
                                <ul className="category-filter">
                                    <li><a onClick={this.filterTest.bind(this)}>Travaux</a></li>
                                    <li><a onClick={this.filterTest.bind(this)}>Ingénieurie</a></li>
                                </ul>
                            </Col>
                            <Col lg="4">
                                <FormGroup className="mb-0">
                                    <Input type="email" name="email" placeholder="Recherchez une préstation, ex : Espace Vert" />
                                </FormGroup>
                            </Col>
                            <Col lg="3">
                                <FormGroup className="mb-0">
                                    <Input type="email" name="email" placeholder="Référence article" />
                                </FormGroup>
                            </Col>
                            <Col lg="2">
                                <button onClick={()=>{console.log("test")}} className="btn-green">Reinitialiser</button>
                            </Col>
                        </Row>
                    </Container>
                </nav>
                :
                <nav id="Filters">
                    <Container>
                        <Row>
                            <Col lg="3">
                                <ul className="category-filter">
                                    <li><a onClick={this.filterTest.bind(this)}>Travaux</a></li>
                                    <li><a onClick={this.filterTest.bind(this)}>Ingénieurie</a></li>
                                </ul>
                            </Col>
                            <Col lg="4">
                                <FormGroup className="mb-0">
                                    <Input type="email" name="email" placeholder="Recherchez une préstation, ex : Espace Vert" />
                                </FormGroup>
                            </Col>
                            <Col lg="3">
                                <FormGroup className="mb-0">
                                    <Input type="email" name="email" placeholder="Référence article" />
                                </FormGroup>
                            </Col>
                            <Col lg="2">
                                <button onClick={()=>{console.log("test")}} className="btn-green">Reinitialiser</button>
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

// export
export default connect(mapStateToProps)(Filters)