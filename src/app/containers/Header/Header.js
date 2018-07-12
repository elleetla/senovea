import React                                from 'react'
import { compose, bindActionCreators }      from 'redux'
import { connect }                          from 'react-redux'
import { Link }                             from 'react-router-dom'

// user logout action
import { user_logout_action } from '../../actions/index'
import { update_modal_settings } from '../../actions/index';
import { update_settings_panier } from '../../actions/index';
import { add_alert } from "../../actions/index"

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
    Input
    } from 'reactstrap';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toogleModalConnect = this.toogleModalConnect.bind(this);
        this.toogleModalRegistration = this.toogleModalRegistration.bind(this);
        this.handleCartToggle = this.handleCartToggle.bind(this);
        this.handleModalToggle = this.handleModalToggle.bind(this)
        this.handleUpdateActivePanier = this.handleUpdateActivePanier.bind(this)

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

    handleModalToggle( component ){

        const modalsize = component === "register" ? "big" : "medium";

        this.props.update_modal_settings( {
            "isOpen":true,
            "title":component,
            "component":component,
            "size":modalsize
        } )

    }

    handleUpdateActivePanier( e ){
        ////console.log('update active panier')
        ////console.log( e.target.value );
        let new_panier_settings = _.cloneDeep(this.props.paniersSettings)
        new_panier_settings.active_panier_id = e.target.value
        this.props.update_settings_panier( new_panier_settings )

        this.props.add_alert({
            "status":"success",
            "content":`<strong>${this.props.paniers[e.target.value].nicename}</strong> est le nouveau panier actif!`
        })

    }

    render(){
        console.log("bkfkfkgkg");
        const old = this.props.paniers;
        const newPaniers = [...old];

        return(
            <div>
                <header id="header-app">
                    <Navbar light expand="md">
                        <Link to="/" className="navbar-brand" style={{lineHeight:"1",display:"flex",alignItems:"center",padding:"0"}}>
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

                                { this.props.user.user_auth.auth_token === '' && this.props.user.user_auth.isAuth === false ?
                                    <Nav className="ml-auto" navbar>
                                        <NavItem>
                                            <NavLink onClick={ ()=>{ this.handleModalToggle( 'register' ) } } className="nav-link">Inscription</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink onClick={ ()=>{ this.handleModalToggle( 'login' ) } } className="nav-link">Connexion</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <Link onClick={ ()=>{ this.handleModalToggle( 'login' ) } } to="/account/paniers" style={{marginLeft:"15px",width:"50px",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                            <img height="auto" className="icon-nav" src={Panier} alt="Icon Panier"/>
                                            </Link>
                                        </NavItem>
                                    </Nav>
                                    :
                                    <Nav className="ml-auto" navbar>
                                        <NavItem>
                                            <Link to="/account/paniers" className="nav-link">{this.props.user.user_email}</Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link to="/account/paniers" style={{width:"50px",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                <img height="auto" className="icon-nav" src={Panier} alt="Icon Panier"/>
                                            </Link>
                                            {newPaniers.length > 0 ?
                                                <span className="counter-panier">
                                                    <p>{this.props.paniers.length}</p>
                                                </span>
                                                :
                                                null
                                            }
                                        </NavItem>
                                    </Nav>
                                }

                        </Collapse>
                    </Navbar>
                </header>

                                {/*
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
                                */}

            </div>
        )
    }

}

function mapStateToProps(state){
    return {
        "user":state.user,
        "paniers":state.paniers,
        "paniersSettings":state.paniersSettings,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        "user_logout_action":user_logout_action,
        "update_modal_settings":update_modal_settings,
        "update_settings_panier":update_settings_panier,
        "add_alert":add_alert,
    }, dispatch)
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(Header)
