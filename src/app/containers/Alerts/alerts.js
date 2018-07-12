import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Transition,CSSTransition,TransitionGroup } from 'react-transition-group';
import { TweenMax,TimelineLite } from "gsap";
import _ from "lodash"

import { add_alert } from "../../actions/index"
import { remove_alert } from "../../actions/index"

import { Alert } from 'reactstrap';
import "./alerts.css"

class Alerts extends React.Component{

    constructor(props){
        super(props)

        this.renderAlertColor = this.renderAlertColor.bind(this)
        //this.handleTriggerAlert = this.handleTriggerAlert.bind(this)
        this.handleRemoveAlert = this.handleRemoveAlert.bind(this)
    }

    renderAlertColor( status ){
        switch ( status ) {
            case "error":{
                return "danger"
            }
            case "success":{
                return "success"
            }
            case "information":{
                return "primary"
            }
            case "warning":{
                return "warning"
            }
            default:
                return "primary";
        }
    }

    /*handleTriggerAlert(){
        const new_alert = {
            "status":"error",
            "content":"Erreur lors de la connexion, bla bla bla bla v bla bla bla"
        }
        this.props.add_alert(new_alert)
    }*/

    handleRemoveAlert(){
        this.props.remove_alert()
    }

    render(){
        //console.log(this)
        return (
                //_.isEmpty(this.props.alerts) ?
                //null
                //:
                <div className="senovea-global-alert-wrap">
                    <TransitionGroup 
                        component={null}
                        enter={true} 
                        exit={true}
                        childFactory={(child)=>{
                            const dynamicChild = React.cloneElement(
                            child,{
                                onEnter:(el, isAppearing)=>{ 
                                    
                                    let tl = new TimelineLite();
                                    //TweenMax.fromTo( el, .5, { y: 15, opacity: 0, ease: Expo.easeOut }, { y: 0, opacity: 1, ease: Expo.easeOut } )
                                    tl.fromTo( el, .5, { y: 15, opacity: 0, ease: Expo.easeOut }, { y: 0, opacity: 1, ease: Expo.easeOut } )
                                    tl.fromTo( el, 1, { y: 0, opacity: 1, ease: Expo.easeOut }, { y: -50, opacity: 0, ease: Expo.easeOut }, 5 )

                                },
                                onExit:(el, isAppearing)=>{

                                    // SI la notification est déjà hidden
                                    const elComputedStyles = window.getComputedStyle(el);
                                    const el0pacity = elComputedStyles.getPropertyValue('opacity')
                                    //console.log(opacity)

                                    parseInt(el0pacity) === 0 ?
                                    null:
                                    TweenMax.fromTo( el, 1, { y: 0, opacity: 1, ease: Expo.easeOut }, { y: -50, opacity: 0, ease: Expo.easeOut } )

                                }
                            })
                            return dynamicChild
                        }}
                    >
                        {
                            _.map( this.props.alerts, ( alert, i ) => {
                                return (
                                    <Transition 
                                        key={ Math.random() * (999999 - 0) + 0 } 
                                        timeout={{enter:500,exit:1000}}
                                        appear={true}  
                                    >
                                        <Alert color={this.renderAlertColor(alert.status)}>
                                            <div>
                                                { alert.status === "success" ?
                                                    <strong>Succès</strong>
                                                    :
                                                    <strong>Message</strong>
                                                }
                                            </div>
                                            <div dangerouslySetInnerHTML={{__html: alert.content}}>
                                            </div>
                                            <div className="senovea-global-alert-close">
                                                <div onClick={this.handleRemoveAlert}>
                                                    x
                                                </div>
                                            </div>
                                        </Alert>
                                    </Transition>
                                )
                            })
                        }
                    </TransitionGroup>
                </div>
                /*<div>
                <button onClick={this.handleTriggerAlert}> trigger alert </button>
                </div>*/
        )
    }

}

function mapStateToProps(state){
    return {
        "alerts":state.alerts
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        "add_alert":add_alert,
        "remove_alert":remove_alert
    },dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(Alerts)