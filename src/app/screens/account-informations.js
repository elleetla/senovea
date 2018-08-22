import React from 'react'
import ReactDOM from 'react-dom'

import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Redirect, Link } from 'react-router-dom'

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { Form, FormGroup, Row, Col, Input, Label, FormFeedback } from 'reactstrap';

import Account from "./account";


// user auth action 
import { user_update_action } from '../actions/index';


/*

    // Fields
    const renderTextField = ( field ) => (
        <TextField {...field.input} label={field.placeholder} type={field.type} />
    )

    const renderField = (props) => {
        //console.log(props)
        return (
        <div className="">
            <TextField type="text" {...props} {...props.input} style={{width:"100%"}}/>
            {props.touched && props.error && <span className="error">{props.error}</span>}
        </div>
        )
    }

*/


// Fields
const renderTextField = ( field ) => {
    
    /*
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
    */

    return(
        <FormGroup>
            <Label>{field.label}</Label>
            <Input {...field.input} id={field.id} placeholder={field.placeholder} type={field.type} />
        </FormGroup>
    )
};



class AccountInformations extends React.Component{

    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(formProps){

        console.log( formProps );

        //formProps.update_id = this.props.user.user_id 
        //this.props.user_update_action(formProps)
        
        
        //console.log("submit")
        //console.log(formProps)


    }


    render(){
        //console.log(this);

        const account_data = {
            'update_user_email':this.props.user.user_email,
            'update_user_name':this.props.user.user_name,
        }
        const activeStep = this.props.user.user_auth.isValidated ? 2 : 1
        return(

            <Account>
                <div style={{padding:'0px'}}>

                        <Paper elevation={1} style={{marginBottom:'15px'}}>
                        <div style={{padding:'15px 30px'}}>
                        <Typography variant="headline" color="inherit">
                            Mes Informations
                        </Typography>
                        </div>
                        </Paper>

                        <Paper elevation={1} style={{marginBottom:'15px'}}>
                        {/*<div style={{padding:'15px 30px'}}>
                        <Typography variant="subheading" color="inherit">
                            User Account Informations
                        </Typography>
                        </div>
                        <Divider />*/}
                        <div style={{padding:'30px'}}>

                            <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>

                                <div>

                                    {/*
                                    <Field
                                        name="login_username"
                                        id="login_username"
                                        component={renderTextField}
                                        type="text"
                                        placeholder="User Name"
                                        label="User Name"
                                    />
                                    */}

                                    {/*

                                        // identifiant 
                                        // Document
                                    
                                        // Email 
                                        // Phone Number 
                                        // First Name
                                        // Last Name
                                        
                                        // Arrondissement 
                                        // Organisme
                                        // Service 

                                        // Adresse
                                        // City
                                        // Post Code 
                                        // Region
                                        // Country
                                        
                                        // Recap Orders 
                                        
                                    */}

                                    {/*
                                    <Field
                                        component={renderTextField}
                                        id="update_identifiant"
                                        name="update_identifiant"
                                        type="text"
                                        label="User Identifiant"
                                        placeholder="User Identifiant"
                                        disable={true}
                                    />

                                   <Field
                                        component={renderTextField}
                                        id="update_arrondissement"
                                        name="update_arrondissement"
                                        type="text"
                                        label="User Arrondissement"
                                        placeholder="User Arrondissement"
                                    />

                                    <Field
                                        component={renderTextField}
                                        id="update_email"
                                        name="update_email"
                                        type="text"
                                        label="User Email"
                                        placeholder="User Email"
                                    />

                                    <Field
                                        component={renderTextField}
                                        id="update_firstname"
                                        name="update_firstname"
                                        type="text"
                                        label="User First Name"
                                        placeholder="User First Name"
                                    />

                                    <Field
                                        component={renderTextField}
                                        id="update_lastname"
                                        name="update_lastname"
                                        type="text"
                                        label="User Last Name"
                                        placeholder="User Last Name"
                                    />

                                    <Field
                                        component={renderTextField}
                                        id="update_organisme"
                                        name="update_organisme"
                                        type="text"
                                        label="User Organisme"
                                        placeholder="User Organisme"
                                    />

                                    <Field
                                        component={renderTextField}
                                        id="update_service"
                                        name="update_service"
                                        type="text"
                                        label="User Service"
                                        placeholder="User Service"
                                    />

                                    <Field
                                        component={renderTextField}
                                        id="update_adresse"
                                        name="update_adresse"
                                        type="text"
                                        label="User Adresse"
                                        placeholder="User Adresse"
                                    />

                                    <Field
                                        component={renderTextField}
                                        id="update_city"
                                        name="update_city"
                                        type="text"
                                        label="User City"
                                        placeholder="User City"
                                    />   

                                    <Field
                                        component={renderTextField}
                                        id="update_postcode"
                                        name="update_postcode"
                                        type="text"
                                        label="User Post Code"
                                        placeholder="User Post Code"
                                    />                                       

                                    <Field
                                        component={renderTextField}
                                        id="update_region"
                                        name="update_region"
                                        type="text"
                                        label="User Region"
                                        placeholder="User Region"
                                    />      

                                    <Field
                                        component={renderTextField}
                                        id="update_country"
                                        name="update_country"
                                        type="text"
                                        label="User Country"
                                        placeholder="User Country"
                                    />  
                                    
                                    */}
                     
                                </div>
                                <div>
                                    <Button type="submit" variant="contained" color="secondary">
                                        Update user informations
                                    </Button>
                                </div>

                            </form>

                        </div>
                        </Paper>


                </div>
                
            </Account>

        )
    }

}
function mapStateToProps( state ){
    return {
        "user":state.user,
        "initialValues":{
            'update_email':state.user.user_email,
            'update_name':state.user.user_name,
        }
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        "user_update_action":user_update_action
    }, dispatch)
}

export default compose(

    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form:'updateForm'
    })

)(AccountInformations)