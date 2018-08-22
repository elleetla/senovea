import React                                from 'react'
import { compose, bindActionCreators }      from 'redux'
import { connect }                          from 'react-redux'
import { Field, reduxForm }                 from 'redux-form'

// react strap
import { Form, FormGroup, Row, Col, Input, Label, FormFeedback } from 'reactstrap';
import LoadingSvg from '../assets/img/icon-preloader-connect.svg';

// user auth action 
import { user_auth_action } from '../actions/index' ;
import { call_product } from '../actions/index' ;
import { load_panier } from '../actions/index' ;
import { update_settings_panier } from '../actions/index';
import { update_modal_settings } from '../actions/index';

import { add_alert } from "../actions/index"


// Fields
const renderTextField = ( field ) => {
    //console.log("renderTextField")
    //console.log(field)

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
            <Input {...field.input} id={field.id} placeholder={field.placeholder} type={field.type} invalid={ invalidValue } />
            <FormFeedback> {formFeedback} </FormFeedback>
        </FormGroup>
    )
};

class LogIn extends React.Component{

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            loadingBtn : false
        };
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

    clickLoadingBtn(){
        this.setState({
            loadingBtn : true
        });
    };

    handleSubmit(form_props){

        this.setState({"loadingBtn":true});
        
        //console.log( "handleSubmit" );
        //console.log( form_props );

        // Calling login action
        this.props.user_auth_action(form_props,(status)=>{
            if( status === "success" ){

                // Si c'est le cas on load les paniers
                // & On load les products 

                this.props.call_product( this.props.user.user_auth.auth_token, this.props.user.user_arrondissement, (products_status)=>{

                    if( products_status === "success" ){
                        this.props.add_alert({
                            "status":"success",
                            "content":`Récupération des prestations.`
                        })
                    }else{
                        this.props.add_alert({
                            "status":"error",
                            "content":`Erreur lors du chargement des prestations.`
                        })
                    }

                })

                this.props.load_panier( this.props.user.user_auth.auth_token , (panier_status)=>{                
                    // On update le panier actif 
                    // Par le dernier panier updaté
                    if( panier_status === "success" ){
                        let new_panier_settings = _.cloneDeep(this.props.paniersSettings)
                        new_panier_settings.active_panier_id = _.findLastKey(this.props.paniers)
                        this.props.update_settings_panier(new_panier_settings);

                        this.props.add_alert({
                            "status":"success",
                            "content":`Récupération des paniers de ${this.props.user.user_email}`
                        })
                    }else{
                        this.props.add_alert({
                            "status":"error",
                            "content":`Erreur lors du chargement des paniers de ${this.props.user.user_email}`
                        })
                    }
                })

                this.props.add_alert({
                    "status":"success",
                    "content":`Connexion de ${this.props.user.user_email}`
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
                    "content":`Erreur lors du chargement du profil utilisateur. Veuillez vérifier vos identifiants.`
                })

                // stop load 
                this.setState({"loadingBtn":false})

                // on close la modale 
                let newModalSettings = _.cloneDeep(this.props.modalSettings)
                newModalSettings.isOpen = false;
                this.props.update_modal_settings(newModalSettings)      

            }
        })

    }

    render(){
        //console.log(this);
        return(
            <Row>
                <Col md="12">
                     <p className="text-center">Site web privé, réservé aux adhérents,<br/>veuillez vous connecter pour effectuer une recherche</p>
                     <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                          <Field
                              name="login_username"
                              id="login_username"
                              component={renderTextField}
                              type="text"
                              placeholder="Identifiant"
                              label="Identifiant"
                          />

                          <Field
                              name="login_password"
                              id="login_password"
                              component={renderTextField}
                              type="password"
                              placeholder="Mot de passe"
                              label="Mot de passe"
                          />
                          <button style={{display:"flex",alignItems:"center",justifyContent:"space-between"}} id="btn-connect-modal" type="submit" className="btn-green" disabled={ this.props.submitting }>
                               <div style={{lineHeight:"1"}}>Se connecter</div>
                               <div style={ this.state.loadingBtn ? {marginLeft:"0",opacity:"1"} : {marginLeft:"0",opacity:"0"} } className="preloader-connect-user"><img src={LoadingSvg}/></div>
                          </button>
                     </form>
                </Col>
                <Col md="12">
                    <p style={{textAlign:"center",marginBottom:"0px",marginTop:"1rem"}}>
                         <a onClick={ ()=>{ this.handleModalToggle( 'resend' ) } } href="javascript:void(0)">Mot de passe oublié ?</a><br/>
                         <a onClick={ ()=>{ this.handleModalToggle( 'register' ) } } href="javascript:void(0)">Vous n'avez pas de compte ? <b>Cliquez-ici !</b></a>
                    </p>
                </Col>
            </Row>
        )
    }
}

function mapStateToProps(state){
    return {
        "user":state.user,
        "paniers":state.paniers,
        "paniersSettings" : state.paniersSettings,
        "modalSettings":state.modalSettings
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        "user_auth_action":user_auth_action,
        "call_product":call_product,
        "load_panier":load_panier,
        "update_settings_panier":update_settings_panier,
        "update_modal_settings":update_modal_settings,
        "add_alert":add_alert,
    }, dispatch)
}

const validate = ( values ) => {
    const errors = {}
    if (!values.login_username) {
        errors.login_username = true
    }
    if (!values.login_password) {
        errors.login_password = true
    }
    return errors
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form:'loginForm',
        validate
    })
)(LogIn)