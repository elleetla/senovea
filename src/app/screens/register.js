import React                                from 'react'
import { compose, bindActionCreators }      from 'redux'
import { connect }                          from 'react-redux'
import { Field, reduxForm }                 from 'redux-form'
import { Redirect }                         from  'react-router-dom'

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';

// user auth action 
import { user_register_action } from '../actions/index' 


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
const renderTextField = ( field ) => (
    <TextField {...field.input} label={field.placeholder} type={field.type} />
)

const renderCheckBoxField = ( field ) => {
    console.log(field)
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

}

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            redirect:false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(formProps){
        console.log('handlesubmit')
        console.log(formProps)

        // Calling register action
        this.props.user_register_action(formProps, ()=>{
            // redirect
            this.setState({ redirect: true });
        })
    }   

    render(){
        
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/login'/>;
        }

        return(
            <Paper elevation={1}>
            <div>
            <div style={{padding:'30px'}}>
                        <Typography variant="headline" color="inherit">
                        Request an invite.
                        </Typography>
                        <Typography variant="subheading" color="inherit">
                        You have to request an invite to get access to senovea-spa, for that you need to fill the form bellow.
                        </Typography>
                        <Typography variant="subheading" color="inherit">
                        You'll receive activation link by email when your candidacy is accepted by our team.
                        </Typography>
                </div>
                        <Divider/>

                <div style={{padding:'30px'}}>
                <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>

                    <div style={{marginBottom:'15px'}}>
                        <Field
                            name="register_email"
                            id="register_email"
                            component={renderTextField}
                            type="text"
                            placeholder="User Email"
                        />
                    </div>
                    <div style={{marginBottom:'30px'}}>
                        <Field
                            name="register_username"
                            id="register_username"
                            component={renderTextField}
                            type="text"
                            placeholder="User Name"
                        />
                    </div>
                    {/*
                    <div style={{marginBottom:'30px'}}>
                        <Field
                            name="register_password"
                            id="register_password"
                            component={renderTextField}
                            type="password"
                            placeholder="User Password"
                        />
                    </div>
                    */}
                    <div style={{marginBottom:'30px'}}>
                        <Typography style={{marginBottom:'15px'}} variant="body2" color="inherit">
                            Upload Document:
                        </Typography>
                        <Field
                            name="register_document"
                            id="register_document"
                            component={FileInput}
                            type="file"
                            accept=".pdf"
                        />
                    </div>
                    <div style={{marginBottom:'30px'}}>
                        <Field 
                            name="login_accept" 
                            id="login_accept" 
                            value="login_accept"
                            type="checkbox"
                            label="Accept Condition Checkbox"
                            component={renderCheckBoxField}
                        />
                    </div>
                    <div>

                        <Button type="submit" variant="contained" color="secondary">
                            Request invite to SENOVEA
                        </Button>

                    </div>
                    </form>
                </div>
            </div>
            </Paper>
        )
    }
}

function mapStateToProps(state){
    return {
        "user":state.user
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        "user_register_action":user_register_action
    }, dispatch)
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form:'registerForm'
    })
)(Register)