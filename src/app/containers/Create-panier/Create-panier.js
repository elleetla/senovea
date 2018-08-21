import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";

// Actions
import { load_panier } from '../../actions/index';
import { add_panier } from '../../actions/index';
import { delete_panier } from '../../actions/index';
import { update_panier } from '../../actions/index';
import { update_settings_panier } from '../../actions/index';
import { update_modal_settings } from '../../actions/index';
import { add_alert } from "../../actions/index"

// React Strap 
import {
    Container,
    Row,
    Col,
    FormGroup,
    Input } from 'reactstrap';

// import style
import './Create-panier.css';

class CreatePanier extends Component{
    constructor(props){
        super(props);
        this.state = {
            modal_create_panier_status : false
        };
        this.handleToggleModalCreatePanier = this.handleToggleModalCreatePanier.bind(this);
        this.handleUpdateActivePanier = this.handleUpdateActivePanier.bind(this);
    }

    handleToggleModalCreatePanier(){
        this.props.update_modal_settings( {
            "isOpen":true,
            "title":"panier_create",
            "component":"panier_create",
            "size":"medium"
        });
    }
    handleUpdateActivePanier( e ){
        let new_panier_settings = _.cloneDeep(this.props.paniersSettings);
        new_panier_settings.active_panier_id = e.target.value;
        this.props.update_settings_panier( new_panier_settings );

        this.props.add_alert({
            "status":"success",
            "content":`<strong>${this.props.paniers[e.target.value].nicename}</strong> est le nouveau panier actif!`
        });
    }

    render(){
        return(
                this.props.user.user_auth.auth_token !== '' && this.props.user.user_auth.isAuth !== false ?
                <div id="nav-create-panier">
                    <Container>
                        <Row>
                            <Col lg="7">
                            {this.props.paniers.length !== 0 ?
                                <FormGroup style={{margin: "0px"}}>
                                    <Input type="select" onChange={this.handleUpdateActivePanier} value={this.props.paniersSettings.active_panier_id} name="select_panier" id="select_panier">
                                        {_.map(this.props.paniers, (panier, i) => {
                                            return(
                                                <option key={i} id={i} value={i}>{panier.nicename}</option>
                                            )
                                        }) }
                                    </Input>
                                </FormGroup>
                                :
                                <p>
                                    <b>Vous n’avez pas encore de panier</b>
                                </p>
                            }
                            </Col>

                            <Col lg="5" className="text-right">
                                <button onClick={this.handleToggleModalCreatePanier} className="btn-white btn btn-secondary">{this.props.paniers.length === 0 ? "CRÉER UN PANIER" : "CRÉER UN NOUVEAU PANIER"}</button>
                            </Col>
                        </Row>
                    </Container>
                </div>
                :
                null
        )
    }
}

// export
function mapStateToProps(state){
    return {
        "products": state.products,
        "user": state.user,
        "paniers":state.paniers,
        "paniersSettings":state.paniersSettings,
        "modalSettings":state.modalSettings,
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
        "update_settings_panier":update_settings_panier,
        "update_modal_settings":update_modal_settings,
        "add_alert":add_alert,
    },dispatch)
}

// export
export default compose(connect(mapStateToProps, mapDispatchToProps))(CreatePanier)