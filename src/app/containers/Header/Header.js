import React                                from 'react'
import { compose, bindActionCreators }      from 'redux'
import { connect }                          from 'react-redux'
import { Link }                             from 'react-router-dom'

// user logout action
import { user_logout_action } from '../../actions/index'

import LogIn from '../../screens/login'
import Register from '../../screens/register'

// import css
import './Header.css';
import Logo from '../../assets/img/logo.svg';
import Panier from '../../assets/img/icon-panier.svg';

import {
    Modal, ModalHeader, ModalBody,
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    } from 'reactstrap';

class Header extends React.Component{

    constructor(props){
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toogleModalConnect = this.toogleModalConnect.bind(this);
        this.toogleModalRegistration = this.toogleModalRegistration.bind(this);
        this.handleCartToggle = this.handleCartToggle.bind(this);

        this.state = {
            isOpen: false,
            modalConnect: false,
            modalRegistration: false,
            popoverOpen: false

        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toogleModalConnect() {
        this.setState({
            modalConnect: !this.state.modalConnect
        })
    }

    toogleModalRegistration() {
        this.setState({
            modalRegistration: !this.state.modalRegistration
        })
    }

    handleLogOut(){
        // Logout action
        this.props.user_logout_action()
    }

    handleCartToggle(){
        this.setState({
            popoverOpen: !this.state.popoverOpen
          });
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
                                <button>Customer Cart</button>
                            </Link>

                            <Link to="/account">
                                <button>Customer Account</button>
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
                        <Link to="/" className="navbar-brand">
                            <img id="logo-app" src={Logo} alt="Logo Centralis"/>
                        </Link>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <Link to="/" className="nav-link">Catalogue</Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/about" className="nav-link">Présentation</Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/users" className="nav-link">Acheteurs</Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/suppliers" className="nav-link">Prestataires</Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/telechargement" className="nav-link">Téléchargement</Link>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                { this.props.user.user_auth.auth_token === '' && this.props.user.user_auth.isAuth === false ?
                                    <div>
                                        <NavItem>
                                            <NavLink onClick={this.toogleModalRegistration} className="nav-link">Inscription</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink onClick={this.toogleModalConnect} className="nav-link">Connexion</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink>
                                                <img className="icon-nav" src={Panier} alt="Icon Panier"/>
                                            </NavLink>
                                        </NavItem>
                                    </div>
                                    :
                                    <div>
                                        <NavItem>
                                            <Link to="/account/informations" className="nav-link">{this.props.user.user_email}</Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link to="/account/paniers" className="icon-panier" id="cart_icon">
                                                    <img className="icon-nav" src={Panier} alt="Icon Panier"/>
                                                    <span className="counter-panier">
                                                        <p>{console.log("test : " + this.props.paniers.data)}</p>
                                                    </span>
                                            </Link>
                                        </NavItem>
                                    </div>
                                }
                            </Nav>
                        </Collapse>
                    </Navbar>
                </header>

                <Modal id="modal-login" isOpen={this.props.user.user_auth.auth_token === '' ? this.state.modalConnect : this.state.modalConnect = false} toggle={this.toogleModalConnect} className={this.props.className}>
                    <ModalHeader toggle={this.toogleModalConnect}>Connectez-vous !</ModalHeader>
                    <ModalBody>
                        <p className="text-center">Site web privé, réservé aux adhérents, <br/>veuillez vous connecter pour effectuer une recherche</p>
                        <LogIn/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.modalRegistration} toggle={this.toogleModalRegistration} className={this.props.className}>
                    <ModalHeader toggle={this.toogleModalRegistration}>Inscrivez-vous !</ModalHeader>
                    <ModalBody>
                        <Register/>
                    </ModalBody>
                </Modal>

            </div>
        )
    }

}

function mapStateToProps(state){
    return {
        "user":state.user,
        "paniers":state.paniers
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        "user_logout_action":user_logout_action
    }, dispatch)
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(Header)
