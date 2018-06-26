import React, { Component } from 'react';

// import style
import './Filters.css';
import { Container, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import {connect} from "react-redux";

class Filters extends Component{
    render(){
        return(
            <nav id="Filters">
                <Container>
                    <Row>
                        <Col lg="4">
                            <FormGroup className="mb-0">
                                <Input type="email" name="email" id="exampleEmail" placeholder="Recherchez une préstation, ex : Espace Vert" />
                            </FormGroup>
                        </Col>
                        <Col lg="3">
                            <FormGroup className="mb-0">
                                <Input type="email" name="email" id="exampleEmail" placeholder="Référence article" />
                            </FormGroup>
                        </Col>
                        <Col lg="3">
                            <ul className="category-filter">
                                <li><a onClick={this.filterTest.bind(this)}>Travaux</a></li>
                                <li><a onClick={this.filterTest.bind(this)}>Ingénieurie</a></li>
                            </ul>
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
        "products": state.products
    }
}

// export
export default connect(mapStateToProps)(Filters)