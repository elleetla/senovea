// config 
import { WORDPRESS_API_BASE_URL } from '../config/config-api'
// react 
import React from 'react'
import ReactDOM from 'react-dom'
// react-router-dom
import { BrowserRouter, HashRouter, Switch, Route, Redirect } from 'react-router-dom'
// react-redux 
import { Provider, connect } from 'react-redux'
// redux 
import { createStore, applyMiddleware, bindActionCreators } from 'redux'
import { rootReducers } from './app/reducers/reducers'
// redux - thunk 
import thunk from 'redux-thunk'
// appNav
import AppNav from './app/containers/Header/Header'


// components
import Routing from './app/containers/routing'
// screens components
import Home from './app/screens/home'
import Register from './app/screens/register'
import LogIn from './app/screens/login'
import { LogOut } from './app/screens/logout'
import Account from './app/screens/account'
import {Cart} from './app/screens/cart'
import {AllUsers} from './app/screens/allusers'
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

// import css
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import Filters from './app/containers/Filters/Filters';
import CreatePanier from './app/containers/Create-panier/Create-panier';
import Footer from './app/components/Footer/Footer';

// Material theming
import { createMuiTheme } from '@material-ui/core/styles';
// load action 
import { user_load_action } from './app/actions/index';
import { call_product } from './app/actions/index';
import { load_panier } from './app/actions/index';
import { update_app_settings } from './app/actions/index';
import { update_settings_panier } from './app/actions/index';


const store = applyMiddleware(thunk)(createStore);

// Routing 

// https://stackoverflow.com/questions/43209666/react-router-v4-cannot-get-url
// https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writting-manually
// https://stackoverflow.com/questions/35604617/react-router-with-optional-path-parameter

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            cookieMentions : true
        }
    }

    closeCookies(){
        return this.setState({
            cookieMentions: false
        });
    }

    componentDidMount() { 

        //console.log("componentDidMount")

        // Quand l'application se lance 

        // Enclencher le Global loading

        // vérifier si user est en mémoire

        this.props.user_load_action((status)=>{

            //console.log(status)

            if( status === "success" ){
            // Si c'est le cas on load les paniers
            // & On load les products 
                //console.log(this.props)
                this.props.call_product(this.props.user.user_arrondissement)
                this.props.load_panier(this.props.user.user_id, (panier_status)=>{

                    // On update le panier actif 
                    // Par le dernier panier updaté
                    if( panier_status === "success" ){
                        //console.log('les paniers')
                        //console.log(this.props.paniers)

                        let new_panier_settings = _.cloneDeep(this.props.paniersSettings)
                        //console.log(this.props.paniers)
                        new_panier_settings.active_panier_id = _.findLastKey(this.props.paniers)
                        this.props.update_settings_panier(new_panier_settings);
                    }

                })

                // on update les app settings 
                let new_app_settings = _.cloneDeep(this.props.appSettings);
                new_app_settings.globalLoading = false
                this.props.update_app_settings( new_app_settings )

            }else{

                // on update les app settings 
                let new_app_settings = _.cloneDeep(this.props.appSettings);
                new_app_settings.globalLoading = false;
                this.props.update_app_settings( new_app_settings )

            }

        });

    }

    render(){
        console.log(this.state.cookieMentions);
        ////console.log("app class")
        ////console.log(this.props)
        return(
                this.props.appSettings.globalLoading === true ? 
                    <GlobalLoading/>
                :
                    <BrowserRouter>
                        <div>
                            <AppNav/>
                            <Switch>

                                <Route exact path="/" component={Home} />
                                {/* Route fournisseur accept */}
                                <Route path="/supplier/accept" component={SupplierAccept} />
                                {/* Route fournisseur reject */}
                                <Route path="/supplier/reject" component={SupplierReject} />

                                <Route path="/allproducts" render={ () => {
                                    if(this.props.user.user_auth.isAuth !== true){
                                        return <Redirect to="/login"/>
                                    }else{
                                        return (
                                            <div>
                                                <AllProducts/>
                                            </div>
                                        )
                                    }
                                }}/>

                                <Route path="/register" render={ () => {
                                    if(this.props.user.user_auth.isAuth === true){
                                        return <Redirect to="/"/>
                                    }else{
                                        return (
                                            <div>
                                                <Register/>
                                            </div>
                                        )
                                    }
                                }}/>


                                <Route path="/login" component={LogIn} />

                                {/*<Route path="/login" render={ () => {
                                    if(this.props.user.user_auth.isAuth === true){
                                        return <Redirect to="/"/>
                                    }else{
                                        return (
                                            <div>
                                                <LogIn/>
                                            </div>
                                        )
                                    }
                                }}/>*/}

                                {/*<Route path="/login" component={LogIn} />*/}
                                {/*
                                <Route path="/account/informations" component={AccountInformations}/>
                                <Route path="/account/paniers" component={AccountPaniers}/>
                                */}

                                <Route path="/account/paniers/:id" render={ (props) => {
                                    if(this.props.user.user_auth.isAuth === false ){
                                        return <Redirect to="/login"/>
                                    }else{
                                        return <AccountPaniersDetail routeProps={props} />
                                    }
                                }}/>

                                <Route path="/account/paniers" render={ (props) => {
                                    if(this.props.user.user_auth.isAuth === false ){
                                        return <Redirect to="/login"/>
                                    }else{
                                        return <AccountPaniers/>
                                    }
                                }}/>

                                <Route path="/account/informations" render={ (props) => {
                                    if(this.props.user.user_auth.isAuth === false ){
                                        return <Redirect to="/login"/>
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
                                        return <Redirect to="/login"/>
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
                                    if(this.props.user.user_auth.isAuth === false ) {
                                        return <Redirect to="/login"/>
                                    }
                                    else {
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
                                }} />

                                <Route path="/users" component={AllUsers}/>
                                <Route path="/suppliers" component={AllSuppliers}/>
                                <Route path="/about" component={About}/>
                                <Route path="/telechargement" component={Downloading}/>
                            </Switch>

                            { /* Bloc cookie notice */ }
                            { this.state.cookieMentions === false ? localStorage.setItem("cookiesNotices", JSON.stringify(false)) : null}

                            <div id="cookie-notice" className={localStorage.getItem("cookiesNotices")  ? 'displayBlocOpacity' : null}>
                                <p>Ce site utilise des cookies. En poursuivant la navigation, vous acceptez l'utilisation de cookies.</p>
                                <button onClick={() => this.closeCookies()} className="btn-green">Fermer et continuer</button>
                            </div>

                            <Footer/>
                        </div>
                    </BrowserRouter>
        )
    }
}

function mapDispatchToProps( dispatch ){
    return bindActionCreators({
        "user_load_action": user_load_action,
        "call_product": call_product,
        "load_panier": load_panier,
        "update_app_settings": update_app_settings,
        "update_settings_panier":update_settings_panier
    }, dispatch)
}

function mapStateToProps( state ){
    return {
        "user":state.user,
        "appSettings":state.appSettings,
        "paniers":state.paniers,
        "paniersSettings" : state.paniersSettings,
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
    <Provider store={store(rootReducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <ConnectedApp/>
    </Provider>,
    document.querySelector('#root')
);
