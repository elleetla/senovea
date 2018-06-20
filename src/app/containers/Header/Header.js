import React                                from 'react'
import { compose, bindActionCreators }      from 'redux'
import { connect }                          from 'react-redux'
import { Link }                             from 'react-router-dom'

// user logout action 
import { user_logout_action } from '../../actions/index'

// import css
import './Header.css';
import Logo from '../../img/logo@2x.png';

import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
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
            isOpen: false,
            modal: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
            modal: !this.state.modal
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
            <div>
            <header id="header-app">
                <Navbar light expand="md">
                    <NavbarBrand href="/">
                        <img id="logo-app" src={Logo} alt=""/>
                    </NavbarBrand>
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
                                <NavLink href="#/users">Acheteurs</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/suppliers">Prestataires</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#">Téléchargement</NavLink>
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
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            {this.props.user.user_email}
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem href="javascript:void(0)" onClick={this.handleLogOut}>
                                                Déconnexion
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div>

                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            </header>


                <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>

            </div>




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




