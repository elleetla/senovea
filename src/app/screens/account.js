import React from 'react'
import ReactDOM from 'react-dom'

import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// user auth action 
import { user_update_action } from '../actions/index';

// Fields
const renderTextField = ( field ) => (
    <TextField {...field.input} label={field.placeholder} type={field.type} />
)

const renderField = (props) => {
    console.log(props)
    return (
      <div className="">
        <TextField type="text" {...props} {...props.input} style={{width:"100%"}}/>
        {props.touched && props.error && <span className="error">{props.error}</span>}
      </div>
    )
}


class Account extends React.Component{

    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(formProps){
        formProps.update_id = this.props.user.user_id 
        this.props.user_update_action(formProps)
        console.log("submit")
        console.log(formProps)
    }

    render(){
        // Account data 

        console.log(this)
        const account_data = {
            'update_user_email':this.props.user.user_email,
            'update_user_name':this.props.user.user_name,
        }
        const activeStep = this.props.user.user_auth.isValidated ? 2 : 1

        return(
            
                <div style={{padding:'0px'}}>

                        <div style={{padding:'30px'}}>

                            <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>


                                <Typography variant="body2" color="inherit">
                                    General
                                </Typography>

                                <div style={{marginBottom:'30px'}}>
                                <Field
                                    component={renderField}
                                    id="update_email"
                                    name="update_email"
                                    type="text"
                                    label="User Email"
                                    placeholder="User Email"
                                />
                                </div>
                                <div>
                                    <Button type="submit" variant="contained" color="secondary">
                                        Update user informations
                                    </Button>
                                </div>

                            </form>

                        </div>
                </div>
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

)(Account)