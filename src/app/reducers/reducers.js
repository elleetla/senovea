import { combineReducers }                from 'redux'
import { reducer as formReducer }         from 'redux-form'

import { USER_REGISTER }                  from '../actions/index'
import { USER_AUTH }                      from '../actions/index'
import { USER_UPDATE }                    from '../actions/index'
import { USER_LOAD }                      from '../actions/index'
import { SUPPLIER_ORDER_ACCEPT }          from '../actions/index'
import { SUPPLIER_ORDER_REJECT }          from '../actions/index'
import { CALL_PRODUCTS }                  from "../actions/index"
import { CALL_USERS }                     from "../actions/index"
import { ORDER_PRODUCT }                  from "../actions/index"

import { SUPPLIER_ORDER_ACCEPT_V2 } from "../actions/index"
import { SUPPLIER_ORDER_REJECT_V2 } from "../actions/index"

import { ADD_PANIER } from "../actions/index"
import { LOAD_PANIER } from "../actions/index"
import { DELETE_PANIER } from "../actions/index"
import { UPDATE_PANIER } from "../actions/index"
import { UPDATE_SETTINGS_PANIER } from "../actions/index"
import { ADD_PRODUCT_TO_PANIER } from "../actions/index"
import { UPDATE_APP_SETTINGS } from "../actions/index"

import _ from 'lodash'

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
};

// reducer products
function productReducer(state = [], action) {
    switch (action.type){
        case ORDER_PRODUCT:
            console.log("Order Product Reducer")
            return state;
        case CALL_PRODUCTS:
            console.log("Call Product Reducer")
            //console.log(action.payload)
            return action.payload
    }
    return state
}

function userReducer( state = USER_INITIAL_STATE , action ){
    switch (action.type) {

        case USER_LOAD: {
            console.log('User load reducer')
            //console.log(action.payload)
            return action.payload
            break;
        }
        case USER_REGISTER:{
            console.log("User register reducer")
            //console.log(action.payload)
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
            //console.log(action.payload)
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
            //console.log(action.payload)
            //console.log(accepted_state)
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
            //console.log(action.payload)
            //console.log(rejected_state)
            return rejected_state;
            break;
        }
        default:
            return state
            break;

    }
}

function supplierReducer( state = {}, action ){
    switch( action.type ){
        case SUPPLIER_ORDER_ACCEPT_V2 : {
            return action.payload
        }
        case SUPPLIER_ORDER_REJECT_V2 : {
            return action.payload
        }
        default:
            return state
    }
}

function callUsers(state = {}, action){
    switch (action.type){
        case CALL_USERS: {
            console.log("users fonctionne");
            return action.payload
        }
        default :
            return state
    }
}

function panierReducer( state = [], action ){
    switch( action.type ){
        case LOAD_PANIER:{
            console.log("load panier reducer")
            return action.payload
        }

        case ADD_PANIER:{
            console.log('add panier reducer')
            //console.log( action.payload)
            return action.payload
        }

        case ADD_PRODUCT_TO_PANIER:{
            console.log('add product to panier reducer')
            return action.payload
        }

        case DELETE_PANIER:{
            return state
        }
        case UPDATE_PANIER:{
            return state
        }
        default:
            return state
    }
}

function panierSettingsReducer( state = { "active_panier_id":"" } , action ){
    switch( action.type ){
    case UPDATE_SETTINGS_PANIER:{
        console.log('update panier settings reducer')
        //console.log(action.payload)
        return action.payload
    }
    default:
        return state
    }
}

function appSettingsReducer( state = { "globalLoading":true } , action ){
    switch( action.type ){
    case UPDATE_APP_SETTINGS:{
        console.log('update app settings reducer')
        return action.payload
    }
    default:
        return state
    }
}


export const rootReducers = combineReducers({

    "user"      :userReducer,
    "form"      :formReducer,
    "products"  :productReducer,
    "supplier"  :supplierReducer,
    "paniers"   :panierReducer,
    "paniersSettings" : panierSettingsReducer,
    "appSettings": appSettingsReducer,
    "users": callUsers

});