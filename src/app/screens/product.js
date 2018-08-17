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

        // vars 

        const the_panier_id = this.props.paniersSettings.active_panier_id;
        const the_panier = this.props.paniers[the_panier_id];
        const the_lot_id = e.target.getAttribute('data-lotkey');
        const the_product_id = ''+product_id;

        //console.log(the_lot_id)
        //console.log(the_product_id)

        // ajouter item
        
        let the_new_panier = _.cloneDeep( the_panier );

        if( the_new_panier.lots === false ){

            the_new_panier.lots = []

            let new_lot = {
                'panier_lot_articles':[],
                'panier_lot_id':the_lot_id,
                'panier_lot_status':'not sended'
            }

            new_lot.panier_lot_articles.push( {'panier_article_id':the_product_id} )
        
            the_new_panier.lots.push( new_lot )

        }else{

            const the_lot_ids = _.map( the_new_panier.lots, ( lot ) => {
                return lot.panier_lot_id
            } )
    
            if( _.includes( the_lot_ids , the_lot_id) ){
                // update 
                _.each( the_new_panier.lots, ( lot ) => {
                    if( parseInt( lot.panier_lot_id ) === parseInt( the_lot_id ) ){
                        lot.panier_lot_articles.push( { 'panier_article_id':the_product_id } )
                    }
                } )
            }else{
                // create
                the_new_panier.lots.push( { 
                    'panier_lot_articles':[{'panier_article_id':the_product_id}],
                    'panier_lot_id':the_lot_id,
                    'panier_lot_status':'not sended'
                 } )
            }
    
        }

        ////console.log( the_new_panier );

        const panier_update = {
            "id":the_panier_id,
            "lots":the_new_panier.lots
        }

        // Ici on update le panier
        
        this.props.update_panier( panier_update , this.props.user.user_auth.auth_token , ( status ) => {

            //console.log( status );
            this.setState({
                "isLoading":false
            })

        } );


        /*this.props.add_product_to_panier( user_id, panier_id, product_id, lot_id, ( status ) => {
            ////////console.log(status)
            ////console.log(this.props.paniers)
            if(status === "success"){
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
        } )*/

    }

    renderSwitchMode( mode, lot_key ){
        //////console.log(mode)
        switch( mode ){
            case "catalog":{
                return <Button onClick={ 
                        !_.isEmpty( this.props.paniers ) ? 
                            (e) => {    
                                this.setState({isLoading:true})
                                this.handleAddToPanier( e, this.state.activeVariation ) 
                            } 
                        :
                        null
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
        //console.log("test", this.props);
        let the_price = null;
        const the_variation = _.filter( this.props.product_value.variations, ( variation ) => {
            return parseInt(variation.variation_id) === parseInt(this.state.activeVariation)
        });
        if( the_variation.length !== 0  ){
            the_price = the_variation[0].variation_price
        }

        return(

            <div className="article-bloc">
                <Row>
                    <Col md="3">
                        <p>Réf : <b> 
                        { 
                            `${this.props.product_value.attributes[0].attr_value[0]}-${this.props.product_value.attributes[1].attr_value[0]}-${this.props.product_value.attributes[2].attr_value[0]}-${this.props.product_value.attributes[4].attr_value[0]}`
                        }
                        </b> </p>
                    </Col>

                    <Col md="3">
                        <p><b>{this.props.product_value.name}</b></p>
                    </Col>

                    {/*
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
                    */}

                    <Col md="3">
                            <div>
                                { this.props.product_value.variations.length !== 0 ?
                                    <p>À partir de : <b>{the_price}€</b></p>
                                    :
                                    <p>À partir de : <b>{this.props.product_value.price }€</b></p>
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