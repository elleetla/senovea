import React                                from 'react'
import { compose, bindActionCreators }      from 'redux'
import { connect }                          from 'react-redux'
import { Field, reduxForm }                 from 'redux-form'
import { Link }                             from 'react-router-dom'

// user logout action 
import { user_logout_action } from '../actions/index' 

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCart from '@material-ui/icons/ShoppingCart';

const styles = {
    flex : {flex:1},
    button : {
        marginLeft:5,
        color:'#000',
    },
    button_white : {
        //marginRight:15,
        marginLeft:5,
        color:'#FFF',
    },
    link : {
        color:'#FFF',
        textDecoration:'none',
    }
}

class AppNav extends React.Component{

    constructor(props){
        super(props)
        this.handleLogOut = this.handleLogOut.bind(this)
    }

    handleLogOut(){
        // Logout action
        this.props.user_logout_action()
    }

    render(){
        console.log('appnav')
        console.log(this.props)
        const CustomerMenu = (  ) => {
            if( this.props.user.user_auth.auth_token !== '' && this.props.user.user_auth.isAuth !== false ){
                // co
                if( this.props.user.user_auth.isCustomer === true && this.props.user.user_auth.isSupplier === false ){
                    // customer
                    return(
                    <div>
                        <Link className={this.props.classes.link} to="/cart" >
                            <Button className={this.props.classes.button_white} variant="contained" color="secondary">
                                Customer Cart
                            </Button>
                            {/*<IconButton color="inherit">
                                <ShoppingCart />
                            </IconButton>
                            */}
                        </Link>

                        <Link className={this.props.classes.link} to="/account" >
                            <Button className={this.props.classes.button_white} variant="contained" color="secondary">
                                Customer Account
                            </Button>
                            {/*<IconButton color="inherit">
                                <AccountCircle />
                            </IconButton>*/}
                        </Link>
                    </div>
                    )
                }else{
                    return('');
                }
            }else{
                return('');
            }
        }
        const SupplierMenu = (  ) => {
            if( this.props.user.user_auth.auth_token !== '' && this.props.user.user_auth.isAuth !== false ){
                // co
                if( this.props.user.user_auth.isCustomer === false && this.props.user.user_auth.isSupplier === true ){
                    // customer
                    return(
                    <div>
                        <Link className={this.props.classes.link} to="/supplier-orders" >
                            <Button className={this.props.classes.button_white} variant="contained" color="secondary">
                                Supplier orders
                            </Button>
                        </Link>
                    </div>
                    )
                }else{
                    return('');
                }
            }else{
                return('');
            }
        }
        return(
            <div style={{marginBottom:'8px'}}>
                <div style={{marginBottom:'0'}}>
            <AppBar style={{marginBottom:'8px',padding:'0'}} position="static" color="inherit" elevation={0}>
                <Toolbar style={{minHeight:'auto',padding:'0'}}>
                    <Typography variant="title" color="inherit" className={this.props.classes.flex}>

                    </Typography>

                    { 
                        this.props.user.user_auth.auth_token === '' && this.props.user.user_auth.isAuth === false ?

                            <div>
                                <Link to="/register">
                                    <Button className={this.props.classes.button} variant="outlined" color="default">
                                        Request invite
                                    </Button>
                                </Link>
                                <Link to="/login">
                                    <Button className={this.props.classes.button} variant="outlined" color="default">
                                        Customer/Supplier Login
                                    </Button>
                                </Link>
                            </div>
                            
                            :

                            <a href="javascript:void(0)" onClick={this.handleLogOut}>
                                <Button className={this.props.classes.button} variant="outlined" color="default">
                                    Logout
                                </Button>
                            </a>
                    }
                </Toolbar>
            </AppBar>
                </div>
            <AppBar position="static"  elevation={1}>
                <Toolbar>
                    <Typography variant="title" color="inherit" className={this.props.classes.flex}>
                        <Link className={this.props.classes.link} to="/">Senovea-spa</Link>
                    </Typography>

                    {/*
                    <Link className={this.props.classes.link} to="/offers" >
                        <Button className={this.props.classes.button_white} variant="contained" color="secondary">
                            All offers
                        </Button>
                    </Link>
                    */}

                    <Link className={this.props.classes.link} to="/users" >
                        <Button className={this.props.classes.button_white} variant="contained" color="primary">
                            All Users
                        </Button>
                    </Link>

                    <Link className={this.props.classes.link} to="/suppliers" >
                        <Button className={this.props.classes.button_white} variant="contained" color="primary">
                            All Suppliers
                        </Button>
                    </Link>

                    <Link className={this.props.classes.link} to="/about" >
                        <Button className={this.props.classes.button_white} variant="contained" color="primary">
                            About
                        </Button>
                    </Link>

                    {/*
                    <Link className={this.props.classes.link} to="/account" >
                        <Button className={this.props.classes.button_white} variant="contained" color="secondary">
                            My Account
                        </Button>
                    </Link>

                     <Link className={this.props.classes.link} to="/cart" >
                        <Button className={this.props.classes.button_white} variant="contained" color="secondary">
                            My Cart
                        </Button>
                    </Link>
                    */}

                    <CustomerMenu/>
                    <SupplierMenu/>

                </Toolbar>
            </AppBar>
            </div>
        )
    }
    
} 


function mapStateToProps( state ){

    return {
        "user":state.user,
        //"supplier":state.supplier,
        //"auth":state.auth
    }

}

function mapDispatchToProps( dispatch ){

    return bindActionCreators({
        "user_logout_action":user_logout_action
    }, dispatch)

}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(AppNav)




