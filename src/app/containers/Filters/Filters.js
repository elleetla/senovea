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
                        <Col sm="3">
                            <FormGroup className="mb-0">
                                <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                            </FormGroup>
                        </Col>
                        <Col sm="3">
                            <FormGroup className="mb-0">
                                <Input type="select" name="select" id="exampleSelect">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col sm="3">
                            <button onClick={this.filterTest.bind(this)} className="btn-primary">Travaux</button>
                            <button onClick={this.filterTest2.bind(this)} className="btn-primary">Ingénieurie</button>
                        </Col>
                        <Col sm="3">
                            <button onClick={()=>{console.log("test")}} className="btn-green">Rechercher</button>
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