import axios from 'axios'
import { WORDPRESS_API_BASE_URL } from '../../../config/config-api'

////console.log("API BASE");
////console.log(WORDPRESS_API_BASE_URL);

// ACTIONS TYPES 

// user actions types //
export const USER_LOAD                = 'USER_LOAD';
export const USER_REGISTER            = 'USER_REGISTER';
export const USER_AUTH                = 'USER_AUTH';
export const USER_UPDATE              = 'USER_UPDATE';
export const SUPPLIER_ORDER_ACCEPT    = 'SUPPLIER_ORDER_ACCEPT';
export const SUPPLIER_ORDER_REJECT    = 'SUPPLIER_ORDER_REJECT';
export const CALL_PRODUCTS            = 'CALL_PRODUCTS';
export const ORDER_PRODUCT            = 'ORDER_PRODUCT';

export const SUPPLIER_ORDER_ACCEPT_V2 = 'SUPPLIER_ORDER_ACCEPT_V2';
export const SUPPLIER_ORDER_REJECT_V2 = 'SUPPLIER_ORDER_REJECT_V2';

export const ADD_PANIER = "ADD_PANIER"
export const LOAD_PANIER = "LOAD_PANIER"
export const DELETE_PANIER = "DELETE_PANIER"
export const UPDATE_PANIER = "UPDATE_PANIER"
export const UPDATE_SETTINGS_PANIER = "UPDATE_SETTINGS_PANIER"
export const ADD_PRODUCT_TO_PANIER = "ADD_PRODUCT_TO_PANIER"
export const CALL_USERS = "CALL_USERS";
export const CALL_SUPPLIERS = "CALL_SUPPLIERS";

export const UPDATE_APP_SETTINGS = "UPDATE_APP_SETTINGS";
export const FILTERS_SUPPLIERS = "FILTERS_SUPPLIERS";


// ACTIONS CREATORS

// supplier accept v2

export function supplier_order_accept_v2( order_id, product_id, supplier_id, customer_id, mc_campaign_id, mc_email_id ) {
    
    /*
    ////console.log("order id")
    ////console.log(order_id)
    
    ////console.log("product id")
    ////console.log(product_id)

    ////console.log("supplier id")
    ////console.log(supplier_id)

    ////console.log("customer id")
    ////console.log(customer_id)

    ////console.log("mc_campaign id")
    ////console.log(mc_campaign_id)

    ////console.log("mc_email id")
    ////console.log(mc_email_id)
    */

    const order_accept_form_data = new FormData();

    order_accept_form_data.append('order_id',parseInt(order_id))
    order_accept_form_data.append('product_id',parseInt(product_id))
    order_accept_form_data.append('supplier_id',parseInt(supplier_id))
    order_accept_form_data.append('customer_id',parseInt(customer_id))
    order_accept_form_data.append('mc_campaign_id',mc_campaign_id)
    order_accept_form_data.append('mc_email_id',mc_email_id)

    return function (dispatch) {
        axios.post(`${WORDPRESS_API_BASE_URL}/senovea/v2/order/accept`, order_accept_form_data, {})
        .then(function (response) {
            ////console.log('ok accept')
            ////console.log(response)
            dispatch({
                "type":SUPPLIER_ORDER_ACCEPT_V2,
                "payload":{}
            })
        }).catch(function (error) {
            ////console.log('accept ko')
            ////console.log(error.message)
        });
    }
}

// supplier reject v2
export function supplier_order_reject_v2( order_id, product_id, supplier_id, customer_id, mc_campaign_id, mc_email_id ) {
    
    /*
    ////console.log("order id")
    ////console.log(order_id)
    
    ////console.log("product id")
    ////console.log(product_id)

    ////console.log("supplier id")
    ////console.log(supplier_id)

    ////console.log("customer id")
    ////console.log(customer_id)

    ////console.log("mc_campaign id")
    ////console.log(mc_campaign_id)

    ////console.log("mc_email id")
    ////console.log(mc_email_id)
    */

    const order_reject_form_data = new FormData();

    order_reject_form_data.append('order_id', parseInt(order_id))
    order_reject_form_data.append('product_id', parseInt(product_id))
    order_reject_form_data.append('supplier_id', parseInt(supplier_id))
    order_reject_form_data.append('customer_id', parseInt(customer_id))
    order_reject_form_data.append('mc_campaign_id', mc_campaign_id)
    order_reject_form_data.append('mc_email_id', mc_email_id)

    return function (dispatch) {
        axios.post(`${WORDPRESS_API_BASE_URL}/senovea/v2/order/reject`, order_reject_form_data, {})
        .then(function (response) {
            ////console.log('ok reject')
            ////console.log(response)
            dispatch({
                "type":SUPPLIER_ORDER_REJECT_V2,
                "payload":{}
            })
        }).catch(function (error) {
            ////console.log('reject ko')
            ////console.log(error.message)
        });
    }
}

// CALL SUPPLIERS
export function callSuppliers() {
    return function (dispatch) {
        axios.get(`${WORDPRESS_API_BASE_URL}/senovea/v2/supplier`).then(response => {
           console.log(response.data.data);
           dispatch({
               type: CALL_SUPPLIERS,
               payload: response.data.data
           })
        }).catch(error => {
            console.log(error);
        })
    }
}

// PRODUCTS 

// Action call product
export function call_product( user_arrondissement ) {

    ////console.log('ok call product');
    ////console.log(user_arrondissement);

    return function (dispatch) {
        axios.get(`${WORDPRESS_API_BASE_URL}/senovea/v2/products/${user_arrondissement}`,{}, {})
            .then(function (response) {
                ////console.log('ok product');
                ////console.log(response);
                ////console.log(typeof response.data.products_global);
                dispatch({
                    "type":CALL_PRODUCTS,
                    "payload": response.data.products_global
                });
            }).catch(function (error) {
                ////console.log('products ko')
                ////console.log(error.message)
            });
    }

}

// function Call Users
export function call_users(stored_user_token){
    return function (dispatch) {
        axios.get(`${WORDPRESS_API_BASE_URL}/wp/v2/users`, {
            headers: {
                'Authorization' : `Bearer ${stored_user_token}`
            }
        })
            .then(function (response) {
                dispatch({
                    "type": CALL_USERS,
                    "payload": response.data
                })
            })
            .catch(function (error) {
                console.log(error);
        })
    }
}

// Action order product 
export function order_product(customer_id, product_id){

    ////console.log('order product action creator')
    ////console.log(customer_id)
    ////console.log(product_id)

    let customer_order_data = new FormData()
    customer_order_data.append('customer_id',parseInt(customer_id))
    customer_order_data.append('product_id',parseInt(product_id))

    return function (dispatch) {

    axios.post(`${WORDPRESS_API_BASE_URL}/senovea/v1/customer/order`, customer_order_data,{

        }).then(function (response){
            ////console.log("customer order ok")
            ////console.log(response)
            // dispatch new state
            // update localstorage 
            // flashbag
            // callback 
        }).catch(function (error){
            ////console.log('customer order ko')
            ////console.log(error.message)
            // flashbag
            // callback 
        })

    }

}

export function supplier_order_accept( order_id, supplier_id ){
    ////console.log('action supplier_order_accept')
    ////console.log(order_id)
    ////console.log(supplier_id)

    let supplier_order_accept_data = new FormData()
    supplier_order_accept_data.append('order_id',order_id)
    supplier_order_accept_data.append('supplier_id',supplier_id)

    return function (dispatch) {
        axios.post(`${WORDPRESS_API_BASE_URL}/senovea/v1/supplier/accept`, supplier_order_accept_data,{

        }).then(function (response){
            ////console.log("accept order ok")
            ////console.log(response)
            // dispatch new state
            dispatch({
                "type":SUPPLIER_ORDER_ACCEPT,
                "payload":order_id
            })
            // update localstorage 
            // flashbag
            // callback 
        }).catch(function (error){
            ////console.log('accept order ko')
            ////console.log(error.message)
            // flashbag
            // callback 
        })
    }

}

export function supplier_order_reject( order_id, supplier_id ){
    ////console.log('action supplier_order_reject')
    ////console.log(order_id)
    ////console.log(supplier_id)

    let supplier_order_reject_data = new FormData()
    supplier_order_reject_data.append('order_id',order_id)
    supplier_order_reject_data.append('supplier_id',supplier_id)

    return function (dispatch) {
        axios.post(`${WORDPRESS_API_BASE_URL}/senovea/v1/supplier/reject`, supplier_order_reject_data,{

        }).then(function (response){

            ////console.log("reject order ok")
            ////console.log(response)

            // dispatch new state
            dispatch({
                "type":SUPPLIER_ORDER_REJECT,
                "payload":order_id
            })
            // update localstorage 

            // flashbag

            // callback 

        }).catch(function (error){

            ////console.log('reject order ko')
            ////console.log(error.message)

        })
    }
}

export function user_load_action( callback ){

    // vérifier localstorage 
    // si token 
        // vérifier token
        // si good token 
            // load user infos 
        // sinon vire 
    // sinon vire

    return function (dispatch) {

        let stored_user = localStorage.getItem('senovea_user');
        //////console.log(stored_user)
        if( stored_user !== null ){

            const json_stored_user = JSON.parse(stored_user)
            const stored_user_token = json_stored_user.user_auth.auth_token;

                axios.post(`${WORDPRESS_API_BASE_URL}/jwt-auth/v1/token/validate`, {},{
                    headers: {
                        'Authorization' : `Bearer ${stored_user_token}`,
                        'Content-Type'  : 'application/json'
                    }
                }).then(function (response){

                    ////console.log("ok localstorage load")
                    //////console.log(response)
                    dispatch({
                        "type":USER_LOAD,
                        "payload":json_stored_user
                    })

                    // callback 
                    callback('success');

                }).catch(function (error){
                    ////console.log('localstorage ko')
                    ////console.log(error.message)
                    callback('error');
                })

        }else{
            ////console.log('localstorage ko')
            callback('error');
        }

    }

}

export function user_register_action( user_infos, callback ){

    // FormData 
    let new_user_data = new FormData()

    new_user_data.append('organisme',user_infos.register_organisme)
    new_user_data.append('service',user_infos.register_service)

    new_user_data.append('username',user_infos.register_username)
    new_user_data.append('nom',user_infos.register_nom)
    new_user_data.append('prenom',user_infos.register_prenom)

    new_user_data.append('arrodissement',user_infos.register_arrondissement)
    new_user_data.append('adresse',user_infos.register_adresse)
    new_user_data.append('code',user_infos.register_code)
    new_user_data.append('ville',user_infos.register_ville)

    new_user_data.append('email',user_infos.register_email)
    new_user_data.append('phone',user_infos.register_phone)

    new_user_data.append('document',user_infos.register_document)
    //new_user_data.append('password',user_infos.register_password)

    // Register a USER via wordpress API
    return function (dispatch) {
        return axios.post(`${WORDPRESS_API_BASE_URL}/senovea/v2/customer`, new_user_data, {
            headers: {
                'Content-Type': 'multipart/form-data' 
            }
        }).then(function (response) {

            ////console.log("ok post consumer")
            ////console.log(response)
            dispatch({
                'type':USER_REGISTER,
                'payload': {

                    'user_auth':{

                        'auth_token':'',
                        'isAuth':false,
                        'isValidated':false,
                        'isSupplier':false,
                        'isCustomer':false

                    }

                    /*
                    'user_id':response.data.message.id,
                    'user_role':'',
                    'user_email':response.data.message.email,
                    'user_name':response.data.message.username,
                    'user_first_name':'',
                    'user_last_name':'',
                    "user_avatar_url": "",
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
                    'isRegistered':true
                    */

                }

            })

            // Register in browser memory
            // Flashbag
            // Redirect
            callback()

        }).catch(function (error) {
            ////console.log("ko post consumer")
            ////console.log(error.response)
            // Flashbag
        });
    }

}

export function user_auth_action( user_infos, callback ){

    // Generate Token
    return function (dispatch) {
        return axios.post(`${WORDPRESS_API_BASE_URL}/jwt-auth/v1/token`,{
                username:user_infos.login_username,
                password:user_infos.login_password
        }).then(function (response) {

            //console.log("ok token")
            ////console.log(response)

            // Get response
            const uid = response.data.user_id;
            const auth_token = response.data.token;
            // Is supplier or Is customer
            const urole = response.data.user_roles[0];

            // Token validate 
            axios.post(`${WORDPRESS_API_BASE_URL}/jwt-auth/v1/token/validate`, {},{
                headers: {
                    'Authorization' : `Bearer ${auth_token}`,
                    'Content-Type'  : 'application/json'
                }
            }).then(function (response){

                //console.log("ok validate")
                ////console.log(response)

                // check if supplier or customer ( or administrator )


                if( urole === 'customer' || urole === 'administrator' ){
                    ////console.log('get customer')
                    // Get customer
                    axios.get(`${WORDPRESS_API_BASE_URL}/senovea/v2/customer/${uid}`)
                    .then(function (response){

                        console.log("ok user")
                        console.log(response)

                        // user _ infos 
                        // manque isValidated
                        let user_payload =  {
                            'user_id':response.data.user_id,
                            'user_arrondissement':response.data.user_arrondissement,
                            'user_role':'customer',
                            'user_email':response.data.user_email,
                            'user_name':response.data.user_name,
                            'user_first_name':response.data.user_first_name,
                            'user_last_name':response.data.user_last_name,
                            //"user_avatar_url": response.data.avatar_url,
                            //"user_orders_count": response.data.orders_count,
                            'user_auth':{

                                'auth_token':auth_token,
                                'isAuth':true,
                                'isValidated':true,
                                'isSupplier':false,
                                'isCustomer':true

                            }
                            /*'uer_billing':{
                                "first_name": response.data.billing.first_name,
                                "last_name": response.data.billing.last_name,
                                "company": response.data.billing.company,
                                "address_1": response.data.billing.address_1,
                                "address_2": response.data.billing.address_2,
                                "city": response.data.billing.city,
                                "state": response.data.billing.state,
                                "postcode": response.data.billing.postcode,
                                "country": response.data.billing.country,
                                "email": response.data.billing.email,
                                "phone": response.data.billing.phone,
                            },
                            "user_shipping": {
                                "first_name": response.data.shipping.first_name,
                                "last_name": response.data.shipping.last_name,
                                "company": response.data.shipping.company,
                                "address_1": response.data.shipping.address_1,
                                "address_2": response.data.shipping.address_2,
                                "city": response.data.shipping.city,
                                "state": response.data.shipping.state,
                                "postcode": response.data.shipping.postcode,
                                "country": response.data.shipping.country,
                            },
                            "isPayingCustomer": response.data.is_paying_customer,
                            'isRegistered':true*/
                        }

                        dispatch({
                            'type':USER_AUTH,
                            'payload': user_payload
                        })

                        // Register in browser memory
                        localStorage.setItem('senovea_user', JSON.stringify(user_payload));
                        // Flashbag

                        // Redirect
                        callback('success')

                    }).catch(function (error) { 

                        //console.log("ko user")
                        ////console.log(error.response)
                        // Flashbag
                        // Enable to get customer
                        callback('error')

                    })

                }/*else if( urole === 'supplier' ){
                    ////console.log('get supplier')
                    axios.get(`${WORDPRESS_API_BASE_URL}/senovea/v1/supplier/${uid}`)
                    .then(function (response){
                        ////console.log('ok supplier')
                        ////console.log(response)
                        
                        let supplier_payload =  {
 
                            'user_id':response.data.uid,
                            'user_role':'supplier',

                            'user_auth':{

                                'auth_token':auth_token,
                                'isAuth':true,
                                'isValidated':true,
                                'isSupplier':true,
                                'isCustomer':false

                            },
                            'user_orders':{
                                'user_actives_orders':response.data.supplier_orders_actives,
                                'user_winned_orders':response.data.supplier_orders_winned,
                                'user_failed_orders':response.data.supplier_orders_failed
                            }

                        }

                        dispatch({
                            'type':USER_AUTH,
                            'payload': supplier_payload
                        })

                        // Register in browser memory
                        //localStorage.setItem('senovea_user', JSON.stringify(supplier_payload));
                        // Flashbag
                        // Redirect

                    }).catch(function (error) {
                        ////console.log('ko supplier')
                        ////console.log(error)
                    })

                }else{
                    // ko role 
                    ////console.log('ko user role')
                }*/



            }).catch(function (error) {
                //console.log("ko validate")
                ////console.log(error.response)
                // Flashbag
                // Enable to validate token
                callback('error')
            })
            
        }).catch(function (error) {
            //console.log("ko user")
            ////console.log(error.response)
            // Flashbag
            // Enable to generate token
            callback('error')
        });
    }

}

export function user_logout_action(){

    return function (dispatch) {

        dispatch({
            "type" : USER_AUTH,
            "payload": {
                'user_auth':{
                    'auth_token':'',
                    'isAuth':false,
                    'isValidated':false,
                    'isSupplier':false,
                    'isCustomer':false

                }

                /*

                'user_id':'',
                'user_email':'',
                'user_name':'',
                'user_first_name':'',
                'user_last_name':'',
                "user_avatar_url": "",
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

                */

            }
        })

            // Un - Register in browser memory
            localStorage.removeItem('senovea_user');
            //////console.log("afterlogout")
            //////console.log(localStorage.getItem('senovea_user'))
            // Flashbag
            // Redirect

    }


}

export function user_update_action(user_infos){

    // VALIDATE TOKEN FIRST

    //uid 
    let uid = user_infos.update_id

    // FormData 
    let new_user_data = new FormData()
    new_user_data.append('email',user_infos.update_email)

    // ici vérifier le user token 

    return function (dispatch) {
        return axios.post(`${WORDPRESS_API_BASE_URL}/senovea/v1/customer/update/${uid}`, new_user_data ,{
            headers: {'Content-Type': 'multipart/form-data' }
        }).then(function(response){
            ////console.log("success")
            ////console.log(response)



            // new email 
            dispatch({
                "type":USER_UPDATE,
                "payload":{
                    user_email:response.data.email,
                }
            })

            // UPDATE LOCAL STORAGE ( dégeulasse )
            ////console.log('after update')
            let stored_user = localStorage.getItem('senovea_user')
            let json_stored_user = JSON.parse(stored_user)
            ////console.log(json_stored_user)
            json_stored_user.user_email = response.data.email
            localStorage.setItem('senovea_user', JSON.stringify(json_stored_user))


        }).catch(function (error) {
            ////console.log("error")
            ////console.log(error.response)
            // Flashbag
            // Enable to update
        });
    }

}

// Paniers

export function load_panier( user_id, callback ){

    return (dispatch)=>{

        return axios.get(`${WORDPRESS_API_BASE_URL}/senovea/v2/panier/${user_id}`, {},{})
            .then(function(response){

                ////console.log('ok paniers')
                ////console.log(response)

                dispatch({
                    "type":LOAD_PANIER,
                    "payload":response.data.data
                })

                callback('success');

            }).catch(function(error){

                ////console.log('ko paniers')
                ////console.log(error)

                callback('error');

            })

    }
}

export function add_panier(formProps, user_id, callback){

    const addPanierData = new FormData();
    addPanierData.append('user_id', user_id)
    addPanierData.append('panier_code', formProps.create_panier_code)
    addPanierData.append('panier_adresse', formProps.create_panier_adresse)
    addPanierData.append('panier_arrondissement', formProps.create_panier_arrondissement)
    addPanierData.append('panier_nom', formProps.create_panier_nom)

    // handle panier creation
    return (dispatch) => {

        return axios.post(`${WORDPRESS_API_BASE_URL}/senovea/v2/panier`, addPanierData ,{
            headers: {'Content-Type': 'multipart/form-data' }
        }).then(function(response){
            ////console.log('ok add panier')
            ////console.log(response)

            if( response.data.status === "success" ){
                dispatch ({
                    "type":ADD_PANIER,
                    "payload":response.data.data // tout les paniers
                })
                // flashbag
                // Callback
                callback('success', response.data.new_panier_id);
            }else{
                // flashbag
                // Callback error
                callback('error');
            }
        }).catch(function(error){
            ////console.log('ko add panier')
        })

    }

}

export function add_product_to_panier( user_id, panier_id, product_id, lot_id, callback ){

    const productData = new FormData();
    productData.append('user_id', user_id)
    productData.append('panier_id', panier_id)
    productData.append('product_id', product_id)
    productData.append('lot_id', lot_id)

    return (dispatch) => {

        return axios.post( `${WORDPRESS_API_BASE_URL}/senovea/v2/panier/addproduct`, productData, {} )
                    .then( function ( response ){

                        console.log(response)

                        dispatch({
                            "type":ADD_PRODUCT_TO_PANIER,
                            "payload":response.data.data
                        })

                        callback('success');

                    } ).catch( function ( error ){

                        

                    } )

    }

}

export function delete_panier(){
    return {
        "type":DELETE_PANIER,
        "payload":{}
    }
}

export function update_panier( new_panier ){

    return {
        "type":UPDATE_PANIER,
        "payload":{}
    }

}

export function update_settings_panier( new_settings ){
    return {
        "type" : UPDATE_SETTINGS_PANIER,
        "payload" : new_settings
    }
}

export function update_app_settings( new_settings ){
    return {
        "type":UPDATE_APP_SETTINGS,
        "payload":new_settings
    }
}

export function filter_suppliers_actions( new_settings ){
    return {
        "type" : FILTERS_SUPPLIERS,
        "payload" : new_settings
    }
}
