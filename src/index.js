// config 
import { WORDPRESS_API_BASE_URL } from '../config/config-api'
// react 
import React from 'react'
import ReactDOM from 'react-dom'
// react-router-dom
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
// react-redux 
import { Provider, connect } from 'react-redux'
// redux 
import { createStore, applyMiddleware, bindActionCreators } from 'redux'
import { rootReducers } from './app/reducers/reducers'
// redux - thunk 
import thunk from 'redux-thunk'
// appNav
import AppNav from './app/containers/appnav'
// components
import Routing from './app/containers/routing'
// screens components
import { Home } from './app/screens/home'
import Register from './app/screens/register'
import LogIn from './app/screens/login'
import { LogOut } from './app/screens/logout'
import Account from './app/screens/account'
import {Cart} from './app/screens/cart'
import {AllUsers} from './app/screens/allusers'
import {AllSuppliers} from './app/screens/allsuppliers'
import {About} from './app/screens/about'
import SupplierOrders from './app/screens/supplier-orders'

// import css
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

// Material theming
import { createMuiTheme } from '@material-ui/core/styles';
// load action 
import { user_load_action } from './app/actions/index'; 

import axios from 'axios';

console.log(WORDPRESS_API_BASE_URL);
axios.get(`${WORDPRESS_API_BASE_URL}/senovea/v1/products`, {}, {})
    .then(function(response){
        console.log('products ok')
        console.log(response)
    }).catch(function(error) {
        console.log('products ko')
        console.log(error.message)
    })

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});



const store = createStore(
    rootReducers,
    applyMiddleware(thunk)
)

class App extends React.Component{

    componentDidMount() { 
        // vérifier si user est en mémoire
        this.props.user_load_action();
    }

    render(){
        console.log(this.props)
        return(
                    <HashRouter>
                        <div>
                            <AppNav />
                            <Switch>
                                <Route exact path="/" component={Home} />

                                {/*
                                    <Route path="/register" component={Register} />
                                    <Route path="/login" component={LogIn} />
                                */}

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

                                {/*<Route path="/logout" component={LogOut} />*/}

                                {/*<Route path="/account" component={Account}/>*/}
                                
                                
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

                            </Switch>     
                        </div>  
                    </HashRouter>
        )
    }
}

function mapDispatchToProps( dispatch ){
    return bindActionCreators({
        "user_load_action":user_load_action
    }, dispatch)
}

function mapStateToProps( state ){
    return {
        "user":state.user,
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

ReactDOM.render(
    <Provider store={store}>
        <ConnectedApp/>
    </Provider>,
    document.querySelector('#root')
)