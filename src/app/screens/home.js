import React from 'react';
import { connect } from 'react-redux'
import _ from 'lodash';

// import grid Bootstrap
import { Container, Row, Col } from 'reactstrap';
import Filters from '../containers/Filters/Filters';

class Home extends React.Component{
    render(){
        console.log("home");
        console.log("products");
        console.log(this.props.products);

        return(
            <div>
                <Filters/>
                <Container>
                    <Row>
                        <Col xs="12">Page : Home</Col>
                    </Row>
                    {_.map(this.props.products, (product)=>{
                        return (
                            <h1 key={product.id}>{product.name}</h1>
                        )
                    })}
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