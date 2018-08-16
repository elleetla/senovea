import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import Filters from '../containers/Filters/Filters';
import CreatePanier from '../containers/Create-panier/Create-panier';
import Products from './products';
import BlocConnect from '../components/bloc-connect/bloc-connect';
import Banner from '../containers/Banner/Banner';

// Actions
import { call_product } from '../actions/index';

// import grid Bootstrap

class Home extends Component{

    constructor(props) {
        super(props);

        this.state = {
            collapse: false,
            isSticky: true
        };

        this.toggle = this.toggle.bind(this);
    }
    toggle(){
        this.setState({ collapse: !this.state.collapse });
    }
    render() {
        return(
            <div>
                <Banner
                    titleBanner="Votre centrale d'achats public dédiée à l'ingénierie et aux travaux"
                />
                <Filters/>
                <CreatePanier/>
                {this.props.user.user_auth.auth_token === '' && this.props.user.user_auth.isAuth === false ?
                    <BlocConnect
                        titleBloc="Veuillez vous connecter ou créer un compte pour faire une recherche"
                    />
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