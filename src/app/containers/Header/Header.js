import React                                from 'react'
import { compose, bindActionCreators }      from 'redux'
import { connect }                          from 'react-redux'
import { Link }                             from 'react-router-dom'

// user logout action
import { user_logout_action } from '../../actions/index'
import { update_modal_settings } from '../../actions/index';
import { update_settings_panier } from '../../actions/index';
import { add_alert } from "../../actions/index"
import _ from 'lodash';

// import css
import './Header.css';
import Logo from '../../assets/img/logo.svg';
import Panier from '../../assets/img/icon-panier.svg';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.toggle = this.toggle.bind(this);
        this.togglePanier = this.togglePanier.bind(this);
        this.toogleModalConnect = this.toogleModalConnect.bind(this);
        this.toogleModalRegistration = this.toogleModalRegistration.bind(this);
        this.handleCartToggle = this.handleCartToggle.bind(this);
        this.handleModalToggle = this.handleModalToggle.bind(this);
        this.handleUpdateActivePanier = this.handleUpdateActivePanier.bind(this);

        this.state = {
            isOpen: false,
            isOpenPanier: false,
            modalConnect: false,
            modalRegistration: false,
            popoverOpen: false,
            countLots: false,
            dropdownOpen: false,
            dropdownOpenPanier: false
        };
    }

    toggle(){
          this.setState(prevState => ({
               dropdownOpen: !prevState.dropdownOpen
          }));
     }

     togglePanier(){
          this.setState(prevState => ({
               dropdownOpenPanier: !prevState.dropdownOpenPanier
          }));
     }

    toogleModalConnect() {
        this.setState({
            modalConnect: !this.state.modalConnect
        });
    }

    toogleModalRegistration() {
        this.setState({
            modalRegistration: !this.state.modalRegistration
        });
    }

    handleLogOut(){
        this.props.user_logout_action()
    }

    handleCartToggle(){
        this.setState({
             popoverOpen: !this.state.popoverOpen
        });
    }

    handleModalToggle(component){
        const modalSize = component === "register" ? "big" : "medium";
        this.props.update_modal_settings({
            "isOpen": true,
            "title": component,
            "component": component,
            "size": modalSize
        });
    }

    handleUpdateActivePanier(e){
        let new_panier_settings = _.cloneDeep(this.props.paniersSettings);
        new_panier_settings.active_panier_id = e.target.value;
        this.props.update_settings_panier(new_panier_settings);

        this.props.add_alert({
            "status":"success",
            "content":`<strong>${this.props.paniers[e.target.value].nicename}</strong> est le nouveau panier actif!`
        })
    }

    renderBullPaniers(){
        const panierArray = _.keys(this.props.paniers);
        if(panierArray.length !== 0){
            return(
                <div>
                    <span className="counter-panier">
                        <p>{this.props.counterProduct}</p>
                    </span>
                </div>
            )
        }
    }

    detailPanierToogle(){
        const panierActive = this.props.paniersSettings.active_panier_id;
        const detailPanier = this.props.paniers[panierActive];

         if(detailPanier !== undefined){
              return(
                  <DropdownItem>
                       <h6>{detailPanier.nicename}</h6>
                       <span><b>Secteur d'intervention :</b></span>
                       <p>{detailPanier.adresse}</p>
                       {detailPanier.status === "not sended" ?
                           <p style={{textAlign: "center"}}><Link className="btn-white" to={`/account/paniers/${panierActive}`}>Voir le panier</Link></p> : null
                       }
                  </DropdownItem>
              )
         } else {
              return(
                  <DropdownItem>
                       <p>Aucun Panier actif pour le moment</p>
                  </DropdownItem>
              )
         }
    }

    render(){
        console.log("test", this.props);
        return(
            <header id="header-app">
                 <Navbar light expand="md">
                      <Link to="/" className="navbar-brand" style={{lineHeight:"1", display:"flex", alignItems:"center", padding:"0"}}>
                           <img id="logo-app" src={Logo} alt="Logo Centralis"/>
                      </Link>
                      <NavbarToggler onClick={this.toggle} />
                      <Collapse isOpen={this.state.isOpen} navbar>
                           <Nav navbar>
                                <NavItem>
                                     <Link to="/" className={this.props.routeProps.location.pathname === "/" ? "nav-link active" : "nav-link"}>Catalogue</Link>
                                </NavItem>
                                <NavItem>
                                     <Link to="/about" className={this.props.routeProps.location.pathname === "/about" ? "nav-link active" : "nav-link"}>Présentation</Link>
                                </NavItem>
                                <NavItem>
                                     <Link to="/users" className={this.props.routeProps.location.pathname === "/users" ? "nav-link active" : "nav-link"}>Acheteurs</Link>
                                </NavItem>
                                <NavItem>
                                     <Link to="/suppliers" className={this.props.routeProps.location.pathname === "/suppliers" ? "nav-link active" : "nav-link"}>Prestataires</Link>
                                </NavItem>
                                <NavItem>
                                     <Link to="/telechargement" className={this.props.routeProps.location.pathname === "/telechargement" ? "nav-link active" : "nav-link"}>Téléchargement</Link>
                                </NavItem>
                           </Nav>
                           {this.props.user.user_auth.auth_token === '' && this.props.user.user_auth.isAuth === false ?
                               <Nav className="ml-auto" navbar>
                                    <NavItem>
                                         <NavLink onClick={()=>{ this.handleModalToggle('register')}} className="nav-link">Inscription</NavLink>
                                    </NavItem>
                                    <NavItem>
                                         <NavLink onClick={()=>{ this.handleModalToggle('login')}} className="nav-link">Connexion</NavLink>
                                    </NavItem>
                                    <NavItem>
                                         <div onClick={()=>{ this.handleModalToggle('login')}} style={{marginLeft:"15px", width:"50px", height:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                                              <img height="auto" className="icon-nav" src={Panier} alt="Icon Panier"/>
                                         </div>
                                    </NavItem>
                               </Nav>
                               :
                               <Nav className="ml-auto" navbar>
                                    <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                         <DropdownToggle nav caret>
                                              {this.props.user.user_email}
                                         </DropdownToggle>
                                         <DropdownMenu right>
                                              <DropdownItem>
                                                   <Link to="/account/paniers">Mes paniers</Link>
                                              </DropdownItem>
                                              <DropdownItem disabled>Mon profil</DropdownItem>
                                              <DropdownItem disabled>Gestion du mot de passe</DropdownItem>
                                              <DropdownItem>
                                                   <a onClick={ this.props.user_logout_action } href="javascript:void(0)">Déconnexion</a>
                                              </DropdownItem>
                                         </DropdownMenu>
                                    </Dropdown>
                                    <Dropdown nav isOpen={this.state.dropdownOpenPanier} toggle={this.togglePanier}>
                                         <DropdownToggle nav>
                                              <div style={{width:"40px",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                   <img height="auto" className="icon-nav" src={Panier} alt="Icon Panier"/>
                                                   {this.renderBullPaniers()}
                                              </div>
                                         </DropdownToggle>
                                         <DropdownMenu right>
                                              {this.detailPanierToogle()}
                                         </DropdownMenu>
                                    </Dropdown>
                               </Nav>
                           }
                      </Collapse>
                 </Navbar>
            </header>
        )
    }

}

function mapStateToProps(state){

    // Good panier
    const the_panier_id = state.paniersSettings.active_panier_id;
    const the_panier = _.get( _.pick( state.paniers, [the_panier_id] ), the_panier_id, {} )

    // Panier Products
    const lots_mapKeys = _.mapKeys( the_panier.lots, ( lot ) => {
        return lot.panier_lot_id
    });
    ////////console.log('mapStateToProps')
    ////////console.log(lots_mapKeys)
    const lots_mapValues = _.mapValues( lots_mapKeys, ( lot ) => {
        return _.map( lot.panier_lot_articles, ( article ) => {
            return article.panier_article_id
        })
    })
    ////////console.log(lots_mapValues)

    // Filters Lots
    const lotsFiltered = _.mapValues( state.products, ( cat_val, cat_key ) => {
        ////////console.log(cat_val)
        ////////console.log( lots_mapValues )
        const filtered = _.filter(cat_val, (lot_val,lot_key)=>{
            return _.has(lots_mapValues, lot_key)
        })

        return _.isEmpty( filtered ) ?
            {}:
            _.mapKeys( filtered, (lot_val,lot_key) =>{
                return lot_val.lot_id
            })

    } )

    // Filters Products
    let new_product = {};
    let counterProduct = 0;
    for( let cat_name in lotsFiltered ){
        if( _.isEmpty( lotsFiltered[cat_name] ) === false ){
            new_product[cat_name] = {}
            for( let lot_id in lotsFiltered[cat_name] ){
                new_product[cat_name][lot_id] = {}

                new_product[cat_name][lot_id].lot_id = lotsFiltered[cat_name][lot_id].lot_id
                new_product[cat_name][lot_id].lot_name = lotsFiltered[cat_name][lot_id].lot_name
                new_product[cat_name][lot_id].lot_fournisseur_r1 = lotsFiltered[cat_name][lot_id].lot_fournisseur_r1

                let products_array = []
                // Good Products
                for( let product of lotsFiltered[cat_name][lot_id].lot_products ){

                    // Si variation empty
                    if( _.isEmpty( product.variations ) === false ){
                        for( let good_product_id of lots_mapValues[lot_id] ){
                            for( let variation of product.variations ){
                                if( parseInt(variation.variation_id) === parseInt(good_product_id) ){
                                    // ajout
                                    products_array.push( product )
                                    counterProduct = counterProduct + 1;
                                }
                            }
                        }
                    }else{
                        for( let good_product_id of lots_mapValues[lot_id] ){
                            if( parseInt(product.id) === parseInt(good_product_id) ){
                                // ajout
                                products_array.push( product );
                                counterProduct = counterProduct + 1;
                            }
                        }
                    }

                }

                // Add Products
                new_product[cat_name][lot_id].lot_products = products_array;

            }
        }
    }

    return {
        "user":state.user,
        "paniers":state.paniers,
        "paniersSettings":state.paniersSettings,
        "newProduct" : new_product,
        "counterProduct": counterProduct,
         "alerts": state.alerts
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
