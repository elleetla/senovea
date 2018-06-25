import React                                from 'react'
import { compose, bindActionCreators }      from 'redux'
import { connect }                          from 'react-redux'
import { Link }                             from 'react-router-dom'

// user logout action
import { user_logout_action } from '../../actions/index'

import LogIn from '../../screens/login';

// import css
import './Header.css';
import Logo from '../../assets/img/logo.svg';

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
        this.toogleModalConnect = this.toogleModalConnect.bind(this);
        this.toogleModalRegistration = this.toogleModalRegistration.bind(this);
        this.state = {
            isOpen: false,
            modalConnect: false,
            modalRegistration: false
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

    render(){
        const CustomerMenu = () => {
            if( this.props.user.user_auth.auth_token !== '' && this.props.user.user_auth.isAuth !== false ){
                // co
                if( this.props.user.user_auth.isCustomer === true && this.props.user.user_auth.isSupplier === false ){
                    // customer
                    return(
                        <div>
                            <Link to="/cart">
                                <button>
                                    Customer Cart
                                </button>
                            </Link>

                            <Link to="/account">
                                <button>
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
            {/*
            <header id="header-app">
                <Navbar light expand="md">
                    <Link to="/" className="navbar-brand"><img id="logo-app" src={Logo} alt=""/></Link>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <Link to="/" className="nav-link">Accueil</Link>
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
                                <NavLink href="javascript:void(0)">Téléchargement</NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            { this.props.user.user_auth.auth_token === '' && this.props.user.user_auth.isAuth === false ?
                                <div>
                                    <NavItem>
                                        <Link to="/register" className="nav-link">Inscription</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to="/login" className="nav-link">Connexion</Link>
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
                        <Nav>
                            <CustomerMenu/>
                            <SupplierMenu/>
                        </Nav>
                    </Collapse>
                </Navbar>
            </header>
            */}
                <header id="header-app">
                    <Navbar light expand="md">
                        <Link to="/" className="navbar-brand">
                            <img id="logo-app" src={Logo} alt=""/>
                        </Link>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <Link to="/" className="nav-link">Accueil</Link>
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
                                    <NavLink href="#/telechargement">Téléchargement</NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                { this.props.user.user_auth.auth_token === '' && this.props.user.user_auth.isAuth === false ?
                                    <div>
                                        <NavItem>
                                            <Link to="/register" className="nav-link">Inscription</Link>
                                        </NavItem>
                                        {/*<NavItem>
                                            <NavLink onClick={this.toogleModalRegistration}>Inscription test</NavLink>
                                        </NavItem>*/}
                                        <NavItem>
                                            <Link to="/login" className="nav-link">Connexion</Link>
                                        </NavItem>
                                        {/*<NavItem>
                                            <NavLink onClick={this.toogleModalConnect}>Connexion test</NavLink>
                                        </NavItem>*/}
                                        <NavItem>
                                            <NavLink href="javascript:void(0)" onClick={() => {alert("test")}}>Mes paniers</NavLink>
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

                                                {
                                                    this.props.user.user_auth.isCustomer === false && this.props.user.user_auth.isSupplier === true ?
                                                    <Link to="/supplier-orders" className="dropdown-item">Supplier orders</Link>
                                                    :
                                                    <Link to="/account" className="dropdown-item">Mon compte</Link>
                                                }

                                                    {/*<DropdownItem href="javascript:void(0)" onClick={this.handleLogOut}>
                                                        Déconnexion
                                                    </DropdownItem>
                                                    <DropdownItem href="#/account">
                                                        Mon compte
                                                    </DropdownItem>*/}

                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                        <NavItem>
                                            <NavLink onClick={ () => {alert("test")} }>Mes paniers</NavLink>
                                        </NavItem>
                                    </div>

                                }
                            </Nav>
                            {/*}
                            <Nav>
                                <CustomerMenu/>
                                <SupplierMenu/>
                            </Nav>
                            */}
                        </Collapse>
                    </Navbar>
                </header>

                <Modal isOpen={this.state.modalConnect} toggle={this.toogleModalConnect} className={this.props.className}>
                    <ModalHeader toggle={this.toogleModalConnect}>Connectez-vous !</ModalHeader>
                    <ModalBody>
                        {LogIn}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toogleModalConnect}>Se connecter</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalRegistration} toggle={this.toogleModalRegistration} className={this.props.className}>
                    <ModalHeader toggle={this.toogleModalRegistration}>Inscrivez-vous !</ModalHeader>
                    <ModalBody>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toogleModalRegistration}>Do Something</Button>
                        <Button color="secondary" onClick={this.toogleModalRegistration}>Cancel</Button>
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
