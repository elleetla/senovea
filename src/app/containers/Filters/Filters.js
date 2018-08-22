import React, { Component } from 'react';

// import style
import './Filters.css';
import { Container, Row, Col, FormGroup, Input } from 'reactstrap';
import {connect} from "react-redux";
import { update_modal_settings } from '../../actions/index';
import iconSearch from '../../assets/img/icon_search.svg';
import { bindActionCreators } from "redux"


import { filter_products_actions } from '../../actions/index';


class Filters extends Component{

    constructor(props){
        super(props);
        this.handleModalToggle = this.handleModalToggle.bind(this)
        this.handleFilterInputUpdate = this.handleFilterInputUpdate.bind(this)
        this.handleResetFilterSettings = this.handleResetFilterSettings.bind(this)
    }

    handleModalToggle( component ){

        const modalsize = component === "register" ? "big" : "medium";

        this.props.update_modal_settings({
            "isOpen":true,
            "title":component,
            "component":component,
            "size":modalsize
        })
    }

    handleFilterButtonUpdate( bname , e ){
        let productsFilterSettingsClone = _.cloneDeep( this.props.productsFilterSettings )
        switch( bname ){
            case "ingenieurie":{
                productsFilterSettingsClone.categorie = "ingenieurie";
                this.props.filter_products_actions( productsFilterSettingsClone )
                break;
            }
            case "travaux":{
                productsFilterSettingsClone.categorie = "travaux";
                this.props.filter_products_actions( productsFilterSettingsClone )
                break;
            }
            default :{
                break;
            }
        }
    }

    handleFilterInputUpdate( iname , e ){
        let productsFilterSettingsClone = _.cloneDeep( this.props.productsFilterSettings )
        switch( iname ){
            case "prestation":{
                productsFilterSettingsClone.prestation = e.target.value;
                this.props.filter_products_actions( productsFilterSettingsClone )
                break;
            }
            case "ref":{
                productsFilterSettingsClone.ref = e.target.value;
                this.props.filter_products_actions( productsFilterSettingsClone )
                break;
            }   
            default :{
                break;
            }
        }
    }


    handleResetFilterSettings(){

        this.props.filter_products_actions( { 
            "categorie":"ingenieurie",
            "prestation":"",
            "ref":""
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
                    <Container>
                        <Row>
                            <Col lg="3">
                                <ul className="category-filter">
                                    <li><a onClick={(e) => {this.handleFilterButtonUpdate("ingenieurie",e)}} data-categorie="ingenieurie" style={ this.props.productsFilterSettings.categorie === "ingenieurie" ? { background:"#EBEEFD", color:"#2C3948" } : null } >Ingénierie</a></li>
                                    <li><a onClick={(e) => {this.handleFilterButtonUpdate("travaux",e)}} data-categorie="travaux" style={ this.props.productsFilterSettings.categorie === "travaux" ? { background:"#EBEEFD"  } : null } >Travaux</a></li>
                                </ul>
                            </Col>
                            <Col lg="4">
                                <FormGroup className="mb-0">
                                    <Input 
                                        type="text" 
                                        name="text"
                                        placeholder="Saisir une prestation, ex : Tonte de gazon"
                                        value={this.props.productsFilterSettings.prestation}
                                        onChange={ ( e ) => { this.handleFilterInputUpdate( "prestation" , e ) } }
                                    />
                                    <span className="icon-search">
                                        <img src={iconSearch} alt="icon search filter"/>
                                    </span>

                                </FormGroup>
                            </Col>
                            <Col lg="3">

                                <FormGroup className="mb-0">
                                    <Input 
                                        type="text" 
                                        name="text" 
                                        placeholder="Référence article"
                                        value={this.props.productsFilterSettings.ref}
                                        onChange={ ( e ) => { this.handleFilterInputUpdate( "ref" , e ) } }
                                    />
                                    <span className="icon-search">
                                        <img src={iconSearch} alt="icon search filter"/>
                                    </span>

                                </FormGroup>
                            </Col>
                            <Col lg="2">
                                <button onClick={ this.handleResetFilterSettings } className="btn-green">Réinitialiser</button>
                            </Col>
                        </Row>
                    </Container>
                </nav>
        )
    }

    /*filterTest(){
        this.props.products.map((data) => {
            if(data.categories[0].slug === "travaux"){
                console.log(data.name);
            }
        })
    }*/
}

// export
function mapStateToProps(state){
    return {
        "products": state.products,
        "user": state.user,
        "productsFilterSettings":state.productsFilterSettings
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        "update_modal_settings":update_modal_settings,
        "filter_products_actions":filter_products_actions
    },dispatch)
}
//       
// export
export default connect(mapStateToProps,mapDispatchToProps)(Filters)