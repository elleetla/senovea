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
import { createStore, applyMiddleware } from 'redux'
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
// Material theming
import { createMuiTheme } from '@material-ui/core/styles';

console.log(WORDPRESS_API_BASE_URL);

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
                                    if(this.props.user.user_auth.isAuth === false){
                                        return <Redirect to="/login"/>
                                    }else{
                                        return (
                                            <div>
                                                <Account/>
                                            </div>
                                        )
                                    }
                                }}/>
                                
                        


                                <Route path="/cart" render={ () => {
                                    if(this.props.user.user_auth.isAuth === false){
                                        return <Redirect to="/login"/>
                                    }else{
                                        return (
                                            <div>
                                                <Cart/>
                                            </div>
                                        )
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

function mapStateToProps( state ){

    return {
        "user":state.user,
        //"auth":state.auth
    }

}

const ConnectedApp = connect(mapStateToProps)(App)

ReactDOM.render(
    <Provider store={store}>
        <ConnectedApp/>
    </Provider>,
    document.querySelector('#root')
)