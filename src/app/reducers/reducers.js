import { combineReducers }                from 'redux'
import { reducer as formReducer }         from 'redux-form'

import { USER_REGISTER }                  from '../actions/index'
import { USER_AUTH }                      from '../actions/index'
import { USER_UPDATE }                    from '../actions/index'
import { USER_LOAD }                      from '../actions/index'
import { SUPPLIER_ORDER_ACCEPT }          from '../actions/index'
import { SUPPLIER_ORDER_REJECT }          from '../actions/index'

import _ from 'lodash'

//import _ form 'lodash';

// suppliers 


/*const SUPPLIERS_INITIAL_STATE = {

    'supplier_id':'',
    'supplier_email':'',
    'supplier_name':'',
    'supplier_first_name':'',
    'supplier_last_name':'',
    "supplier_avatar_url": '',

    'supplier_auth':{
        'supplier_token':'',
        'isAuth':false,
    },

    'supplier_order':{
    }

}*/

/*function supplierReducer( state = SUPPLIERS_INITIAL_STATE , action ){

    switch (action.type) {
        case USER_AUTH:
        console.log("supplier auth reducer")
        console.log(action.payload)
        return action.payload
        default : 
        return state;
    }

}*/

// users 

const USER_INITIAL_STATE = {

    'user_auth':{

        'auth_token':'',
        'isAuth':false,
        'isValidated':false,
        'isSupplier':false,
        'isCustomer':false
        
    }

    /*
    'user_id':'',
    'user_role':'',
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

    'user_order':{
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
    */

}

function userReducer( state = USER_INITIAL_STATE , action ){

    switch (action.type) {

        case USER_LOAD: {
            console.log('user load reducer')
            console.log(action.payload)
            return action.payload
            break;
        }
        case USER_REGISTER:{
            console.log("user register reducer")
            console.log(action.payload)
            return action.payload
            break;
        }
        case USER_AUTH:{
            console.log("user auth reducer")
            console.log(action.payload)
            return action.payload
            break;
        }
        case USER_UPDATE:{
            /// à refaire
            console.log("user update reducer")
            console.log(action.payload)
            let user = state;
            user.user_email = action.payload.user_email
            console.log(user)
            return user;
            break;
        }
        case SUPPLIER_ORDER_ACCEPT:{
            console.log("supplier accept reducer");
            let accepted_state = _.cloneDeep(state);
            let accepted_order = _.find( accepted_state.user_orders.user_actives_orders , ( order ) => { return parseInt(order.id) === parseInt(action.payload) });
            let actives_orders = _.filter( accepted_state.user_orders.user_actives_orders , ( order ) => { return parseInt(order.id) !== parseInt(action.payload) })
            accepted_state.user_orders.user_winned_orders.push( accepted_order );
            accepted_state.user_orders.user_actives_orders = actives_orders;
            console.log(action.payload)
            console.log(accepted_state)
            return accepted_state;
            break;
        }
        case SUPPLIER_ORDER_REJECT:{
            console.log("supplier reject reducer");
            let rejected_state = _.cloneDeep(state);
            let rejected_order = _.find( rejected_state.user_orders.user_actives_orders , ( order ) => { return parseInt(order.id) === parseInt(action.payload) });
            let actives_orders = _.filter( rejected_state.user_orders.user_actives_orders , ( order ) => { return parseInt(order.id) !== parseInt(action.payload) })
            rejected_state.user_orders.user_failed_orders.push( rejected_order );
            rejected_state.user_orders.user_actives_orders = actives_orders;
            console.log(action.payload)
            console.log(rejected_state)
            return rejected_state;
            break;
        }
        default:
            return state
            break;

    }

}

export const rootReducers = combineReducers({
    "user"      :userReducer,
    //"supplier"  :supplierReducer,
    "form"      :formReducer
})