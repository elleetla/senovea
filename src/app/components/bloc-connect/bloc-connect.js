// import components react
import React, {Component} from 'react';

// import styles
import { Container, Row, Col, } from 'reactstrap';
import './bloc-connect.css';

// import assets
import PictoUser from '../../assets/img/picto_user.svg';

// creation of the class "AllSupliers"
class BlocConnect extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <Container>
                    <Row className="mt-5 mb-5">
                        <Col md={{ size: 6, offset: 3 }}>
                            <div className="connect-bloc">
                                <img src={PictoUser} className="picto-user"/>
                                <p className="title-connect-bloc">{this.props.titleBloc}</p>
                                <ul>
                                    <li><a onClick={()=>{alert("connexion")}}>Connexion</a></li>
                                    <li><a onClick={()=>{alert("Inscription")}}>Inscription</a></li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

// export
export default BlocConnect;