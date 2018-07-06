import React, { Component } from 'react';

// import style
import './Filters-suppliers.css';
import { Container, Row, Col, FormGroup, Input } from 'reactstrap';
import iconSearch from '../../assets/img/icon_search.svg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filter_suppliers_actions } from '../../actions/index';

class FiltersSuppliers extends Component{

    render(){
        console.log(`Filtre name entreprise : ${this.props.suppliersSettings.name}`);
        console.log(this.props.suppliersSettings);
        return(
            <nav id="Filters">
                <Container>
                    <Row>
                        <Col lg="4">
                            <FormGroup className="mb-0">
                                <Input
                                    value={this.props.suppliersSettings.name}
                                    onChange={(e)=>{this.props.filter_suppliers_actions({"name": e.target.value})}}
                                    type="text"
                                    placeholder="Nom de l'entreprise"
                                />
                                <span className="icon-search">
                                        <img src={iconSearch} alt="icon search filter"/>
                                    </span>
                            </FormGroup>
                        </Col>
                        <Col lg="3">
                            <FormGroup className="mb-0">
                                <Input
                                    value={this.props.suppliersSettings.arrondissement}
                                    onChange={(e)=>{this.props.filter_suppliers_actions({"arrondissement": e.target.value})}}
                                    type="text"
                                    placeholder="Arrondissement"
                                />
                                <span className="icon-search">
                                        <img src={iconSearch} alt="icon search filter"/>
                                    </span>
                            </FormGroup>
                        </Col>
                        <Col lg="3">
                            <FormGroup className="mb-0">
                                <Input type="text" placeholder="Trier selon le rang" />
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
        "suppliersSettings": state.suppliersSettings
    }
}

function mapDispatchToPros(disptach){
    return(
        bindActionCreators({"filter_suppliers_actions":filter_suppliers_actions}, disptach)
    )
}

// export
export default connect(mapStateToProps, mapDispatchToPros)(FiltersSuppliers)