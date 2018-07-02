import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import { Field, reduxForm } from 'redux-form';

// Actions
import { load_panier } from '../../actions/index';
import { add_panier } from '../../actions/index';
import { delete_panier } from '../../actions/index';
import { update_panier } from '../../actions/index';
import { update_settings_panier } from '../../actions/index';

// React Strap 
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

// import style
import './Create-panier.css';

const renderField = (props) => {

    console.log("renderField")
    console.log(props)
    //console.log(props)
    return (
      <div className="">
        {/*<input type="text" {...props} {...props.input}/>*/}
        <Input type="text" {...props} {...props.input} style={{width:"100%"}}/>
        {/*{props.touched && props.error && <span className="error">{props.error}</span>}*/}
      </div>
    )
}

class CreatePanier extends Component{
    constructor(props){
        super(props)

        this.state = {
            modal_create_panier_status : false
        }

        this.handleCreatePanier = this.handleCreatePanier.bind(this);
        this.handleToggleModalCreatePanier = this.handleToggleModalCreatePanier.bind(this);
        this.handleCreatePanierSubmit = this.handleCreatePanierSubmit.bind(this)
        this.handleUpdateActivePanier = this.handleUpdateActivePanier.bind(this);
    }
    handleCreatePanier(){
        //console.log('creation panier')
    }
    handleToggleModalCreatePanier(){
        this.setState({
            modal_create_panier_status : !this.state.modal_create_panier_status
        })
    }
    handleUpdateActivePanier( e ){
        //console.log('update active panier')
        //console.log( e.target.value );
        let new_panier_settings = _.cloneDeep(this.props.paniersSettings)
        new_panier_settings.active_panier_id = e.target.value
        this.props.update_settings_panier( new_panier_settings )

    }
    handleCreatePanierSubmit(Formprops){
        //console.log(Formprops)
        // handlePanierCreation 
        const user_id = this.props.user.user_id;
        this.props.add_panier(Formprops, user_id, ( status, new_panier_id )=>{
            this.handleToggleModalCreatePanier();
            if( status === "success" ){
                //this.handleUpdateActivePanier(new_panier_id);
                // Ici on met le nouveau panier en panier actif 
                let new_panier_settings = _.cloneDeep(this.props.paniersSettings)
                new_panier_settings.active_panier_id = new_panier_id
                this.props.update_settings_panier(new_panier_settings);
            } 
        });
    }
    render(){
        console.log("render create panier");
        console.log(this);
        return(
                <Container>
                { this.props.user.user_auth.auth_token !== '' && this.props.user.user_auth.isAuth !== false ?
                
                <div id="nav-create-panier">
                <Row>
                    <Col lg="8">
                    {
                        this.props.paniers.length !== 0 ? 
                        <FormGroup>
                            <Label for="select_panier"><strong>Mon panier actif:</strong></Label>
                            <select onChange={this.handleUpdateActivePanier} value={this.props.paniersSettings.active_panier_id} name="select_panier" id="select_panier">
                                {_.map(this.props.paniers, (panier, i)=>{
                                    return(
                                        <option key={i} id={i} value={i}>{panier.nicename}</option>
                                    )
                                })}
                            </select>
                        </FormGroup>
                        :
                        <p><b>Vous n’avez pas encore de panier</b></p>
                    }
                        
                    </Col>                        
                    <Col lg="4" className="text-right">
                        <button onClick={this.handleToggleModalCreatePanier} className="btn-white btn btn-secondary">CRÉER UN NOUVEAU PANIER</button>
                    </Col>                    
                </Row>
                <div>
                    <Modal isOpen={this.state.modal_create_panier_status} toggle={this.handleToggleModalCreatePanier} className={this.props.className}>
                        <ModalHeader toggle={this.handleToggleModalCreatePanier}> Créer un nouveau panier </ModalHeader>
                        <Form onSubmit={this.props.handleSubmit(this.handleCreatePanierSubmit)}>
                            <ModalBody>
                                <FormGroup>
                                <Label for="create_panier_arrondissement">Arrondissement Napoléonien</Label>
                                <Field
                                    name="create_panier_arrondissement"
                                    id="create_panier_arrondissement"
                                    component={renderField}
                                    //component="input"
                                    type="text"
                                    placeholder="Arrondissement Napoléonien"
                                    value={this.props.user.user_arrondissement}
                                    initialValues={this.props.user.user_arrondissement}
                                    disabled
                                />
                                </FormGroup>
                                <FormGroup>
                                <Label for="create_panier_code">Code Postal</Label>
                                <Field
                                    name="create_panier_code"
                                    id="create_panier_code"
                                    component={renderField}
                                    type="text"
                                    placeholder="Code Postal"
                                />
                                </FormGroup>
                                <FormGroup>
                                <Label for="create_panier_adresse">Adresse d'Intervention</Label>
                                <Field
                                    name="create_panier_adresse"
                                    id="create_panier_adresse"
                                    component={renderField}
                                    type="text"
                                    placeholder="Adresse d'Intervention"
                                />
                                </FormGroup>
                                <FormGroup>
                                <Label for="create_panier_nom">Nom du Panier</Label>
                                <Field
                                    name="create_panier_nom"
                                    id="create_panier_nom"
                                    component={renderField}
                                    type="text"
                                    placeholder="Nom du Panier"
                                />
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" type="submit">Créer Panier</Button>
                                <Button color="secondary" type="button" onClick={this.handleToggleModalCreatePanier}>Cancel</Button>
                            </ModalFooter>
                        </Form>
                    </Modal>
                </div>
                </div> 
                :
                null
                }
                </Container>
        )
    }
}

// export
function mapStateToProps(state){
    console.log( "create panier state" )
    console.log( state )
    return {

        "products": state.products,
        "user": state.user,

        "paniers":state.paniers,
        "paniersSettings":state.paniersSettings,

        "initialValues":{
            'create_panier_arrondissement':state.user.user_arrondissement,
        }

    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({

        "load_panier":load_panier,
        "add_panier":add_panier,
        "delete_panier":delete_panier,
        "update_panier":update_panier,
        "update_settings_panier":update_settings_panier

    },dispatch)
}

// export
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        "form":'createPanierForm',
    })
)(CreatePanier)