// import components react
import React, {Component} from 'react'
import { connect } from 'react-redux';

// import components elle&la
import BlocConnect from '../components/bloc-connect/bloc-connect';
import Banner from '../containers/Banner/Banner';

// creation of the class "AllSupliers"
export class AllSuppliers extends Component{
    render(){
        return(
            <div>
                <Banner
                    titleBanner="Prestataires référencés"
                    desc="Nous nous réjouissions de compter parmis nos entreprises
                    partenaires des fournisseurs de services reconnus pour la qualité
                    de leur travail et de leur accompaganement auprès d’organismes publics
                    de dimensions nationale et internationale."
                />
                { this.props.user.user_auth.auth_token === '' && this.props.user.user_auth.isAuth === false ?
                    <BlocConnect titleBloc="Veuillez vous connecter ou créer un compte pour visualiser le contenu de cette page"/>
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