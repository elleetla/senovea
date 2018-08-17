import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { supplier_order_reject_v2 } from "../actions/index"

class SupplierReject extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            "order_status":""
        }
        this.getUrlParameter = this.getUrlParameter.bind(this);
    }
    getUrlParameter(name){
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        let results = regex.exec(window.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
 
    }
    componentDidMount(){
        const orderid = this.getUrlParameter('o');
        const custimerid = this.getUrlParameter('c')
        const supplierid = this.getUrlParameter('s')
        const productid = this.getUrlParameter('p')
        const mccampaignid = this.getUrlParameter('mc_cid')
        const mcemailid = this.getUrlParameter('mc_eid')

        this.props.supplier_order_reject_v2(orderid,productid,supplierid,custimerid,mccampaignid,mcemailid, (order_satus)=>{
            switch(order_satus){
                case 'already':{
                    this.setState({
                        "order_status":"already"
                    })
                    break;
                }
                case 'success':{
                    this.setState({
                        "order_status":"success"
                    })
                    break;
                }
                case 'error':{
                    this.setState({
                        "order_status":"error"
                    })
                    break;
                }
                default:
                break;
            }
        });
    }
    renderOrderMessage( order_status ){
        const orderid = this.getUrlParameter('o');
        switch( order_status ){
            case 'already':{
                return `Vous avez déjà répondu à cette commande.`
            }
            case 'success':{
                return `Commande #${orderid} Refusée!`
            }
            case 'error':{
                return `Erreur lors du refus de la commande.`
            }
            default:
            return ` Loading `
        }
    }
    render(){
        
        console.log(this);
        return (
            <div className="senovea-page-supplier senovea-page-accept">
                <div className="senovea-page-supplier-wrap">
                    <div className="senovea-page-supplier-title">
                        { this.renderOrderMessage(this.state.order_status) }
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        "supplier":state.supplier
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        "supplier_order_reject_v2":supplier_order_reject_v2
    },dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(SupplierReject)