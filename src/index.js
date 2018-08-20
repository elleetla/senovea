// config 
import { WORDPRESS_API_BASE_URL } from '../config/config-api'

// dependance 
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware, bindActionCreators } from 'redux'
import { rootReducers } from './app/reducers/reducers'
import { Transition,CSSTransition,TransitionGroup } from 'react-transition-group';
import { TweenMax,TimelineLite } from "gsap";
import _ from "lodash"
import thunk from 'redux-thunk'
import axios from 'axios'


// components / containers
import Routing from './app/containers/routing'
import AppNav from './app/containers/Header/Header'
import Home from './app/screens/home'
import Register from './app/screens/register'
import LogIn from './app/screens/login'
import { LogOut } from './app/screens/logout'
import Account from './app/screens/account'
import {Cart} from './app/screens/cart'
import AllUsers from './app/screens/allusers'
import AllSuppliers from './app/screens/allsuppliers'
import {About} from './app/screens/about'
import {Downloading} from "./app/screens/downloading";
import SupplierOrders from './app/screens/supplier-orders'
import AllProducts from './app/screens/allproducts'
import AccountPaniers from "./app/screens/account-paniers";
import AccountInformations from "./app/screens/account-informations";
import AccountPaniersDetail from "./app/screens/account-paniers-detail";
import GlobalLoading from './app/screens/globalLoading'
import SupplierAccept from './app/screens/supplieraccept'
import SupplierReject from './app/screens/supplierreject'
import Filters from './app/containers/Filters/Filters';
import CreatePanier from './app/containers/Create-panier/Create-panier';
import Footer from './app/components/Footer/Footer';
import ModalSenovea from './app/containers/Modal/modal'
import Alerts from './app/containers/Alerts/alerts'

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

// ACTIONS CREATORS
import { user_load_action } from './app/actions/index';
import { call_product } from './app/actions/index';
import { load_panier } from './app/actions/index';
import { get_order } from './app/actions/index';

import { update_app_settings } from './app/actions/index';
import { update_settings_panier } from './app/actions/index';
import { update_modal_settings } from './app/actions/index';
import { add_alert } from './app/actions/index';


                // TEST PDF 
                /*axios.post( 'http://senovea-wp.brauperle/wp-json/centralis/v2/pdf/generate', {}, {
                    headers:{
                        'Authorization' : `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9zZW5vdmVhLXdwLmJyYXVwZXJsZSIsImlhdCI6MTUzMjk0MTg2NywibmJmIjoxNTMyOTQxODY3LCJleHAiOjE1MzM1NDY2NjcsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.SVDCWAr2DgFzuWOm8aZivK-eQP5ZMgLKz7kUH71IHnU`
                    }
                }).then( (response) => {

                    console.log(reponse)
                    console.log('row')

                }).catch( (error) => {
                    console.log(error)
                })*/

const store = applyMiddleware(thunk)(createStore);

// https://stackoverflow.com/questions/43209666/react-router-v4-cannot-get-url
// https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writting-manually
// https://stackoverflow.com/questions/35604617/react-router-with-optional-path-parameter
class App extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            cookieMentions : true
        };

        this.handleOutsideModalClicks = this.handleOutsideModalClicks.bind(this);
    }

    closeCookies(){
        return this.setState({
            cookieMentions: false
        });
    }

    componentDidMount() { 

        /*
        axios.get('http://api.football-data.org/v2/competitions', {
            'headers' : {'X-Auth-Token': '354d9ebebc7046dc8ea2262797d8c48a'}
        }).then((response)=>{
            console.log(response);
        }).catch((error)=>{
            console.log(error)
        })
        */

        ////console.log("componentDidMount")

        // Quand l'application se lance 

        // Enclencher le Global loading

        // vérifier si user est en mémoire

        this.props.user_load_action((status)=>{

            ////console.log(status)

            if( status === "success" ){


                // LOAD PRODUCT

                this.props.call_product( this.props.user.user_auth.auth_token , this.props.user.user_arrondissement, ( products_status )=>{
                    ////console.log("products_status")
                    ////console.log(products_status)
                    if( products_status === "success" ){
                        this.props.add_alert({
                            "status":"success",
                            "content":`Récupération des prestations.`
                        })
                    }else{
                        this.props.add_alert({
                            "status":"error",
                            "content":`Erreur lors du chargement des prestations.`
                        })
                    }
                })

                // LOAD PANIER

                this.props.load_panier( this.props.user.user_auth.auth_token , ( panier_status )=>{
                    // On update le panier actif 
                    // Par le dernier panier updaté
                    if( panier_status === "success" ){
                        ////console.log('les paniers')
                        ////console.log(this.props.paniers)
                        let new_panier_settings = _.cloneDeep(this.props.paniersSettings)
                        ////console.log(this.props.paniers)
                        new_panier_settings.active_panier_id = _.findLastKey(this.props.paniers)
                        this.props.update_settings_panier(new_panier_settings);
                        this.props.add_alert({
                            "status":"success",
                            "content":`Récupération des paniers de ${this.props.user.user_email}`
                        })
                    }else{
                        this.props.add_alert({
                            "status":"error",
                            "content":`Erreur lors du chargement des paniers de ${this.props.user.user_email}`
                        })
                    }
                })

                // LOAD ORDER

                this.props.get_order( this.props.user.user_auth.auth_token , ( order_status ) => {

                    if( order_status === "success" ){
                        this.props.add_alert({
                            "status":"success",
                            "content":`Récupération des orders de ${this.props.user.user_email}`
                        })
                    }else{
                        this.props.add_alert({
                            "status":"error",
                            "content":`Récupération des orders de ${this.props.user.user_email}`
                        })
                    }

                } )

                this.props.add_alert({
                    "status":"success",
                    "content":`Connexion de ${this.props.user.user_email}`
                })

                // on update les app settings 
                let new_app_settings = _.cloneDeep(this.props.appSettings);
                new_app_settings.globalLoading = false
                this.props.update_app_settings( new_app_settings )



            }else{

                /*this.props.add_alert({
                    "status":"error",
                    "content":`Erreur lors du chargement du profil utilisateur. Veuillez vérifier vos identifiants.`
                })*/

                // on update les app settings 
                let new_app_settings = _.cloneDeep(this.props.appSettings);
                new_app_settings.globalLoading = false;
                this.props.update_app_settings( new_app_settings )

            }

        });

    }

    handleOutsideModalClicks(e){
        if( e.target.classList.contains('modal') && 
            e.target.classList.contains('fade') && 
            e.target.classList.contains('show') ){

                let newModalSettings = _.cloneDeep(this.props.modalSettings)
                newModalSettings.isOpen = false;
                this.props.update_modal_settings(newModalSettings)

        }
    }

    render(){
        //console.log(this)
        return(
                this.props.appSettings.globalLoading === true ? 
                    <GlobalLoading/>
                :
                    <BrowserRouter>
                        <Route render={ ( routerProps ) =>{
                            return(
                                <div className="root-inside" onClick={this.handleOutsideModalClicks}>
                                    <AppNav routeProps={routerProps}/>
                                    <TransitionGroup
                                    component={null}
                                    childFactory={(child)=>{
                                        const dynamicChild = React.cloneElement(
                                        child,{
                                            onEnter:(el, isAppearing)=>{ 
                                                //console.log("enter")
                                                //console.log(el)
                                                TweenMax.fromTo( el, .5, { y: 15, opacity: 0, ease: Power4.easeOut }, { y: 0, opacity: 1, ease: Power4.easeOut } ).delay(0.5)                                            
                                            },
                                            onExit:(el, isAppearing)=>{
                                                //console.log("exit")
                                                //console.log(el)
                                                TweenMax.fromTo( el, .5, { y: 0, position:"absolute", top:"70px",width:"100%",height:"100%", opacity: 1, ease: Power4.easeOut }, { y: 15, opacity: 0, ease: Power4.easeOut } )
                                            }
                                        })
                                        return dynamicChild
                                    }}
                                    >
                                        <Transition 
                                            key={ routerProps.location.key } 
                                            timeout={{enter:500,exit:500}}
                                            appear={true}  
                                        >
                                            <div className="main" /*style={{position:"absolute",top:"70px",width:"100%",height:"100%"}}*/>
                                                <Switch location={routerProps.location} >
                                                    <Route exact path="/" component={Home} />
                                                    <Route path="/supplier/accept" component={SupplierAccept} />
                                                    <Route path="/supplier/reject" component={SupplierReject} />
                                                    <Route path="/allproducts" render={ () => {
                                                        if(this.props.user.user_auth.isAuth !== true){
                                                            return <Redirect to="/"/>
                                                        }else{
                                                            return (
                                                                <div>
                                                                    <AllProducts/>
                                                                </div>
                                                            )
                                                        }
                                                    }}/>
                                                    <Route path="/account/paniers/:id" render={ (props) => {
                                                        if(this.props.user.user_auth.isAuth === false ){
                                                            return <Redirect to="/"/>
                                                        }else{
                                                            return <AccountPaniersDetail routeProps={props} />
                                                        }
                                                    }}/>
                                                    <Route path="/account/paniers" render={ (props) => {
                                                        if(this.props.user.user_auth.isAuth === false ){
                                                            return <Redirect to="/"/>
                                                        }else{
                                                            return <AccountPaniers/>
                                                        }
                                                    }}/>
                                                    <Route path="/account/informations" render={ (props) => {
                                                        if(this.props.user.user_auth.isAuth === false ){
                                                            return <Redirect to="/"/>
                                                        }else{
                                                            return <AccountInformations/>
                                                        }
                                                    }}/>
                                                    <Route path="/account" render={ () => {
                                                        if(this.props.user.user_auth.isAuth === false ){
                                                            return <Redirect to="/"/>
                                                        }else{
                                                            if ( this.props.user.user_auth.isCustomer === true && this.props.user.user_auth.isSupplier === false ){
                                                                return (
                                                                    <div>
                                                                        <Account/>
                                                                    </div>
                                                                )
                                                            }else{
                                                                return <Redirect to="/"/>
                                                            }
                                                        }
                                                    }}/>
                                                    <Route path="/cart" render={ () => {
                                                        if(this.props.user.user_auth.isAuth === false ){
                                                            return <Redirect to="/"/>
                                                        }else{
                                                            if( this.props.user.user_auth.isCustomer === true && this.props.user.user_auth.isSupplier === false ){
                                                                return (
                                                                    <div>
                                                                        <Cart/>
                                                                    </div>
                                                                )
                                                            }else{
                                                                return <Redirect to="/"/>
                                                            }
                                                        }
                                                    }}/>
                                                    <Route path="/supplier-orders" render={ () => {
                                                        if(this.props.user.user_auth.isAuth === false ){
                                                            return <Redirect to="/"/>
                                                        }else{
                                                            if( this.props.user.user_auth.isCustomer === false && this.props.user.user_auth.isSupplier === true ){
                                                                return (
                                                                    <div>
                                                                        <SupplierOrders />
                                                                    </div>
                                                                )
                                                            }else{
                                                                return <Redirect to="/"/>
                                                            }
                                                        }
                                                    }}/>
                                                    <Route path="/users" component={AllUsers}/>
                                                    <Route path="/suppliers" component={AllSuppliers}/>
                                                    <Route exact path="/about" component={About}/>
                                                    <Route path="/telechargement" component={Downloading}/>
                                                </Switch>
                                            </div>
                                        </Transition>
                                    </TransitionGroup>

                                { this.state.cookieMentions === false ? localStorage.setItem("cookiesNotices", JSON.stringify(false)) : null}
                                <div id="cookie-notice" className={localStorage.getItem("cookiesNotices")  ? 'displayBlocOpacity' : null}>
                                    <p>Ce site utilise des cookies. En poursuivant la navigation, vous acceptez l'utilisation de cookies.</p>
                                    <button onClick={() => this.closeCookies()} className="btn-green">Fermer et continuer</button>
                                </div>
                                <Footer/>
                                <ModalSenovea/>
                                <Alerts/>
                                </div>
                            )
                        } } />

                        {/*
                        <div className="root-inside" onClick={this.handleOutsideModalClicks}>
                            
                            <AppNav/>

                            <div className="main">

                            <Switch location={location}>
                                <Route exact path="/" component={Home} />
                                <Route path="/supplier/accept" component={SupplierAccept} />
                                <Route path="/supplier/reject" component={SupplierReject} />
                                <Route path="/allproducts" render={ () => {
                                    if(this.props.user.user_auth.isAuth !== true){
                                        return <Redirect to="/"/>
                                    }else{
                                        return (
                                            <div>
                                                <AllProducts/>
                                            </div>
                                        )
                                    }
                                }}/>
                                <Route path="/account/paniers/:id" render={ (props) => {
                                    if(this.props.user.user_auth.isAuth === false ){
                                        return <Redirect to="/"/>
                                    }else{
                                        return <AccountPaniersDetail routeProps={props} />
                                    }
                                }}/>
                                <Route path="/account/paniers" render={ (props) => {
                                    if(this.props.user.user_auth.isAuth === false ){
                                        return <Redirect to="/"/>
                                    }else{
                                        return <AccountPaniers/>
                                    }
                                }}/>
                                <Route path="/account/informations" render={ (props) => {
                                    if(this.props.user.user_auth.isAuth === false ){
                                        return <Redirect to="/"/>
                                    }else{
                                        return <AccountInformations/>
                                    }
                                }}/>
                                <Route path="/account" render={ () => {
                                    if(this.props.user.user_auth.isAuth === false ){
                                        return <Redirect to="/"/>
                                    }else{
                                        if ( this.props.user.user_auth.isCustomer === true && this.props.user.user_auth.isSupplier === false ){
                                            return (
                                                <div>
                                                    <Account/>
                                                </div>
                                            )
                                        }else{
                                            return <Redirect to="/"/>
                                        }
                                    }
                                }}/>
                                <Route path="/cart" render={ () => {
                                    if(this.props.user.user_auth.isAuth === false ){
                                        return <Redirect to="/"/>
                                    }else{
                                        if( this.props.user.user_auth.isCustomer === true && this.props.user.user_auth.isSupplier === false ){
                                            return (
                                                <div>
                                                    <Cart/>
                                                </div>
                                            )
                                        }else{
                                            return <Redirect to="/"/>
                                        }
                                    }
                                }}/>
                                <Route path="/supplier-orders" render={ () => {
                                    if(this.props.user.user_auth.isAuth === false ){
                                        return <Redirect to="/"/>
                                    }else{
                                        if( this.props.user.user_auth.isCustomer === false && this.props.user.user_auth.isSupplier === true ){
                                            return (
                                                <div>
                                                    <SupplierOrders />
                                                </div>
                                            )
                                        }else{
                                            return <Redirect to="/"/>
                                        }
                                    }
                                }}/>
                                <Route path="/users" component={AllUsers}/>
                                <Route path="/suppliers" component={AllSuppliers}/>
                                <Route exact path="/about" component={About}/>
                                <Route path="/telechargement" component={Downloading}/>
                            </Switch>
                            </div>

                            { this.state.cookieMentions === false ? localStorage.setItem("cookiesNotices", JSON.stringify(false)) : null}

                            <div id="cookie-notice" className={localStorage.getItem("cookiesNotices")  ? 'displayBlocOpacity' : null}>
                                <p>Ce site utilise des cookies. En poursuivant la navigation, vous acceptez l'utilisation de cookies.</p>
                                <button onClick={() => this.closeCookies()} className="btn-green">Fermer et continuer</button>
                            </div>

                            <Footer/>
                            <ModalSenovea/>
                            <Alerts/>
                            </div>*/}

                    </BrowserRouter>
        )
    }
}

function mapDispatchToProps( dispatch ){
    return bindActionCreators({
        "user_load_action": user_load_action,
        "call_product": call_product,
        "load_panier": load_panier,
        "get_order": get_order,
        "update_app_settings": update_app_settings,
        "update_settings_panier":update_settings_panier,
        "update_modal_settings":update_modal_settings,
        "add_alert":add_alert
    }, dispatch)
}

function mapStateToProps( state ){
    return {
        "user":state.user,
        "appSettings":state.appSettings,
        "paniers":state.paniers,
        "paniersSettings" :state.paniersSettings,
        "modalSettings":state.modalSettings
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
    <Provider store={store(rootReducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <ConnectedApp/>
    </Provider>,
    document.querySelector('#root')
);
