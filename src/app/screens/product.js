import React from "react"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { update_panier } from "../actions/index"
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
            activeVariation : "",
            isLoading: false
        };

        this.handleProductOpen = this.handleProductOpen.bind(this);
        this.handleProductChangeVariation = this.handleProductChangeVariation.bind(this);
        this.handleAddToPanier = this.handleAddToPanier.bind(this);
        this.renderSwitchMode = this.renderSwitchMode.bind(this);
    }

    componentDidMount(){

        if( this.props.product_value.variations.length !== 0 ){
            
            this.setState({
                activeVariation: this.props.product_value.variations[0].variation_id
            })

        }else{

            this.setState({
                activeVariation: this.props.product_value.id
            })

        }

    }

    handleProductOpen(e){

        this.setState({
            isOpen : !this.state.isOpen 
        })

    }

    handleProductChangeVariation( e ){
        // new active variation 
        const active_variation_id = e.target.value;
        this.setState({
            activeVariation:e.target.value
        })

    }

    handleAddToPanier( e, product_id ){

        const lot_id = e.target.getAttribute('data-lotkey');
        const user_id = this.props.user.user_id;
        const panier_id = this.props.paniersSettings.active_panier_id;
        this.props.add_product_to_panier( user_id, panier_id, product_id, lot_id, ( status ) => {

            if(status === "success"){

                /*
                this.props.add_alert({
                    "status":"success",
                    "content":`<strong>nom du produit</strong>, ajouté au panier ${this.props.panier[panier_id]}`
                })
                */

                
                this.setState({
                    isLoading:false
                });
                this.props.add_alert({
                    "status":"success",
                    "content":`Le produit <strong>#${product_id}</strong> a été ajouté au panier: <strong>${this.props.paniers[panier_id].nicename}</strong>`
                })


            }else{
                this.props.add_alert({
                    "status":"error",
                    "content":`Erreur lors de l'ajout de <strong>nom du produit</strong> dans le panier ${this.props.paniers[panier_id].nicename}`
                })
            }


        } )

    }

    renderSwitchMode( mode, lot_key ){
        ////console.log(mode)
        switch( mode ){
            case "catalog":{
                return <Button onClick={ 
                            (e) => {    
                                this.setState({isLoading:true})
                                this.handleAddToPanier( e, this.state.activeVariation ) 
                            } 
                        } style={{marginRight: "10px"}} className="btn-white" data-lotkey={ lot_key }> 
                            { 
                                this.state.isLoading === true ? "En cours…" : "Ajouter aux paniers"
                            }
                        </Button>
            }
            case "panier":{
                return <Button style={{marginRight: "10px"}} className="btn-white" >Retirer du panier</Button>
            }
            default :
            break;
        }
    }

    render(){
        console.log("test", this.props);
        let the_price = null;
        const the_variation = _.filter( this.props.product_value.variations, ( variation ) => {
            return parseInt(variation.variation_id) === parseInt(this.state.activeVariation)
        })
        if( the_variation.length !== 0  ){
            the_price = the_variation[0].variation_price
        }

        return(

            <div className="article-bloc">
                <Row>
                    <Col md="2">
                        <p>Réf : <b> 
                        { 
                            `${this.props.product_value.attributes[0].attr_value[0]}.${this.props.product_value.attributes[1].attr_value[0]}.${this.props.product_value.attributes[2].attr_value[0]}.${this.props.product_value.attributes[3].attr_value[0]}.${this.props.product_value.attributes[5].attr_value[0]}`
                        } 
                        </b> </p>
                    </Col>

                    <Col md="3">
                        <p><b>{this.props.product_value.name}</b></p>
                    </Col>

                    <Col md="3">
                    <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start"}}>
                        
                        <div>
                        <label style={{margin:"0 5px 0 0"}}>Quantité : </label>
                        </div>
                        <div>
                        <Input type="select" className="select-product" value={ this.state.activeVariation } onChange={ this.handleProductChangeVariation } >
                            {
                                this.props.product_value.variations.length !== 0 ? 
                                    _.map( this.props.product_value.variations, ( variation ) => {
                                        return (
                                            <option key={variation.variation_id} value={variation.variation_id} > { variation.variation_attributes.attribute_quantity } </option>
                                        )
                                    })
                                :
                                <option value={ this.state.activeVariation } > Aucune Variation </option>
                            }
                        </Input>
                        </div>

                    </div>
                    </Col>

                    <Col md="1">
                            <div>
                                { this.props.product_value.variations.length !== 0 ?
                                    <p>Price : <b>{the_price}€</b></p>
                                    :
                                    <p>Price : <b>{this.props.product_value.price }€</b></p>
                                }
                            </div>
                    </Col>

                    <Col md="3" className="text-right">

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
                                <div>
                                    <h4>Product Description : </h4>
                                    <p dangerouslySetInnerHTML={{__html: this.props.product_value.description}}></p>
                                </div>
                                <div>
                                    <h4>Product Base Price : </h4>
                                    <p> {this.props.product_value.price} €</p>
                                </div>
                                <div>
                                    <h4>Product Variations : </h4>

                                    {
                                        this.props.product_value.variations.length !== 0 ? 
                                            _.map( this.props.product_value.variations, ( variation ) => {

                                                return (

                                                    <div key={variation.variation_id}>
                                                        <hr/>
                                                        <p> <b>Variation Attribute :</b> </p>
                                                        <p> { variation.variation_attributes.attribute_quantity } </p>

                                                        <p> <b>Variation Description :</b> </p>
                                                        <p> {variation.variation_description} </p>

                                                        <p> <b>Variation Price :</b> </p>
                                                        <p> {variation.variation_price} €</p>
                                                        <hr/>
                                                    </div>

                                                )

                                            })
                                        :
                                        <p> aucune variation du produit disponible </p>
                                    }
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

        "update_panier":update_panier,
        "add_product_to_panier":add_product_to_panier,
        "add_alert":add_alert

    },dispatch)

}

export default connect( mapStateToProps, mapDispatchToProps )( Product ) 