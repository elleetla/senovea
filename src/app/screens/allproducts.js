import React from 'react';
import {connect} from "react-redux"
import { bindActionCreators } from "redux"
import _ from "lodash"

// import grid Bootstrap
import { Container, Row, Col } from 'reactstrap';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';


import { order_product } from '../actions/index';
 

class AllProducts extends React.Component{

    constructor(props){
        super(props)
        this.handleOrderProduct = this.handleOrderProduct.bind(this)
    }

    handleOrderProduct( e ){
        console.log("handleAllProduct")
        console.log( e.target.getAttribute('data-productid') )
        // action call
        this.props.order_product( this.props.user.user_id, e.target.getAttribute('data-productid') )
    }

    render() {
        console.log("allproducts")
        console.log(this.props)
        return(
            <div>
                <Container>
                    <Row>
                        <Col xs="12">Page : all products</Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                        {_.map(this.props.products, (product)=>{
                            return (
                                <Card key={product.id} style={{marginTop:"15px", marginBottom:"15px"}}>
                                    <CardContent>
                                        <Typography color="primary" variant="subheading"> 
                                            Product ID : {product.id}
                                        </Typography>
                                        <Typography color="primary" variant="subheading"> 
                                            Product Name : {product.name}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <button data-productid={product.id} onClick={this.handleOrderProduct}>Order Product</button>
                                    </CardActions>
                                </Card>
                            )
                        })}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

}
function mapStateToProps(state){
    return{
        "user":state.user,
        "products":state.products
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        "order_product":order_product
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)