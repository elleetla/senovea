import React                                from 'react'
import { compose, bindActionCreators }      from 'redux'
import { connect }                          from 'react-redux'
import { Field, reduxForm }                 from 'redux-form'

// import style
import TextField from '@material-ui/core/TextField';
import { Form, FormGroup, Row, Col, Input, Label } from 'reactstrap';
import LoadingSvg from '../assets/img/icon-preloader-connect.svg';

// user auth action 
import { user_auth_action } from '../actions/index' ;
import { call_product } from '../actions/index' ;
import { load_panier } from '../actions/index' ;
import { update_settings_panier } from '../actions/index';

// Fields
const renderTextField = ( field ) => {
    console.log("renderTextField")
    console.log(field)

    let invalidValue = false;
    if( field.meta.touched ){
        if( field.meta.error ){
            invalidValue = true;
        }
    }

    return(
        <Input {...field.input} id={field.id} placeholder={field.placeholder} type={field.type} invalid={ invalidValue } />
    )
};

class LogIn extends React.Component{

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            loadingBtn : false
        };
    }

    clickLoadingBtn(){
        this.setState({
            loadingBtn : true
        });
    };

    handleSubmit(form_props){

        console.log( "handleSubmit" );
        console.log( form_props );

        // Calling login action
        this.props.user_auth_action(form_props,(status)=>{
            if( status === "success" ){
            // Si c'est le cas on load les paniers
            // & On load les products 
                this.props.call_product(this.props.user.user_arrondissement)
                this.props.load_panier(this.props.user.user_id, (panier_status)=>{
                    // On update le panier actif 
                    // Par le dernier panier updaté
                    if( panier_status === "success" ){
                        let new_panier_settings = _.cloneDeep(this.props.paniersSettings)
                        new_panier_settings.active_panier_id = _.findLastKey(this.props.paniers)
                        this.props.update_settings_panier(new_panier_settings);
                    }
                })
            }
        })

    }

    render(){

        return(
            <Row>
                <Col md="12">
                    <Form onSubmit={this.props.handleSubmit(this.handleSubmit)}>

                            <FormGroup>
                                <Label>User Name</Label>
                                <Field
                                    name="login_username"
                                    id="login_username"
                                    component={renderTextField}
                                    type="text"
                                    placeholder="User Name"
                                />
                            </FormGroup>

                            <FormGroup> 
                                <Label>User Password</Label>
                                <Field
                                    name="login_password"
                                    id="login_password"
                                    component={renderTextField}
                                    type="password"
                                    placeholder="User Password"
                                />
                            </FormGroup>

                            <FormGroup>
                                <button id="btn-connect-modal" type="submit" className="btn-green" onClick={this.clickLoadingBtn.bind(this)}>
                                    Se connecter
                                    { this.state.loadingBtn === true ?
                                        <div className="preloader-connect-user"><img src={LoadingSvg}/></div>
                                        :
                                        null
                                    }
                                </button>
                            </FormGroup>

                    </Form>
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
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        "user_auth_action":user_auth_action,
        "call_product":call_product,
        "load_panier":load_panier,
        "update_settings_panier":update_settings_panier
    }, dispatch)
}

const validate = ( values ) => {

    const errors = {}
    if (!values.login_username) {
        errors.login_username = true
    }
    if (!values.login_password) {
        errors.login_password = true
    }
    return errors

}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form:'loginForm',
        validate
    })
)(LogIn)