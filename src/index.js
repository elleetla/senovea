// react 
import React from 'react'
import ReactDOM from 'react-dom'
// react-router-dom
import { HashRouter, Switch, Route } from 'react-router-dom'
// react-redux 
import { Provider } from 'react-redux'
// redux 
import { createStore, applyMiddleware } from 'redux'
import { rootReducers } from './app/reducers/reducers'
// redux - thunk 
import thunk from 'redux-thunk'

// screens components
import { Home } from './app/screens/home'
import Register from './app/screens/register'
import LogIn from './app/screens/login'
import { LogOut } from './app/screens/logout'

const store = createStore(
    rootReducers,
    applyMiddleware(thunk)
)

class App extends React.Component{
    render(){
        return(
            <Provider store={store}>
                <HashRouter>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/register" component={Register} />
                        <Route path="/login" component={LogIn} />
                        <Route path="/logout" component={LogOut} />
                    </Switch>    
                </HashRouter>
            </Provider>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector('#root')
)