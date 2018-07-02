import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import Filters from '../containers/Filters/Filters';
import CreatePanier from '../containers/Create-panier/Create-panier';
import Products from './products';
import BlocConnect from '../components/bloc-connect/bloc-connect';

// Actions
import { call_product } from '../actions/index';

// import grid Bootstrap

class Home extends Component{

    constructor(props) {
        super(props);

        this.state = {
            collapse: false
        }

        this.toggle = this.toggle.bind(this);
    }
    toggle(){
        this.setState({ collapse: !this.state.collapse });
    }
    render() {

        //console.log("HOME")
        //console.log(this);

        return(
            <div>
                <Filters/>
                <CreatePanier/>
                {this.props.user.user_auth.auth_token === '' && this.props.user.user_auth.isAuth === false ?
                    <BlocConnect/>
                    :
                    <Products/>
                }
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        "products": state.products,
        "user": state.user
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        "call_product":call_product
    },dispatch)
}
// export
export default connect(mapStateToProps, mapDispatchToProps)(Home)