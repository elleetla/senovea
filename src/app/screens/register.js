import React                                from 'react'
import { compose, bindActionCreators }      from 'redux'
import { connect }                          from 'react-redux'
import { Field, reduxForm }                 from 'redux-form'
import { Redirect }                         from  'react-router-dom'

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
            <div style={{padding:'30px'}}>
            <div>
                        <Typography style={{marginBottom:'30px'}} variant="headline" color="inherit">
                        Register Form
                        </Typography>

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
                    <div style={{marginBottom:'15px'}}>
                        <Field
                            name="register_username"
                            id="register_username"
                            component={renderTextField}
                            type="text"
                            placeholder="User Name"
                        />
                    </div>
                    <div style={{marginBottom:'30px'}}>
                        <Field
                            name="register_password"
                            id="register_password"
                            component={renderTextField}
                            type="password"
                            placeholder="User Password"
                        />
                    </div>
                    <div style={{marginBottom:'30px'}}>
                        <Field
                            name="register_document"
                            id="register_document"
                            component={FileInput}
                            type="file"
                            accept=".pdf"
                        />
                    </div>

                    <div>

                        <Button type="submit" variant="contained" color="secondary">
                            Register to the app
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