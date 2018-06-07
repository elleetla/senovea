import { combineReducers }              from 'redux'
import { reducer as formReducer }       from 'redux-form'
import { USER_REGISTER }                from '../actions/index'
import { USER_AUTH }                    from '../actions/index'

/**  flashbag  **/

// todo -> flashbag box

/**  user  **/
const USER_INITIAL_STATE = {
    'user_id':'',
    'user_email':'',
    'user_name':'',
    'isRegistered':false
}

function user( state = USER_INITIAL_STATE , action ){

    switch (action.type) {
        case USER_REGISTER:
            return action.payload
        default:
            return state
    }

}

/**  auth  **/
const AUTH_INITIAL_STATE = {
    'auth_token':'',
    'isAuth':false,
    'isValidated':false
}

function auth( state = AUTH_INITIAL_STATE , action ){

    switch (action.type) {
        case USER_AUTH:
            console.log(action.payload)
            return action.payload
        default:
            return state
    }

}

export const rootReducers = combineReducers({
    "user":user,
    "auth":auth,
    "form":formReducer
})