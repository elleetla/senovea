import React from 'react';
import { connect } from 'react-redux'

// import grid Bootstrap
import { Container, Row, Col } from 'reactstrap';

class Home extends React.Component{
    render(){
        console.log(this.props);
        return(
            <div>
                <Container>
                    <Row>
                        <Col xs="12">Page : Home</Col>
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