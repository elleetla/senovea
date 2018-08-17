import React                                from 'react'
import { compose, bindActionCreators }      from 'redux'
import { connect }                          from 'react-redux'
import { Link }                             from 'react-router-dom'
import {urlApi}                             from '../../../../config/config-api';

// import styles
import { Container, Row, Col, } from 'reactstrap';
import './bloc-download.css';

// import assets
import PictoDoc from '../../assets/img/picto_doc.svg';

import { update_modal_settings } from '../../actions/index';

// creation of the class "AllSupliers"
class BlocDownload extends React.Component{
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
        })
    }

    render(){
        return(
            <div style={{marginTop:"100px",marginBottom:"100px"}}>
                <Container>
                    <Row>
                        <Col md={{ size: 6, offset: 3 }}>
                            <div className="connect-bloc">
                                <img src={PictoDoc} className="picto-user"/>
                                <p className="title-connect-bloc">{this.props.titleBloc}</p>
                                <ul>
                                    <li><a href={`${urlApi}/wp-content/uploads/2018/06/offres-3.pdf`} target="_blank">bulletin d'adhésion</a></li>
                                    <li><a href={`${urlApi}/wp-content/uploads/2018/06/offres-3.pdf`} target="_blank">Charte d'adhésion</a></li>
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

export default compose(connect(mapStateToProps, mapDispatchToProps))(BlocDownload)