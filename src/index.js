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
import {AllSuppliers} from './app/screens/allsuppliers'
import {About} from './app/screens/about'
import {Downloading} from "./app/screens/downloading";
import SupplierOrders from './app/screens/supplier-orders'
import AllProducts from './app/screens/allproducts'

import SupplierAccept from './app/screens/supplieraccept'
import SupplierReject from './app/screens/supplierreject'

// import css
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import Filters from './app/containers/Filters/Filters';
import Banner from './app/containers/Banner/Banner';
import Footer from './app/components/Footer/Footer';

// Material theming
import { createMuiTheme } from '@material-ui/core/styles';
// load action 
import { user_load_action } from './app/actions/index';
import { call_product } from './app/actions/index';

const store = createStore(
    rootReducers,
    applyMiddleware(thunk)
);

// Routing 

// https://stackoverflow.com/questions/43209666/react-router-v4-cannot-get-url
// https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writting-manually
// https://stackoverflow.com/questions/35604617/react-router-with-optional-path-parameter

class App extends React.Component {

    componentDidMount() { 
        // vérifier si user est en mémoire
        this.props.user_load_action();
        this.props.call_products();
    }

    render(){
        //console.log("app class")
        //console.log(this.props)
        return(
                    <BrowserRouter>
                        <div>
                        
                            <AppNav/>
                            <Banner/>
                            <Filters/>
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

                                <Route path="/login" render={ () => {
                                    if(this.props.user.user_auth.isAuth === true){
                                        return <Redirect to="/"/>
                                    }else{
                                        return (
                                            <div>
                                                <LogIn/>
                                            </div>
                                        )
                                    }
                                }}/>
                                
                                <Route path="/account" render={ () => {
                                    if(this.props.user.user_auth.isAuth === false ){
                                        return <Redirect to="/login"/>
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
                                    if(this.props.user.user_auth.isAuth === false ){
                                        return <Redirect to="/login"/>
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
                                <Route path="/about" component={About}/>
                                <Route path="/telechargement" component={Downloading}/>

                            </Switch>
                            <Footer/>
                        </div>
                    </BrowserRouter>
        )
    }
}

function mapDispatchToProps( dispatch ){
    return bindActionCreators({
        "user_load_action": user_load_action,
        "call_products": call_product
    }, dispatch)
}

function mapStateToProps( state ){
    return {
        "user":state.user
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedApp/>
    </Provider>,
    document.querySelector('#root')
)
