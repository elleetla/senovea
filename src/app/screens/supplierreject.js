import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { supplier_order_reject_v2 } from "../actions/index"

class SupplierReject extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        function getUrlParameter(name){
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
            let results = regex.exec(window.location.search);
            return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
        };

        const orderid = getUrlParameter('o');
        const custimerid = getUrlParameter('c')
        const supplierid = getUrlParameter('s')
        const productid = getUrlParameter('p')
        const mccampaignid = getUrlParameter('mc_cid')
        const mcemailid = getUrlParameter('mc_eid')

        this.props.supplier_order_reject_v2(orderid,productid,supplierid,custimerid,mccampaignid,mcemailid);
    }
    render(){
        console.log(this);
        return (
            <div style={{padding:"100px"}}>
                rejectance
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