import React                                from 'react'
import { compose, bindActionCreators }      from 'redux'
import { connect }                          from 'react-redux'
import { Field, reduxForm }                 from 'redux-form'

// user auth action 
import { user_auth_action } from '../actions/index' 

class LogIn extends React.Component{
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(formProps){
        console.log("submit")
        console.log(formProps)

        // Calling login action
        this.props.user_auth_action(formProps)
    }

    render(){
        //console.log(this.props)
        //console.log(this.state)
        return(
            <div>
                <h1> Log In </h1>
                <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                    <div>
                        <label>user_name</label>
                        <Field
                            name="login_username"
                            id="login_username"
                            component="input"
                            type="text"
                            placeholder="username"
                        />
                    </div>
                    <div>
                        <label>password</label>
                        <Field
                            name="login_password"
                            id="login_password"
                            component="input"
                            type="password"
                        />
                    </div>
                    <div>
                        <button type="submit">login to the app !</button>
                    </div>
                </form>
            </div>
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