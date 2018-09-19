import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import { Field, reduxForm } from 'redux-form';

// Actions
import { load_panier } from '../../actions/index';
import { add_panier } from '../../actions/index';
import { delete_panier } from '../../actions/index';
import { update_panier } from '../../actions/index';
import { update_settings_panier } from '../../actions/index';
import { update_modal_settings } from '../../actions/index';
import { add_alert } from "../../actions/index"

import LoadingSvg from '../../assets/img/icon-preloader-connect.svg';

// React Strap 
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input,FormFeedback } from 'reactstrap';

// Fields
const renderTextField = ( field ) => {
    let formFeedback = ""
    let invalidValue = false;
    if( field.meta.touched ){
        if( field.meta.error ){
            invalidValue = true;
            formFeedback = "This field is required"
        }
    }
    return(
        <FormGroup>
            <Label>{field.label}</Label>
            <Input {...field.input} id={field.id} placeholder={field.placeholder} type={field.type} invalid={ invalidValue } disabled={ field.disabled ? field.disabled : null} />
            <FormFeedback> {formFeedback} </FormFeedback>
        </FormGroup>
    )
};


class PanierForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loadingBtn : false
        };

        this.clickLoadingBtn = this.clickLoadingBtn.bind(this)
        this.handleUpdateActivePanier = this.handleUpdateActivePanier.bind(this)
        this.handleCreatePanierSubmit = this.handleCreatePanierSubmit.bind(this)

    }

    clickLoadingBtn(){
        this.setState({ loadingBtn : true });
    };

    handleUpdateActivePanier( e ){
        let new_panier_settings = _.cloneDeep(this.props.paniersSettings)
        new_panier_settings.active_panier_id = e.target.value
        this.props.update_settings_panier( new_panier_settings )
    }

    handleCreatePanierSubmit(Formprops){

        this.setState({"loadingBtn":true})

        ////console.log(Formprops)
        // handlePanierCreation 
        const user_id = this.props.user.user_id;
        const user_token = this.props.user.user_auth.auth_token;
        this.props.add_panier(Formprops, user_token, ( status, new_panier_id )=>{

            //this.handleToggleModalCreatePanier();
            if ( status === "success" ) { 
                // Ici on met le nouveau panier en panier actif 
                let new_panier_settings = _.cloneDeep(this.props.paniersSettings)
                new_panier_settings.active_panier_id = new_panier_id
                this.props.update_settings_panier(new_panier_settings);

                this.props.add_alert({
                    "status":"success",
                    "content":`Création d'un nouveau panier: <strong>${this.props.paniers[new_panier_id].nicename}</strong>`
                })
                
                // stop load 
                this.setState({"loadingBtn":false})

                // on close la modale 
                let newModalSettings = _.cloneDeep(this.props.modalSettings)
                newModalSettings.isOpen = false;
                this.props.update_modal_settings(newModalSettings)
            }else{
                this.props.add_alert({
                    "status":"error",
                    "content":`Erreur lors de la création d'un nouveau panier.`
                })

                // stop load 
                this.setState({"loadingBtn":false})

                // on close la modale 
                let newModalSettings = _.cloneDeep(this.props.modalSettings)
                newModalSettings.isOpen = false;
                this.props.update_modal_settings(newModalSettings)

            } 

        });
    }

    render(){
        console.log(this)
        return(
            <Row>
            <Col md="12">
            <form onSubmit={this.props.handleSubmit(this.handleCreatePanierSubmit)}>
                    <Field
                        name="create_panier_arrondissement"
                        id="create_panier_arrondissement"
                        component={renderTextField}
                        //component="input"
                        type="text"
                        placeholder="Arrondissement"
                        value={this.props.user.user_arrondissement}
                        initialvalues={this.props.user.user_arrondissement}
                        disabled
                        label="Arrondissement"
                    />
                    <Field
                        name="create_panier_code"
                        id="create_panier_code"
                        component={renderTextField}
                        type="text"
                        placeholder="Code Postal"
                        label="Code Postal"
                    />
                    <Field
                        name="create_panier_adresse"
                        id="create_panier_adresse"
                        component={renderTextField}
                        type="text"
                        placeholder="Adresse d'Intervention"
                        label="Adresse d'Intervention"
                    />
                    <Field
                        name="create_panier_nom"
                        id="create_panier_nom"
                        component={renderTextField}
                        type="text"
                        placeholder="Nom du Panier"
                        label="Nom du Panier"
                    />
                    {/*
                    <div>
                        <Button color="primary" type="submit">Créer Panier</Button>
                        <Button color="secondary" type="button" onClick={this.handleToggleModalCreatePanier}>Cancel</Button>  
                    </div>
                    */}
                                <div>
                                <button style={{display:"flex",alignItems:"center",justifyContent:"space-between"}} id="btn-connect-modal" type="submit" className="btn-green" disabled={ this.props.submitting }>
                                    <div style={{lineHeight:"1"}}>Créer un panier</div>
                                    <div style={ this.state.loadingBtn ? {marginLeft:"0",opacity:"1"} : {marginLeft:"0",opacity:"0"} } className="preloader-connect-user"><img src={LoadingSvg}/></div>
                                </button>
                                </div>
                   
            </form>
            </Col>
            </Row>
        )
    }

}

// export
function mapStateToProps(state){
    //console.log( "create panier state" )
    //console.log( state )
    return {

        "products": state.products,
        "user": state.user,

        "paniers":state.paniers,
        "paniersSettings":state.paniersSettings,
        "modalSettings":state.modalSettings,

        "initialValues":{
            'create_panier_arrondissement':state.user.user_arrondissement,
        }

    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({

        "load_panier":load_panier,
        "add_panier":add_panier,
        "delete_panier":delete_panier,
        "update_panier":update_panier,
        "update_settings_panier":update_settings_panier,
        "update_modal_settings":update_modal_settings,
        "add_alert":add_alert,

    },dispatch)
}

const validate = ( values ) => {
    const errors = {}
    if (!values.create_panier_code) {
        errors.create_panier_code = true
    }
    if (!values.create_panier_adresse) {
        errors.create_panier_adresse = true
    }
    if (!values.create_panier_nom) {
        errors.create_panier_nom = true
    }
    return errors
}


// export
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        "form":'createPanierForm',
        validate,
    })
)(PanierForm)