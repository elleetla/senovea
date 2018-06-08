import { combineReducers }                from 'redux'
import { reducer as formReducer }         from 'redux-form'
import { USER_REGISTER }                  from '../actions/index'
import { USER_AUTH }                      from '../actions/index'
import { USER_UPDATE }                    from '../actions/index'

const USER_INITIAL_STATE = {

    'user_id':'',
    'user_email':'',
    'user_name':'',
    'user_first_name':'',
    'user_last_name':'',
    "user_avatar_url": '',
    "user_orders_count": 0,

    'user_auth':{
        'auth_token':'',
        'isAuth':false,
        'isValidated':false
    },

    'user_billing':{
        "first_name": "",
        "last_name": "",
        "company": "",
        "address_1": "",
        "address_2": "",
        "city": "",
        "state": "",
        "postcode": "",
        "country": "",
        "email": "",
        "phone": ""
    },

    "user_shipping": {
        "first_name": "",
        "last_name": "",
        "company": "",
        "address_1": "",
        "address_2": "",
        "city": "",
        "state": "",
        "postcode": "",
        "country": ""
    },

    "isPayingCustomer": false,
    'isRegistered':false

}

function userReducer( state = USER_INITIAL_STATE , action ){

    switch (action.type) {
        case USER_REGISTER:
            console.log("user register reducer")
            console.log(action.payload)
            return action.payload
        case USER_AUTH:
            console.log("user auth reducer")
            console.log(action.payload)
            return action.payload
        case USER_UPDATE:
            console.log("user update reducer")
            console.log(action.payload)
            let user = state;
            user.user_email = action.payload.user_email
            console.log(user)
            return user;
        default:
            return state
    }

}

export const rootReducers = combineReducers({
    "user":userReducer,
    "form":formReducer
})