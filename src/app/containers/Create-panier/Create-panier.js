import React, { Component } from 'react';

// import style
import './Create-panier.css';
import { Container, Row, Col} from 'reactstrap';
import {connect} from "react-redux";

class CreatePanier extends Component{
    render(){
        return(
            !this.props.user.user_auth.auth_token === false ?
                <div id="nav-create-panier">
                    <Container>
                        <Row>
                            <Col lg="8">
                                <p><b>Vous n’avez pas encore de panier</b></p>
                            </Col>
                            <Col lg="4" className="text-right">
                                <button className="btn-white" onClick={() => { alert("Test create Panier") }}>CRÉER UN NOUVEAU PANIER</button>
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
        "user": state.user
    }
}

// export
export default connect(mapStateToProps)(CreatePanier)