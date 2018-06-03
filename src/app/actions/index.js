import axios from 'axios'

// ACTIONS TYPES 
export const USER_REGISTER  = 'USER_REGISTER'
export const USER_AUTH = 'USER_AUTH'

// ACTIONS CREATORS
export function user_register_action( user_infos ){

    // With THUNK
    return function (dispatch) {
        return axios.post('http://localhost/senovea/wp-json/wp/v2/users/register',{
                username:user_infos.register_username,
                email:user_infos.register_email,
                password:user_infos.register_password,
        }).then(function (response) {
            console.log("response")
            console.log(response)

            dispatch({
                'type':USER_REGISTER,
                'payload': response
            })
        }).catch(function (error) {
            console.log("error")
            console.log(error.response)

            dispatch({
                'type':USER_REGISTER,
                'payload': error.response
            })
        });
    }

}

export function user_auth_action( user_infos ){

    console.log("action creator")
    console.log(user_infos)

    return {
        'type':USER_AUTH,
        'payload':{

        }
    }

}