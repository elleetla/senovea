import React                                from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

// order action 
import { supplier_order_accept } from '../actions/index';
import { supplier_order_reject } from '../actions/index';
class SupplierOrders extends React.Component{

    constructor(props){
        super(props)
        this.handle_supplier_order_accept = this.handle_supplier_order_accept.bind(this)
        this.handle_supplier_order_reject = this.handle_supplier_order_reject.bind(this)
    }

    handle_supplier_order_accept(e){
        console.log(e)
        // order id 
        const order_id= e.target.parentElement.getAttribute('data-orderid')
        this.props.supplier_order_accept(order_id, this.props.user)
    }

    handle_supplier_order_reject(e){
        console.log(e)
        const order_id= e.target.parentElement.getAttribute('data-orderid')
        this.props.supplier_order_reject(order_id, this.props.user)
    }

    render(){

        const SupplierActivesOrders = ( ) => {
            if( this.props.user.user_orders.user_actives_orders !== false ){

                return(
                    this.props.user.user_orders.user_actives_orders.map((order)=>{
                        return(
                            <Card key={order.ID} style={{marginTop:'5px'}}>
                                <CardContent>
                                    <Typography color="primary" variant="subheading"> 
                                        Order ID : {order.ID}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button data-orderid={order.ID} onClick={this.handle_supplier_order_accept} variant="contained" color="primary" size="small">Accept order</Button>
                                    <Button data-orderid={order.ID} onClick={this.handle_supplier_order_reject} variant="contained" color="secondary" size="small">Reject order</Button>
                                </CardActions>
                            </Card>
                        )
                    })
                )


            }else{
                return ('');
            }
        }

        console.log(this)

        return(
                <div style={{padding:'0px'}}>

                        <Paper elevation={1}>
                            <div style={{padding:'15px 30px'}}>
                            <Typography variant="headline" color="inherit">
                                Supplier Orders
                            </Typography>
                            </div>
                        </Paper>

                        <div>
                            <SupplierActivesOrders/>
                        </div>
                </div>

        )
    }

}

function mapStateToProps( state ){
    return {
        "user":state.user,
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        "supplier_order_accept":supplier_order_accept,
        "supplier_order_reject":supplier_order_reject
    }, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(SupplierOrders);