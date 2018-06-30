import React from 'react';
import { connect } from 'react-redux';

// import grid Bootstrap
import { Container, Row, Col } from 'reactstrap';

class AllUsers extends React.Component{
    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <Col xs="12">Page : Acheteurs</Col>
                        { this.props.user.map((dataUser)=>{
                            return(
                                <p>{dataUser.name}</p>
                            )
                        })}
                    </Row>
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        "products": state.products,
        "user": state.user
    }
}

export default connect(mapStateToProps)(AllUsers);

