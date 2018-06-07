import React                                from 'react'
import { compose, bindActionCreators }      from 'redux'
import { connect }                          from 'react-redux'
import { Field, reduxForm }                 from 'redux-form'

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// user auth action 
import { user_auth_action } from '../actions/index' 


// Fields
const renderTextField = ( field ) => (
    <TextField {...field.input} label={field.placeholder} type={field.type} />
)

class LogIn extends React.Component{
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(form_props){

        console.log("submit")

        // Calling login action
        this.props.user_auth_action(form_props)

    }

    render(){
        console.log(this.props)
        //console.log(this.state)
        return(
            <Paper elevation={1}>
            <div style={{padding:'30px'}}>
                    <div>
                        <Typography style={{marginBottom:'30px'}} variant="headline" color="inherit">
                        Login Form
                        </Typography>

                    </div>
                <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                    <div style={{marginBottom:'15px'}}>
                        <Field
                            name="login_username"
                            id="login_username"
                            component={renderTextField}
                            type="text"
                            placeholder="User Name"
                        />
                    </div>
                    <div style={{marginBottom:'30px'}}>
                        <Field
                            name="login_password"
                            id="login_password"
                            component={renderTextField}
                            type="password"
                            placeholder="User Password"
                        />
                    </div>
                    <div>
                    <Button type="submit" variant="contained" color="secondary">
                            Login to the app
                        </Button>
                    </div>
                </form>
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
        "user_auth_action":user_auth_action
    }, dispatch)
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form:'loginForm'
    })
)(LogIn)