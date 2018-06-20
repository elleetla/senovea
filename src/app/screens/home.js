import React, { Component } from 'react';
import { connect } from 'react-redux'

// import grid Bootstrap
import { Container, Row, Col } from 'reactstrap';

class Home extends Component{
    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <Col xs="12">Page : Home</Col>
                        {this.props.products.map((dataProduct) => {
                            return(
                                <Col xs="12" id={dataProduct.id}>{dataProduct.name}</Col>
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
        "products": state.products
    }
}

// export
export default connect(mapStateToProps)(Home)