import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

// components
import LogIn from '../../screens/login'
import Register from '../../screens/register'

// actions
import { update_modal_settings } from "../../actions/index"

class ModalSenovea extends React.Component{
    constructor(props){
        super(props)

        this.renderModalTitle = this.renderModalTitle.bind(this)
        this.renderModalContent = this.renderModalContent.bind(this)
    }
    renderModalTitle(){
        switch(this.props.modalSettings.title){
            case "register":{
                return " Inscription "
            }
            case "login":{
                return " Connexion "
            }
            default :
                return " Title "
        }
    }
    renderModalContent(){
        switch(this.props.modalSettings.component){
            case "register":{
                return <Register/>
            }
            case "login":{
                return <LogIn/>
            }
            default :
                return " "
        }
    }
    render(){

        console.log(this)
        return(
            <Modal isOpen={this.props.modalSettings.isOpen} style={ this.props.modalSettings.size === "big" ? { maxWidth:"1000px" } : null }>
                <ModalHeader>
                    { this.renderModalTitle() }
                </ModalHeader>
                <ModalBody>
                    { this.renderModalContent() }
                </ModalBody>
            </Modal>
        )
    }
}

function mapStateToProps(state){
    return{
        "modalSettings":state.modalSettings
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        "update_modal_settings":update_modal_settings
    },dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(ModalSenovea)