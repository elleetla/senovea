import React, { Component } from 'react';

// import style
import './Filters-suppliers.css';
import { Container, Row, Col, FormGroup, Input } from 'reactstrap';
import {connect} from "react-redux";

import iconSearch from '../../assets/img/icon_search.svg';

class FiltersSuppliers extends Component{
    render(){
        return(
            <nav id="Filters">
                <Container>
                    <Row>
                        <Col lg="4">
                            <FormGroup className="mb-0">
                                <Input type="text" name="email" placeholder="Nom de l'entreprise" />
                                <span className="icon-search">
                                        <img src={iconSearch} alt="icon search filter"/>
                                    </span>
                            </FormGroup>
                        </Col>
                        <Col lg="3">
                            <FormGroup className="mb-0">
                                <Input type="text" name="email" placeholder="Arrondissement" />
                                <span className="icon-search">
                                        <img src={iconSearch} alt="icon search filter"/>
                                    </span>
                            </FormGroup>
                        </Col>
                        <Col lg="3">
                            <FormGroup className="mb-0">
                                <Input type="text" name="email" placeholder="Trier selon le rang" />
                                <span className="icon-search">
                                        <img src={iconSearch} alt="icon search filter"/>
                                    </span>
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
}

// export
function mapStateToProps(state){
    return {
        "products": state.products,
        "user": state.user
    }
}

// export
export default connect(mapStateToProps)(FiltersSuppliers)