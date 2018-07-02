// import components react
import React, {Component} from 'react'
import { connect } from 'react-redux';

// import components elle&la
import BlocConnect from '../components/bloc-connect/bloc-connect';

// creation of the class "AllSupliers"
export class AllSuppliers extends Component{
    render(){
        return(
            <div>
                { this.props.user.user_auth.auth_token === '' && this.props.user.user_auth.isAuth === false ?
                    <BlocConnect/>
                    :
                    <p>Utilisateur connecté : {this.props.user.user_name}</p>
                }
            </div>
        )
    }
}

// Redux
function mapStateToProps(state){
    return {
        "products": state.products,
        "user": state.user
    }
}

// export
export default connect(mapStateToProps)(AllSuppliers);