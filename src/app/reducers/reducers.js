import { combineReducers }          from 'redux'
import { reducer as formReducer }   from 'redux-form'
import { USER_REGISTER }                from '../actions/index'

function user( state={}, action ){
    return state
}

function auth( state={}, action ){
    switch (action.type) {
        case USER_REGISTER:
            console.log("action")
            console.log(action)
            return state
        default:
            return state
    }
}

export const rootReducers = combineReducers({
    "user":user,
    "auth":auth,
    "form":formReducer
})