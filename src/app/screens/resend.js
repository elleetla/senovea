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
import { user_reset_action } from '../actions/index';

// Fields
const renderTextField = ( field ) => {
    console.log("renderTextField")
    console.log(field)

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

class ReSend extends React.Component{

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

        this.setState({"loadingBtn":true})
        
        console.log( "handleSubmit" );
        console.log( form_props );

        // call reset action
        this.props.user_reset_action( form_props.resend_email, ( resend_status ) => {
            if( resend_status === "success" ){
                this.props.add_alert({
                    "status":"success",
                    "content":`Vos indentifiants ont été renvoyés à cette adresse email : ${form_props.resend_email}`
                })
            }else{
                this.props.add_alert({
                    "status":"error",
                    "content":`Erreur dans le renvoi de vos identifiants`
                })
            }

                // stop load 
                this.setState({"loadingBtn":false})

                // on close la modale 
                let newModalSettings = _.cloneDeep(this.props.modalSettings)
                newModalSettings.isOpen = false;
                this.props.update_modal_settings(newModalSettings)

            
        } )

    }

    render(){
        console.log(this);
        return(
            <Row>
                <Col md="12">
                    <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>

                                <Field
                                    name="resend_email"
                                    id="resend_email"
                                    component={renderTextField}
                                    type="text"
                                    placeholder="Votre Email"
                                    label="Email"
                                />

                                <div>
                                <button style={{display:"flex",alignItems:"center",justifyContent:"space-between"}} id="btn-connect-modal" type="submit" className="btn-green" disabled={ this.props.submitting }>
                                    <div style={{lineHeight:"1"}}>Me renvoyer mes identifiants</div>
                                    <div style={ this.state.loadingBtn ? {marginLeft:"0",opacity:"1"} : {marginLeft:"0",opacity:"0"} } className="preloader-connect-user"><img src={LoadingSvg}/></div>
                                </button>
                                </div>

                    </form>
                </Col>
                <Col md="12">
                    <p style={{textAlign:"center",marginBottom:"0px",marginTop:"1rem"}}> <a onClick={ ()=>{ this.handleModalToggle( 'login' ) } } href="javascript:void(0)">Retourner à la connexion</a> </p>
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
        "modalSettings":state.modalSettings,

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
        "user_reset_action":user_reset_action

    }, dispatch)
}

const validate = ( values ) => {
    const errors = {}
    if (!values.resend_email) {
        errors.resend_email = true
    }
    return errors
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form:'resendForm',
        validate
    })
)(ReSend)