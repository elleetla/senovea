import React                                from 'react'
import { compose, bindActionCreators }      from 'redux'
import { connect }                          from 'react-redux'
import { Link }                             from 'react-router-dom'

// user logout action 
import { user_logout_action } from '../../actions/index'

// import css
import './header-app.css';

class AppNav extends React.Component{

    constructor(props){
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this)
    }

    handleLogOut(){
        // Logout action
        this.props.user_logout_action()
    }

    render(){
        const CustomerMenu = () => {
            if( this.props.user.user_auth.auth_token !== '' && this.props.user.user_auth.isAuth !== false ){
                // co
                if( this.props.user.user_auth.isCustomer === true && this.props.user.user_auth.isSupplier === false ){
                    // customer
                    return(
                    <div>
                        <Link to="/cart">
                            <Button>
                                Customer Cart
                            </Button>
                        </Link>

                        <Link to="/account">
                            <button color="secondary">
                                Customer Account
                            </button>
                        </Link>
                    </div>
                    )
                } else {
                    return null;
                }
            } else {
                return null;
            }
        };

        const SupplierMenu = (  ) => {
            if( this.props.user.user_auth.auth_token !== '' && this.props.user.user_auth.isAuth !== false ){
                // co
                if( this.props.user.user_auth.isCustomer === false && this.props.user.user_auth.isSupplier === true ){
                    // customer
                    return(
                    <div>
                        <Link to="/supplier-orders">
                            <button>
                                Supplier orders
                            </button>
                        </Link>
                    </div>
                    )
                } else {
                    return null
                }
            } else {
                return null
            }
        }

        return(
            <header id="header-app">
                            {
                                this.props.user.user_auth.auth_token === '' && this.props.user.user_auth.isAuth === false ?
                                    <div>
                                        <Link to="/register">
                                            <button>
                                                Request invite
                                            </button>
                                        </Link>
                                        <Link to="/login">
                                            <button>
                                                Customer/Supplier Login
                                            </button>
                                        </Link>
                                    </div>
                                    :
                                    <a href="javascript:void(0)" onClick={this.handleLogOut}>
                                        <button>
                                            Logout
                                        </button>
                                    </a>
                            }
            <div>
                <div>
                    <div>
                        <Link to="/">Senovea-spa</Link>
                    </div>

                    <Link to="/users" >
                        <button>
                            All Users
                        </button>
                    </Link>

                    <Link to="/suppliers" >
                        <button>
                            All Suppliers
                        </button>
                    </Link>

                    <Link to="/about" >
                        <button>
                            About
                        </button>
                    </Link>

                    <CustomerMenu/>
                    <SupplierMenu/>

                </div>
            </div>
            </header>
        )
    }
    
} 

function mapStateToProps(state){
    return {
        "user":state.user
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        "user_logout_action":user_logout_action
    }, dispatch)
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(AppNav)




