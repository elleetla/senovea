import React                                from 'react'
import { compose, bindActionCreators }      from 'redux'
import { connect }                          from 'react-redux'
import { Field, reduxForm }                 from 'redux-form'
import { Redirect }                         from  'react-router-dom'

/*import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';*/

// react strap
import { Form, FormGroup, Row, Col, Input, Label, FormFeedback } from 'reactstrap';
import LoadingSvg from '../assets/img/icon-preloader-connect.svg';

// user auth action 
import { user_register_action } from '../actions/index' 
import { update_modal_settings } from '../actions/index';
import { add_alert } from "../actions/index"


// FIX FOR INPUT TYPE FILE
const adaptFileEventToValue = delegate =>
  e => delegate(e.target.files[0])

const FileInput = ({
  input: {
    value: omitValue,
    onChange,
    onBlur,
    type="file",
    id="register_document",
    name="register_document",
    accept=".pdf",
    // {...inputProps}
  },
  meta: omitMeta,
  //...props, ???
}) =>
  <input
    onChange={adaptFileEventToValue(onChange)}
    onBlur={adaptFileEventToValue(onBlur)}
    type="file"
    id="register_document"
    name="register_document"
    accept=".pdf"
    // {...inputProps}
    //{...props} ???
  />


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

/*const renderCheckBoxField = ( field ) => {
    //console.log(field)
    return(
        <div>
            <Typography style={{marginBottom:'5px'}} variant="body2" color="inherit">
                By checking the box you accept to receive emails from senovea:
            </Typography>
            <Checkbox
            type={field.type}
            {...field}
            {...field.input}
            value={field.value}
        />
        </div>
    )
}*/

class Register extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            redirect:false,
            loadingBtn : false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(formProps){
        console.log('handlesubmit')
        console.log(formProps)

        this.setState({"loadingBtn":true})

        // Calling register action
        this.props.user_register_action(formProps, ( registration_status )=>{


                // load 
                this.setState({"loadingBtn":false})

                // on close la modale 
                let newModalSettings = _.cloneDeep(this.props.modalSettings)
                newModalSettings.isOpen = false;
                this.props.update_modal_settings(newModalSettings)

                // Notification 
                if( registration_status === "success" ){

                    this.props.add_alert({
                        "status":"success",
                        "content":`Votre demande d'inscription à bien été envoyée!`
                    })

                }else{  

                    this.props.add_alert({
                        "status":"error",
                        "content":`Erreur lors de votre envoie de demande d'inscription.`
                    })

                }

        })
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

    render(){
        
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/login'/>;
        }

        return(

            <Row>
                <Col md="12">

                    <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>

                    <Row>
                        <Col md="6">
                            <Field 
                                name="register_organisme"
                                id="register_organisme"
                                component={renderTextField}
                                type="text"
                                placeholder="Nom de l'organisme"
                                label="Organisme"
                            />
                        </Col>
                        <Col md="6">
                            <Field
                                name="register_service"
                                id="register_service"
                                component={renderTextField}
                                type="text"
                                placeholder="Nom du service ou du département"
                                label="Service/Département"
                            />
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col md="4">
                            <Field
                                name="register_username"
                                id="register_username"
                                component={renderTextField}
                                type="text"
                                placeholder="Votre identifiant de connexion"
                                label="Indentifiant"
                            />
                        </Col>
                        <Col md="4">
                            <Field
                                name="register_nom"
                                id="register_nom"
                                component={renderTextField}
                                type="text"
                                placeholder="Nom de la personne référente"
                                label="Nom"
                            />
                        </Col>
                        <Col md="4">
                            <Field
                                name="register_prenom"
                                id="register_prenom"
                                component={renderTextField}
                                type="text"
                                placeholder="Prénom de la personne référente"
                                label="Prénom"
                            />
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col md="6">
                            <Field
                                name="register_arrondissement"
                                id="register_arrondissement"
                                component={renderTextField}
                                type="number"
                                placeholder="Arrondissement Napoléonien"
                                label="Arrondissement Napoléonien"
                            />
                        </Col>
                        <Col md="6">
                            <Field
                                name="register_adresse"
                                id="register_adresse"
                                component={renderTextField}
                                type="text"
                                placeholder="Adresse"
                                label="Adresse"
                            />
                        </Col>
                        <Col md="6">
                            <Field
                                name="register_code"
                                id="register_code"
                                component={renderTextField}
                                type="number"
                                placeholder="Code Postal"
                                label="Code Postal"
                            />
                        </Col>
                        <Col md="6">
                            <Field
                                name="register_ville"
                                id="register_ville"
                                component={renderTextField}
                                type="text"
                                placeholder="Ville"
                                label="Ville"
                            />
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col md="6">
                            <Field
                                name="register_email"
                                id="register_email"
                                component={renderTextField}
                                type="text"
                                placeholder="Email"
                                label="Email"
                            />
                        </Col>
                        <Col md="6">
                            <Field
                                name="register_phone"
                                id="register_phone"
                                component={renderTextField}
                                type="number"
                                placeholder="Num. Téléphone"
                                label="Num. Téléphone"
                            />
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col md="12">
                            <Label variant="subheading" color="inherit">
                                Importer la carte d'adhésion
                            </Label>
                            <div>
                            <Field
                                name="register_document"
                                id="register_document"
                                component={FileInput}
                                type="file"
                                accept=".pdf"
                            />
                            </div>
                        </Col>
                    </Row>
                    {/*<Typography variant="subheading" color="inherit">
                        Emailing
                    </Typography>
                    <div style={{marginBottom:'30px'}}>
                        <Field 
                            name="login_accept" 
                            id="login_accept" 
                            value="login_accept"
                            type="checkbox"
                            label="Accept Condition Checkbox"
                            component={renderCheckBoxField}
                        />
                    </div>*/}
                    <hr/>
                    <Row>
                        <Col md="12">
                                <button style={{display:"flex",alignItems:"center",justifyContent:"space-between"}} id="btn-connect-modal" type="submit" className="btn-green" disabled={ this.props.submitting }>
                                    <div style={{lineHeight:"1"}}>S'incrire</div>
                                    <div style={ this.state.loadingBtn ? {marginLeft:"0",opacity:"1"} : {marginLeft:"0",opacity:"0"} } className="preloader-connect-user"><img src={LoadingSvg}/></div>
                                </button>
                        </Col>
                    </Row>
                    </form>
                </Col>
                <Col md="12">
                    <p style={{textAlign:"center",marginBottom:"0px",marginTop:"1rem"}}> <a onClick={ ()=>{ this.handleModalToggle( 'login' ) } } href="javascript:void(0)">Se connecter</a>  </p>
                </Col>
            </Row>  
        )
    }
}

function mapStateToProps(state){
    return {
        "user":state.user,
        "modalSettings":state.modalSettings
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        "user_register_action":user_register_action,
        "update_modal_settings":update_modal_settings,
        "add_alert":add_alert
    }, dispatch)
}

const validate = ( values ) => {
    let errors = {}

    if (!values.register_organisme) {
        errors.register_organisme = true
    }
    if (!values.register_service) {
        errors.register_service = true
    }
    if (!values.register_username) {
        errors.register_username = true
    }
    if (!values.register_nom) {
        errors.register_nom = true
    }
    if (!values.register_prenom) {
        errors.register_prenom = true
    }
    if (!values.register_arrondissement) {
        errors.register_arrondissement = true
    }
    if (!values.register_adresse) {
        errors.register_adresse = true
    }
    if (!values.register_code) {
        errors.register_code = true
    }
    if (!values.register_ville) {
        errors.register_ville = true
    }
    if (!values.register_email) {
        errors.register_email = true
    }
    if (!values.register_phone) {
        errors.register_phone = true
    }

    return errors
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form:'registerForm',
        validate
    })
)(Register)