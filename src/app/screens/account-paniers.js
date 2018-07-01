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
                    <p>No Panier</p>:
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