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
            activeVariation : "",
            activeNumbr:0,
            isLoading: false
        };

        this.handleProductOpen = this.handleProductOpen.bind(this);
        this.handleProductChangeVariation = this.handleProductChangeVariation.bind(this);
        this.handleAddToPanier = this.handleAddToPanier.bind(this);
        this.renderSwitchMode = this.renderSwitchMode.bind(this);

        this.upQuantity = this.upQuantity.bind(this);
        this.downQuantity = this.downQuantity.bind(this);
        this.renderQuantityInput = this.renderQuantityInput.bind(this);

        
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

        this.setState(
            {
                activeNumbr:0
            }
        )

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

    handleAddToPanier( e, product_id , product_quantity ){

        // vars
        const the_panier_id = this.props.paniersSettings.active_panier_id;
        const the_panier = this.props.paniers[the_panier_id];
        const the_lot_id = e.target.getAttribute('data-lotkey');
        const the_product_id = product_id;
        const the_product_quantity = product_quantity;

        //////console.log( e )
        //////console.log( the_product_id );

        /*let the_new_panier = _.cloneDeep( the_panier );
        if( the_new_panier.lots === false ){

            the_new_panier.lots = [];

            let new_lot = {
                'panier_lot_articles':[],
                'panier_lot_id':the_lot_id,
                'panier_lot_status':'not sended'
            };

            new_lot.panier_lot_articles.push({'panier_article_id':the_product_id});
            the_new_panier.lots.push( new_lot )

        } else {

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
    
        }*/

        ////////console.log( the_new_panier );

        const panier_update = {
            "uid":this.props.user.user_id,
            "lid":the_lot_id,
            "pid":the_panier_id,
            "productid":the_product_id,
            "productQuantity":the_product_quantity,
            "action":"add"
        }

        // Ici on update le panier

        //////console.log( panier_update );
        
        this.props.update_product_to_panier( panier_update , this.props.user.user_auth.auth_token , ( status ) => {

            //////console.log( status );
            this.setState({
                "isLoading":false
            })

        } );


        /*this.props.add_product_to_panier( user_id, panier_id, product_id, lot_id, ( status ) => {
            ////////////console.log(status)
            ////////console.log(this.props.paniers)
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

            //////console.log( status );
            /*this.setState({
                "isLoading":false
            })*/

        } );


    }

    renderSwitchMode( mode , lot_key ){
        //////////console.log(mode)
        //////console.log('yey')
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
                                this.state.isLoading === true ? "En cours…" : "Ajouter aux paniers"
                            }
                        </Button>
            }
            case "panier":{
                /*return <Button onClick={ 
                    (e) => {    
                        this.setState({isLoading:true})
                        this.handleRemoveToPanier( e, this.state.activeVariation ) 
                    } 
                } style={{marginRight: "10px"}} className="btn-white" data-lotkey={ lot_key }>Retirer du panier</Button>*/
                return null
            }
            default :
            break;
        }
    }

    upQuantity(){
        ////console.log( "upQuantity" )

        this.setState({
            activeNumbr:this.state.activeNumbr + 1
        })

    }
    downQuantity(){
        ////console.log( "downQuantity" )

        this.state.activeNumbr === 0 ?
        null
        :
        this.setState({
            activeNumbr:this.state.activeNumbr - 1
        })

    }

    renderQuantityInput(){

        return(
            <div className="" style={{display:"flex",alignItems:"center"}}>
                <Button style={{textAlign:"center"}} onClick={ this.downQuantity } className="">-</Button>
                    <Input type="number" value={ this.state.activeNumbr } />
                <Button style={{textAlign:"center"}} onClick={ this.upQuantity } className="">+</Button>
            </div>
        )
    }

    render(){
        //////console.log("test", this.props);
        let the_price = null;
        const the_variation = _.filter( this.props.product_value.variations, ( variation ) => {
            return parseInt(variation.variation_id) === parseInt(this.state.activeVariation)
        });
        if( the_variation.length !== 0  ){
            the_price = the_variation[0].variation_price
        }

        //console.log(this)

        return(

            <div className="article-bloc">
                <Row>
                    <Col md="2">
                        <p>{this.state.activeVariation}</p>
                        <p>Réf : <b> 
                        { 
                            `${this.props.product_value.attributes[0].attr_value[0]}-${this.props.product_value.attributes[1].attr_value[0]}-${this.props.product_value.attributes[2].attr_value[0]}-${this.props.product_value.attributes[4].attr_value[0]}`
                        }
                        </b> </p>
                    </Col>

                    <Col md="3">
                        <p><b>{this.props.product_value.name}</b></p>
                    </Col>

                    <Col md="2">
                            <div>
                                { 
                                    this.props.product_value.variations.length !== 0 ?
                                    <p>À partir de : <b>{the_price}€</b></p>
                                    :
                                    <p>À partir de : <b>{this.props.product_value.price }€</b></p>
                                }
                            </div>
                    </Col>

                     <Col md="2">
                          <div>

                                <div>
                                    <p>Quantité:</p>
                                </div>
                            
                               <div>
                                    {
                                        _.has( this.props, "mode" ) ? 
                                            this.props.mode === "panier" ? 
                                            <p><strong>{this.props.product_value.quantity}</strong></p>
                                            :
                                            this.renderQuantityInput()
                                        :
                                        null
                                    }
                               </div>

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