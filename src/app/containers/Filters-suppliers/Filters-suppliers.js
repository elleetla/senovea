import React, { Component } from 'react';

// import style
import './Filters-suppliers.css';
import { Container, Row, Col, FormGroup, Input } from 'reactstrap';
import iconSearch from '../../assets/img/icon_search.svg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filter_suppliers_actions } from '../../actions/index';
import _ from "lodash"

class FiltersSuppliers extends Component{
    constructor(props){
        super(props);
        this.handleUpdateSupplierFilter = this.handleUpdateSupplierFilter.bind(this)
    }

    handleUpdateSupplierFilter( e, fieldName ){
        let new_settings = _.cloneDeep(this.props.suppliersSettings);
        switch(fieldName){
            case "name":{
                new_settings.name = e.target.value;
                break
            }
            case "arrondissement":{
                new_settings.arrondissement = e.target.value;
                break
            }
            case "rang":{
                new_settings.rang = e.target.value;
                break
            }
            default:
            break;
        }
        this.props.filter_suppliers_actions(new_settings)
    }

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
                                    onChange={ (e)=>{ this.handleUpdateSupplierFilter(e, "name") }}
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
                                    onChange={ (e)=>{ this.handleUpdateSupplierFilter(e, "arrondissement") }}
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
                                <Input
                                    value={this.props.suppliersSettings.rang}
                                    onChange={ (e)=>{ this.handleUpdateSupplierFilter(e, "rang") }}
                                    type="text"
                                    placeholder="Rang de l'entreprise"
                                />
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