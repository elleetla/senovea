import React from "react"
import Account from "./account"
import { connect } from "react-redux";
import { bindActionCreators } from "redux"

class AccountPaniers extends React.Component{

    render(){
        console.log(this)
        return(
            <Account>
                {
                    _.isEmpty(this.props.paniers) ? 
                    <div>
                        <h3>Il n'y a aucun panier lié à votre compte</h3>
                        <button>Créer un panier</button>
                    </div>
                    :
                    <p>Les Paniers</p>
                }
            </Account>
        )
    }

}

function mapStateToProps(state){
    return {
        "paniers":state.paniers
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
    },dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(AccountPaniers)