import { combineReducers }                from 'redux'
import { reducer as formReducer }         from 'redux-form'

import {delete_panier, USER_REGISTER} from '../actions/index'
import { USER_AUTH }                      from '../actions/index'
import { USER_UPDATE }                    from '../actions/index'
import { USER_LOAD }                      from '../actions/index'
import { USER_RESET }                      from '../actions/index'

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
import { CALL_SUPPLIERS } from "../actions/index";
import { FILTERS_SUPPLIERS } from "../actions/index";
import { ORDER_PANIER } from "../actions/index"
import { UPDATE_MODAL_SETTINGS } from "../actions/index"

import { ADD_ALERT } from "../actions/index"
import { REMOVE_ALERT } from "../actions/index"

import { GET_ORDER } from "../actions/index"
import { POST_ORDER } from "../actions/index"
import { PUT_ORDER } from "../actions/index"
import { DELETE_ORDER } from "../actions/index"

import { UPDATE_PRODUCTS_FILTERSETTINGS } from "../actions/index"
import { CALL_CUSTOMERS } from "../actions/index";
import { PAGE_ABOUT } from "../actions/index";
import { PAGE_DOWNLOADING } from "../actions/index";
import { PAGE_PROVIDERS } from "../actions/index";
import { PAGE_CUSTOMERS } from "../actions/index";
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

export const aboutPageReducer = (state = [], action) => {
     switch (action.type){
          case PAGE_ABOUT :
               return action.payload;
          default:
               return state;
     }
};

export const customersPageReducer = (state = [], action) => {
     switch (action.type){
          case PAGE_CUSTOMERS :
               return action.payload;
          default:
               return state;
     }
};

export const providersPageReducer = (state = [], action) => {
     switch (action.type){
          case PAGE_PROVIDERS :
               return action.payload;
          default:
               return state;
     }
};

// reducer page downloading
export const dowloadingPageReducer = (state = [], action) => {
    switch (action.type){
         case PAGE_DOWNLOADING :
             return action.payload;
         default:
             return state;
    }
};

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
        case USER_RESET:{
            console.log("user reset action")
            return state
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

        case ORDER_PANIER:{
            console.log('order panier reducer')
            return state
        }

        case DELETE_PANIER:{
            console.log("delete panier");
            return action.payload
        }
        case UPDATE_PANIER:{
            console.log('update panier reducer')
            //console.log( action.payload)
            return action.payload
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

function reducerSuppliers(state = [], action){
    switch (action.type) {
        case CALL_SUPPLIERS: {
            console.log("test suppliers");
            return action.payload
        }
        default:
            return state
    }
}

function reducerCustomers(state = [], action){
     switch (action.type) {
          case CALL_CUSTOMERS: {
               console.log("test suppliers");
               return action.payload
          }
          default:
               return state
     }
}

const modalSettingsReducer_init = {
    "isOpen":false,
    "title":"",
    "component":"",
    "size":""
}
function modalSettingsReducer( state = modalSettingsReducer_init, action ){
    switch( action.type ){
        case UPDATE_MODAL_SETTINGS:{
            console.log("update modal settings")
            return action.payload;
        }
        default:
            return state
    }
}

function reducerFilterSuppliers(state = { "name": "", "rang": "", "arrondissement" : ""}, action){
    switch( action.type ){
        case FILTERS_SUPPLIERS:{
            console.log('update app settings reducer');
            return action.payload
        }
        default:
            return state
    }
}

const alertsReducer_init = []
function alertsReducer( state = alertsReducer_init, action ){
    switch( action.type ){
        case ADD_ALERT :{
            console.log('add alert reducer')
            let clone = _.cloneDeep(state);
            clone = [] // Empty array
            clone.push( action.payload )
            return clone;
        }
        case REMOVE_ALERT :{
            return action.payload;
        }
        default:
            return state;
    }
}

function orderReducer( state = [], action ){

    switch( action.type ){

        case GET_ORDER:{
            console.log('get order reducer');
            return action.payload
        }
        case POST_ORDER:{
            console.log('post order reducer');
            console.log(state);
            return action.payload
        }
        case PUT_ORDER:{
            return state
        }
        case DELETE_ORDER:{
            return state
        }
        default:
            return state

    }
}

function deletePanier(state = {}, action){
    switch( action.type ){
        case DELETE_PANIER :{
            return console.log('PANIER DELETE');
        }
        default:
            return state;
    }
}

const productsFilterSettings_initdata = {
    "categorie":"ingenieurie",
    "prestation":"",
    "ref":""
}

function productsFilterSettings( state = productsFilterSettings_initdata, action ){
    switch( action.type ){
        case UPDATE_PRODUCTS_FILTERSETTINGS:{
            return action.payload;
        }
        default:
            return state
    }
}


// export reducers
export const rootReducers = combineReducers({
    "user"      :userReducer,
    "suppliersSettings" : reducerFilterSuppliers,
    "form"      :formReducer,
    "products"  :productReducer,
    "supplier"  :supplierReducer,
    "paniers"   :panierReducer,
    "paniersSettings" : panierSettingsReducer,
    "appSettings": appSettingsReducer,
    "modalSettings":modalSettingsReducer,
    "users": callUsers,
    "suppliers" : reducerSuppliers,
    "alerts": alertsReducer,
    "orders":orderReducer,
    "deletePanier": deletePanier,
    "productsFilterSettings":productsFilterSettings,
    "customers": reducerCustomers,
    "aboutPage": aboutPageReducer,
    "downloadingPage": dowloadingPageReducer,
    "providersPage": providersPageReducer,
    "customersPage": customersPageReducer
});