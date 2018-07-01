import React, {Component} from 'react'
import { connect } from 'react-redux';

// import component elle&la
import BlocConnect from '../components/bloc-connect/bloc-connect';

export class AllSuppliers extends Component{
    render(){
        return(
            <div>
                { this.props.user.user_auth.auth_token === '' && this.props.user.user_auth.isAuth === false ?
                    <BlocConnect/>
                    :
                    null
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