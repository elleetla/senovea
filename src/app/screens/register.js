import React                                from 'react'
import { compose, bindActionCreators }      from 'redux'
import { connect }                          from 'react-redux'
import { Field, reduxForm }                 from 'redux-form'

// user auth action 
import { user_register_action } from '../actions/index' 

class Register extends React.Component{
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(formProps){
        console.log('handlesubmit')
        console.log(formProps)

        // Calling register action
        this.props.user_register_action(formProps)
    }   

    render(){
        console.log(this.props)
        console.log(this.state)

        return(
            <div>
                <h1> Register </h1>
                <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                    <div>
                        <label>user_email</label>
                        <Field
                            name="register_email"
                            id="register_email"
                            component="input"
                            type="text"
                            placeholder="email"
                        />
                    </div>
                    <div>
                        <label>user_name</label>
                        <Field
                            name="register_username"
                            id="register_username"
                            component="input"
                            type="text"
                            placeholder="username"
                        />
                    </div>
                    <div>
                        <label>password</label>
                        <Field
                            name="register_password"
                            id="register_password"
                            component="input"
                            type="password"
                        />
                    </div>
                    <div>
                        <button type="submit">register to the app !</button>
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
        "user_register_action":user_register_action
    }, dispatch)
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form:'registerForm'
    })
)(Register)