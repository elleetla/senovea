import axios from 'axios'
import { WORDPRESS_API_BASE_URL } from '../../../config/config-api'

// ACTIONS TYPES 

// user actions types //
export const USER_LOAD          = 'USER_LOAD'
export const USER_REGISTER      = 'USER_REGISTER'
export const USER_AUTH          = 'USER_AUTH'
export const USER_UPDATE        = 'USER_UPDATE'

// ACTIONS CREATORS
export function user_load_action(  ){

    // vérifier localstorage 
    // si token 
        // vérifier token
        // si good token 
            // load user infos 
        // sinon vire 
    // sinon vire

    return function (dispatch) {

        let stored_user = localStorage.getItem('senovea_user');
        console.log(stored_user)
        if( stored_user !== null ){

            const json_stored_user = JSON.parse(stored_user)
            const stored_user_token = json_stored_user.user_auth.auth_token;

                axios.post(`${WORDPRESS_API_BASE_URL}/jwt-auth/v1/token/validate`, {},{
                    headers: {
                        'Authorization' : `Bearer ${stored_user_token}`,
                        'Content-Type'  : 'application/json'
                    }
                }).then(function (response){

                    console.log("response")
                    console.log(response)
                    dispatch({
                        "type":USER_LOAD,
                        "payload":json_stored_user
                    })

                }).catch(function (error){
                    console.log('token ko')
                    console.log(error.message)
                })

        }else{
            console.log('localstorage ko')
        }

    }

}

export function user_register_action( user_infos, callback ){

    // FormData 
    let new_user_data = new FormData()
    new_user_data.append('username',user_infos.register_username)
    new_user_data.append('email',user_infos.register_email)
    new_user_data.append('password',user_infos.register_password)
    new_user_data.append('document',user_infos.register_document)

    // Register a USER via wordpress API
    return function (dispatch) {
        return axios.post(`${WORDPRESS_API_BASE_URL}/senovea/v1/customer`, new_user_data, {
            headers: {'Content-Type': 'multipart/form-data' }
        }).then(function (response) {
            console.log("response")
            console.log(response)

            dispatch({
                'type':USER_REGISTER,
                'payload': {

                    'user_id':response.data.message.id,
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

                }

            })

            // Register in browser memory

            // Flashbag
            // Redirect
            callback()

        }).catch(function (error) {
            console.log("error")
            console.log(error.response)
            // Flashbag
        });
    }

}

export function user_auth_action( user_infos ){

    // Generate Token
    return function (dispatch) {
        return axios.post(`${WORDPRESS_API_BASE_URL}/jwt-auth/v1/token`,{
                username:user_infos.login_username,
                password:user_infos.login_password
        }).then(function (response) {

            console.log("ok token")
            console.log(response)

            // Get response
            const uid = response.data.user_id;
            const auth_token = response.data.token;

            // Token validate 
            axios.post(`${WORDPRESS_API_BASE_URL}/jwt-auth/v1/token/validate`, {},{
                headers: {
                    'Authorization' : `Bearer ${auth_token}`,
                    'Content-Type'  : 'application/json'
                }
            }).then(function (response){

                console.log("ok validate")
                console.log(response)

                // Get customer
                axios.get(`${WORDPRESS_API_BASE_URL}/senovea/v1/customer/${uid}`)
                .then(function (response){

                    console.log("ok user")
                    console.log(response)

                    // user _ infos 
                    // manque isValidated

                    let user_payload =  {
                        'user_id':response.data.id,
                        'user_email':response.data.email,
                        'user_name':response.data.username,
                        'user_first_name':response.data.first_name,
                        'user_last_name':response.data.last_name,
                        "user_avatar_url": response.data.avatar_url,
                        "user_orders_count": response.data.orders_count,
                        'user_auth':{

                            'auth_token':auth_token,
                            'isAuth':true,
                            'isValidated':true

                        },
                        'user_billing':{
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
                        'isRegistered':true
                    }

                    dispatch({
                        'type':USER_AUTH,
                        'payload': user_payload
                    })

                    // Register in browser memory
                    localStorage.setItem('senovea_user', JSON.stringify(user_payload));

                    // Flashbag
                    // Redirect

                }).catch(function (error) { 
                    console.log("error")
                    console.log(error.response)
                    // Flashbag
                    // Enable to get customer
                })

            }).catch(function (error) {
                console.log("error")
                console.log(error.response)
                // Flashbag
                // Enable to validate token
            })

        }).catch(function (error) {
            console.log("error")
            console.log(error.response)
            // Flashbag
            // Enable to generate token
        });
    }

}

export function user_logout_action(){

    return function (dispatch) {

        dispatch({
            "type" : USER_AUTH,
            "payload": {

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

            }
        })

            // Un - Register in browser memory
            localStorage.removeItem('senovea_user');
            console.log("afterlogout")
            console.log(localStorage.getItem('senovea_user'))
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

    return function (dispatch) {
        return axios.post(`${WORDPRESS_API_BASE_URL}/senovea/v1/customer/update/${uid}`, new_user_data ,{
            headers: {'Content-Type': 'multipart/form-data' }
        }).then(function(response){
            console.log("success")
            console.log(response)



            // new email 
            dispatch({
                "type":USER_UPDATE,
                "payload":{
                    user_email:response.data.email,
                }
            }) 

            // UPDATE LOCAL STORAGE ( dégeulasse )
            console.log('after update')
            let stored_user = localStorage.getItem('senovea_user')
            let json_stored_user = JSON.parse(stored_user)
            console.log(json_stored_user)
            json_stored_user.user_email = response.data.email
            localStorage.setItem('senovea_user', JSON.stringify(json_stored_user))


        }).catch(function (error) {
            console.log("error")
            console.log(error.response)
            // Flashbag
            // Enable to update
        });
    }

}