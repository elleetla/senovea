import React from "react"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { update_product_to_panier } from "../actions/index"
import { add_product_to_panier } from "../actions/index"
import { add_alert } from "../actions/index"

import {
    Row,
    Col,
    Collapse,
    Button,
    Input } from 'reactstrap';

class Product extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isOpen : false,
            isLoading: false,
            activeNumbr: 1,
            activePrice:0,
            activePalier:1,
            //activeVariation : "",
        };

        this.handleProductOpen = this.handleProductOpen.bind(this);
        this.handleAddToPanier = this.handleAddToPanier.bind(this);
        this.renderSwitchMode = this.renderSwitchMode.bind(this);
        this.changeQuantity = this.changeQuantity.bind(this)
        this.renderPrice = this.renderPrice.bind(this)
        //this.upQuantity = this.upQuantity.bind(this);
        //this.downQuantity = this.downQuantity.bind(this);
        //this.renderQuantityInput = this.renderQuantityInput.bind(this);
    }

    componentDidMount(){
        this.setState({
            activeNumbr: 1,
            activePalier: 1
        })
    }

    handleProductOpen(e){
        this.setState({
            isOpen : !this.state.isOpen 
        })
    }

    handleAddToPanier( e, product_id , product_quantity ){

        // vars
        const the_panier_id = this.props.paniersSettings.active_panier_id;
        const the_panier = this.props.paniers[the_panier_id];
        const the_lot_id = e.target.getAttribute('data-lotkey');
        const the_product_id = product_id;
        const the_product_quantity = product_quantity;

        const panier_update = {
            "uid":this.props.user.user_id,
            "lid":the_lot_id,
            "pid":the_panier_id,
            "productid":the_product_id,
            "productQuantity":the_product_quantity,
            "action":"add"
        }
        // Ici on update le panier        
        this.props.update_product_to_panier( panier_update , this.props.user.user_auth.auth_token , ( status ) => {
            if(status === "success"){
                this.props.add_alert({
                    "status":"success",
                    "content":`Le produit <strong>#${product_id}</strong> a été ajouté au panier: <strong>${this.props.paniers[panier_id].nicename}</strong>`
                })
            } else{
                this.props.add_alert({
                    "status":"error",
                    "content":`Erreur lors de l'ajout de <strong>nom du produit</strong> dans le panier ${this.props.paniers[panier_id].nicename}`
                })
            }
            this.setState({
                "isLoading":false
            })
        } );

    }

    handleRemoveToPanier( e, product_id ){

        // vars
        const the_panier_id = this.props.paniersSettings.active_panier_id;
        const the_panier = this.props.paniers[the_panier_id];
        const the_lot_id = e.target.getAttribute('data-lotkey');
        const the_product_id = product_id;

        const panier_update = {
            "uid":this.props.user.user_id,
            "lid":the_lot_id,
            "pid":the_panier_id,
            "productid":the_product_id,
            "action":"remove"
        }

        this.props.update_product_to_panier( panier_update , this.props.user.user_auth.auth_token , ( status ) => {
        } );

    }

    renderSwitchMode( mode , lot_key ){

        switch( mode ){
            case "catalog":{
                return <Button onClick={ 
                        !_.isEmpty( this.props.paniers ) ? 
                            (e) => {    
                                this.setState({isLoading:true})
                                this.handleAddToPanier( e, this.state.activeVariation , this.state.activeNumbr ) 
                            } 
                        :
                        null
                        } style={{marginRight: "10px"}} className="btn-white" data-lotkey={ lot_key }> 
                            { 
                                this.state.isLoading === true ? "En cours…" : "Ajouter au panier"
                            }
                        </Button>
            }
            case "panier":{
                return <Button onClick={ 
                    (e) => {    
                        this.setState({isLoading:true})
                        this.handleRemoveToPanier( e, this.state.activeVariation ) 
                    } 
                } style={{marginRight: "10px"}} className="btn-white" data-lotkey={ lot_key }>Retirer du panier</Button>
            }
            default :
            break;
        }
        
    }

    renderPaliers( variations ){

        ////console.log variations )
        const variations_F1 = _.filter( variations , ( variation ) => {
            return variation.variation_sku.includes('R1');
        } ); 
        
        //console.log variations_F1 );

        return(
            <div>
                    <div>
                        <p>Paliers:</p>
                    </div>
                {
                    _.map( variations_F1 , ( variation , index ) => {
                        return (
                            <div key={ variation.variation_id } style={ index === 0 ? {display:"flex",textAlign:"center",padding:"5px",background:"#17D5C8",color:"#FFF",borderRadius:"4px"} : {display:"flex",textAlign:"center",padding:"5px"} }> 
                                <div style={{ marginRight:"5px" }} > <strong> { variation.variation_attributes.attribute_quantite }: </strong> </div>
                                <div> <i> {variation.variation_price}€</i> </div>
                            </div> 
                        )
                    })
                }
            </div>
        )

    }

    changeQuantity( e , quantity ){

        // Change active number
        this.setState({
            activeNumbr:e.target.value
        })
        
        // Change active palier 
        _.each( quantity.attr_value , ( quantityNum , index ) => {
            if( e.target.value >= quantityNum ){
                this.setState({
                    activePalier: index + 1
                })
            }
        })

    } 

    renderPrice( activeNumbr , activePalier ){
        
        console.log( this.state.activeNumbr )
        console.log( this.state.activePalier )



        /*const variations_F1 = _.filter( variations , ( variation ) => {
            return variation.variation_sku.includes('R1');
        } ); 
        _.mapValues( variations_F1 , ( var ) => {
        } );
        return activeNumbr;*/

    }

    render(){
        console.log("test de fifouuuuuuuu :", this.props);
        return(
            <div className="article-bloc">
                <Row>
                    <Col md="1">
                        <p>Réf: <strong> 
                        { 
                            `${this.props.product_value.attributes[0].attr_value[0]}
                            ${this.props.product_value.attributes[1].attr_value[0]}
                            ${this.props.product_value.attributes[2].attr_value[0]}
                            ${this.props.product_value.attributes[3].attr_value[0]}`
                        }
                        </strong> </p>
                    </Col>
                    <Col md="2">
                        <p>Nom: 
                            <strong>
                                {this.props.product_value.name}
                            </strong>
                        </p>
                    </Col>
                    <Col md="2">
                        <p>Unité: 
                            <strong>
                                {this.props.product_value.attributes[5].attr_value[0]}
                            </strong>
                        </p>
                    </Col>
                    <Col md="2">
                        { this.renderPaliers( this.props.product_value.variations ) }
                    </Col>
                    <Col md="2">
                        <div>
                            <div>Quantité:</div>
                            <div><Input onChange={ (e) => this.changeQuantity( e , this.props.product_value.attributes[6] ) } type="number" value={this.state.activeNumbr} /></div>
                        </div>
                    </Col>
                    <Col md="1">
                        <div>
                            <p>Total:</p>
                            <p>
                                <strong>
                                    { this.renderPrice( this.state.activeNumbr , this.props.product_value.variations ) }€
                                </strong>
                            </p>
                        </div>
                    </Col>
                    <Col md="2" className="text-right">
                        {
                            _.has( this.props, "mode" ) ? 
                                this.renderSwitchMode( this.props.mode, this.props.lot_key )
                            :
                            null
                        }
                        <Button onClick={this.handleProductOpen} className="btn-white">Détails</Button>
                    </Col>
                </Row> 
                <Row>
                    <Col md="12">
                        <Collapse isOpen={this.state.isOpen}>
                                <div style={{marginTop: "30px"}}>
                                    <h4>Product Description : </h4>
                                    <p dangerouslySetInnerHTML={{__html: this.props.product_value.description}}></p>
                                </div>
                        </Collapse>
                    </Col>
                </Row>
            </div>

        )
    }

}

function mapStateToProps( state ){
    return{
        "user":state.user,
        "paniers":state.paniers,
        "paniersSettings":state.paniersSettings
    }
}

function mapDispatchToProps( dispatch ){
    return bindActionCreators({
        "update_product_to_panier":update_product_to_panier,
        "add_product_to_panier":add_product_to_panier,
        "add_alert":add_alert
    },dispatch)

}

export default connect( mapStateToProps, mapDispatchToProps )( Product ) 