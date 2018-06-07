import React from 'react'
import { compose, bindActionCreators }      from 'redux'
import { connect }                          from 'react-redux'
// react-router-dom
import { Switch, Route } from 'react-router-dom'

// screens components
import { Home } from '../screens/home'
import Register from '../screens/register'
import LogIn from '../screens/login'
import { LogOut } from '../screens/logout'
import Account from '../screens/account'
import { Cart } from '../screens/cart'

class Routing extends React.Component{

    render(){

        return(

                <Switch>
                    <Route exact path="/" component={Home} />

                    <Route path="/register" component={Register} />
                    <Route path="/login" component={LogIn} />
                    {/*<Route path="/logout" component={LogOut} />*/}

                    <Route path="/account" component={Account} />
                    <Route path="/cart" component={Cart} />
                </Switch>                  

        )

    }

}

function mapStateToProps( state ){

    return {
        "user":state.user,
        "auth":state.auth
    }

}

export default compose(
    connect(mapStateToProps)
)(Routing)