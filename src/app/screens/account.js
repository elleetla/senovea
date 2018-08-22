import React from 'react'
import ReactDOM from 'react-dom'

import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Redirect, Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import {urlfront} from '../../../config/config-api';

import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';

// user auth action 
import { user_update_action } from '../actions/index';
import { user_logout_action } from '../actions/index';

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


class Account extends React.Component{

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(formProps){
        formProps.update_id = this.props.user.user_id;
        this.props.user_update_action(formProps)
        //console.log("submit")
        //console.log(formProps)
    }

    render(){
        const account_data = {
            'update_user_email':this.props.user.user_email,
            'update_user_name':this.props.user.user_name,
        };
        const activeStep = this.props.user.user_auth.isValidated ? 2 : 1;

        return(
            <Container style={{margin:"25px auto"}}>
                <Row>
                    <Col md={3}>
                        <ul className="nav-account">
                             <li><Link to="/account/paniers" className={window.location.href === `${urlfront}/account/paniers` ? "active" : null}>Mes paniers</Link></li>
                             <li><a href="#" className={window.location.href === `${urlfront}/account/profil` ? "active" : null}>Mon profil</a></li>
                             <li><a onClick={ this.props.user_logout_action } href="javascript:void(0)">Déconnexion</a></li>
                        </ul>
                    </Col>
                    <Col md={9}>
                        {this.props.children}
                    </Col>
                </Row>
            </Container>
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
        "user_update_action":user_update_action,
        "user_logout_action":user_logout_action
    }, dispatch)
}

export default compose(

    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form:'updateForm'
    })

)(Account)