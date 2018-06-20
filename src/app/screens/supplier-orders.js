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
        const order_id= e.target.getAttribute('data-orderid')
        console.log('handle accept')
        console.log(e.target)
        console.log(order_id)
        console.log(this.props.user.user_id)

        this.props.supplier_order_accept(order_id, this.props.user.user_id)
    }

    handle_supplier_order_reject(e){
        console.log(e)
        const order_id= e.target.getAttribute('data-orderid')
        console.log('handle reject')
        console.log(e.target)
        console.log(order_id)
        this.props.supplier_order_reject(order_id, this.props.user.user_id)
    }

    render(){

        console.log('render supplier orders')
        console.log(this)

        return(
                <div style={{padding:'0px'}}>

                        <Paper elevation={1} style={{marginBottom:'15px'}}>
                            <div style={{padding:'15px 30px'}}>
                            <Typography variant="headline" color="inherit">
                                Supplier Orders
                            </Typography>
                            </div>
                        </Paper>

                        <Paper elevation={1} elevation={1} style={{marginBottom:'15px'}}>
                            <div style={{padding:'15px 30px'}}>
                                <Typography variant="subheading" color="inherit">
                                    Supplier Actives Orders
                                </Typography>
                            </div>
                            <Divider />
                            {/*<SupplierActivesOrders allprops={this.props} />*/}
                            { 
                                this.props.user.user_orders.user_actives_orders !== false ?
                                this.props.user.user_orders.user_actives_orders.map((order)=>{
                                        return(
                                            <Card key={order.id}>
                                                <CardContent>
                                                    <Typography color="primary" variant="subheading"> 
                                                        Order ID : {order.id}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <button data-orderid={order.id} onClick={this.handle_supplier_order_accept}>Accept order</button>
                                                    <button data-orderid={order.id} onClick={this.handle_supplier_order_reject}>Reject order</button>
                                                </CardActions>
                                            </Card>
                                        )
                                    }):
                                    null
                            }
                        </Paper>

                        <Paper elevation={1} elevation={1} style={{marginBottom:'15px'}}>
                            <div style={{padding:'15px 30px'}}>
                                <Typography variant="subheading" color="inherit">
                                    Supplier Winned Orders
                                </Typography>
                            </div>
                            <Divider />
                            {/*<SupplierWinnedOrders allprops={this.props} />*/}
                            { 
                                this.props.user.user_orders.user_winned_orders !== false ?
                                this.props.user.user_orders.user_winned_orders.map((order)=>{
                                        return(
                                            <Card key={order.id}>
                                                <CardContent>
                                                    <Typography color="primary" variant="subheading"> 
                                                        Order ID : {order.id}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        )
                                    }):
                                    null
                            }
                        </Paper>

                        <Paper elevation={1}>
                            <div style={{padding:'15px 30px'}}>
                                <Typography variant="subheading" color="inherit">
                                    Supplier Failed Orders
                                </Typography>
                            </div>
                            <Divider />
                            {/*<SupplierFailedOrders allprops={this.props} />*/}
                            { 
                                this.props.user.user_orders.user_failed_orders !== false ?
                                this.props.user.user_orders.user_failed_orders.map((order)=>{
                                        return(
                                            <Card key={order.id}>
                                                <CardContent>
                                                    <Typography color="primary" variant="subheading"> 
                                                        Order ID : {order.id}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        )
                                    }):
                                    null
                            }
                        </Paper>                                                
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