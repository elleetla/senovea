import React                                from 'react'
import { compose, bindActionCreators }      from 'redux'
import { connect }                          from 'react-redux'
import { Link }                             from 'react-router-dom'

// user logout action 
import { user_logout_action } from '../../actions/index'

// import css
import './Header.css';

import {
    Container,
    Row,
    Col,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

class Header extends React.Component{

    constructor(props){
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
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
                <Navbar light expand="md">
                    <NavbarBrand href="/">Centralis</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink href="/">Accueil</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/about">Présentation</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/suppliers">Fournisseurs</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/users">Acheteurs</NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            { this.props.user.user_auth.auth_token === '' && this.props.user.user_auth.isAuth === false ?
                                <div>
                                    <NavItem>
                                        <NavLink href="#/register">Inscription</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#/login">Connexion</NavLink>
                                    </NavItem>
                                </div>
                                :
                                <div>
                                    <NavItem>
                                        <NavLink href="javascript:void(0)" onClick={this.handleLogOut}>Déconnexion</NavLink>
                                    </NavItem>
                                </div>

                            }
                        </Nav>
                    </Collapse>
                </Navbar>
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
)(Header)




