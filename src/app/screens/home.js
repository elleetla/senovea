import React, { Component } from 'react';
import { connect } from 'react-redux'

// import grid Bootstrap
import { Container, Row, Col } from 'reactstrap';

class Home extends Component{
    render(){
        const oldProducts = this.props.products;
        const newProducts = [...oldProducts];
        return(
            <div>
                <Container>
                    <Row>
                        {
                            newProducts.map((data) => {
                                return(
                                    <Col xs="12" key={data.id}>
                                        <div className="article-bloc">
                                            <p>{data.name}</p>
                                        </div>
                                    </Col>
                                )
                            })
                        }
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