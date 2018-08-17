import React                                from 'react'
import { compose, bindActionCreators }      from 'redux'
import { connect }                          from 'react-redux'
import { Link }                             from 'react-router-dom'

// import styles
import { Container, Row, Col, } from 'reactstrap';
import './bloc-connect.css';

// import assets
import PictoUser from '../../assets/img/picto_user.svg';

import { update_modal_settings } from '../../actions/index';

// creation of the class "AllSupliers"
class BlocConnect extends React.Component{
    constructor(props){
        super(props)
        this.handleModalToggle = this.handleModalToggle.bind(this)
    }

    handleModalToggle( component ){

        const modalsize = component === "register" ? "big" : "medium";

        this.props.update_modal_settings( {
            "isOpen":true,
            "title":component,
            "component":component,
            "size":modalsize
        } )

    }

    render(){
        return(
            <div style={{marginTop:"100px",marginBottom:"100px"}}>
                <Container>
                    <Row>
                        <Col md={{ size: 6, offset: 3 }}>
                            <div className="connect-bloc">
                                <img src={PictoUser} className="picto-user"/>
                                <p className="title-connect-bloc">{this.props.titleBloc}</p>
                                <ul>
                                    <li><a href="javascript:void(0)" onClick={ ()=>{ this.handleModalToggle( 'login' ) } }>Connexion</a></li>
                                    <li><a href="javascript:void(0)"  onClick={ ()=>{ this.handleModalToggle( 'register' ) } }>Inscription</a></li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{

    }
}

// export
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        "update_modal_settings":update_modal_settings
    }, dispatch)
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(BlocConnect)