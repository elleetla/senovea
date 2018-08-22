import React from "react"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash"
import Product from "./product"
import moment from 'moment';
import { BrowserRouter, HashRouter, Switch, Route, Redirect } from 'react-router-dom'

import { post_order } from "../actions/index"
import { order_panier } from "../actions/index"
import { add_alert } from "../actions/index"

import { Card, Container, Row, Col, Badge, Input, Label, FormGroup } from 'reactstrap';

class AccountPaniersDetail extends React.Component{

     constructor(props){
          super(props);
          this.state = {
               "orderLoading":false,
               "priceTotal": ""
          };
          this.handleOrder = this.handleOrder.bind(this);
     }

     handleOrder(){
          this.setState({
               "orderLoading":true
          });

          this.props.post_order( this.props.user.user_auth.auth_token , this.props.panier.id , ( order_panier_status ) =>{
               if( order_panier_status === "success" ){

                    this.props.add_alert({
                         "status":"success",
                         "content":`Les commandes ont été crées`
                    })

                    this.setState({
                         "orderLoading":false
                    })

               }else{

                    this.props.add_alert({
                         "status":"error",
                         "content":`Erreur lors de la création des commandes`
                    })

                    this.setState({
                         "orderLoading":false
                    })

               }
          })



          /*this.setState({
              "orderLoading":true
          })
          // ici on valide le panier
          // ( creation d'une order )
          this.props.order_panier( this.props.panier.id, ( order_panier_status ) =>{
              // Callback
              if( order_panier_status === "success" ){
                  this.props.add_alert({
                      "status":"success",
                      "content":`Le panier a bien été commandé!`
                  })
              }else{
                  this.props.add_alert({
                      "status":"error",
                      "content":`Erreur lors de la commande du panier`
                  })
              }
              this.setState({
                  "orderLoading":false
              })
          })*/

     }

     renderPanierStatus(status){
          switch( status ){
               case"not sended":{
                    return <Badge color="warning"> {status} </Badge>
               }
               default:
                    return <Badge color="info"> No status </Badge>
          }
     }


     render(){

          console.log("Prix Paniers :", this.props);

          if( this.props.panier.status !== "not sended" ) {
               return <Redirect to="/account/paniers"/>
          }

          //console.log(this.props);
          //console.log("totalPrice: ", this.props.totalPrice);

          const groupedArticlesByFournisseurs = _.groupBy( this.props.panier.products_lots , ( product ) => {
               return product.lot.lot_fournisseur_r1.ID;
          } );

          return(
              <div>
                   <div className="section-infos-detail-panier">
                        <Container>
                             <Row>
                                  <Col md="4">
                                       <div className="date-detail-panier">Panier du <b>{moment(this.props.panier.panier_date_created).locale('fr').format('L')}</b></div>
                                       <div><b>{this.props.counterProduct}</b> articles | Montant Total HT : <b>7000 €</b></div>
                                  </Col>
                                  <Col md="5">
                                       <h1 className="title-infos-detail-panier">{this.props.panier.nicename}</h1>
                                  </Col>

                                  <Col md="3">
                                       {/*
                                <button className="btn-green"  onClick={ () => this.handleOrder() } >
                                    {this.state.orderLoading ? "Commande en cours..." : "Valider mon panier"}
                                </button>
                            */}
                                       <button className="btn-green"  onClick={() => this.handleOrder()} >
                                            {this.state.orderLoading ? "Commande en cours..." : "Commander mon panier"}
                                       </button>
                                  </Col>
                             </Row>
                        </Container>
                   </div>
                   <Container>
                        <Row style={{marginBottom:"25px"}}>
                             <Col md="12">
                                  <Card style={{padding:"25px"}}>
                                       <form>
                                            <Row>
                                                 <Col md="6">
                                                      <div>
                                                           <h4>Adresse du lieu d'intervention </h4>
                                                           <FormGroup>
                                                                <Label> Code Arrondissement </Label>
                                                                <Input disabled type="text" placeholder="Code Arrondissement"  defaultValue={this.props.panier.arrondissement}/>
                                                           </FormGroup>
                                                           <FormGroup>
                                                                <Label> Code Postal </Label>
                                                                <Input type="text" placeholder="Code Postal" defaultValue={this.props.panier.code_postal}/>
                                                           </FormGroup>
                                                           <FormGroup>
                                                                <Label> Adresse Intervention </Label>
                                                                <Input type="text" placeholder="Ville"  defaultValue={this.props.panier.adresse}/>
                                                           </FormGroup>
                                                      </div>
                                                 </Col>
                                                 <Col md="6">
                                                      <div>
                                                           <h4> Message à l'attention du fournisseur </h4>
                                                           <FormGroup>
                                                                <Label> Message </Label>
                                                                <Input type="textarea" defaultValue="message" defaultValue={this.props.panier.message}/>
                                                           </FormGroup>
                                                           <div>
                                                                <button className="btn-white">Annuler</button>
                                                                <button className="btn-white">Sauvegarder</button>
                                                           </div>
                                                      </div>
                                                 </Col>

                                            </Row>

                                       </form>
                                  </Card>


                             </Col>
                        </Row>

                        <Row>
                             <Col md="12">
                                  <h4 style={{marginBottom:"25px"}}>Articles</h4>
                             </Col>
                        </Row>


                        <Row>

                             <Col md="12">
                                  {

                                       !_.isEmpty( groupedArticlesByFournisseurs ) ?

                                           _.map( groupedArticlesByFournisseurs , ( articles, indexF ) => {

                                                const groupedArticlesByLot = _.groupBy( articles , ( article ) => {
                                                     return article.lot.lot_id;
                                                });

                                                return (

                                                    <div key={indexF} >
                                                         {_.map( groupedArticlesByLot , ( articles, indexL ) => {
                                                              return (
                                                                  <div style={{marginBottom:"25px"}} className="bloc-lot" key={indexL}>
                                                                       <div className="title-bloc-lot">
                                                                            <p>{articles[0].lot.lot_name} ({articles.length} {articles.length === 1 ? "article" : "articles"}) - Montant Total HT : 1000€</p>
                                                                       </div>
                                                                       {_.map( articles , ( article , indexA ) => {
                                                                            return <Product key={indexA} product_value={article} product_key={article.id} lot_key={indexL} mode="panier"   />
                                                                       } )}
                                                                  </div>
                                                              )
                                                         })}

                                                    </div>


                                                )

                                           })
                                           :
                                           <Container>
                                                <Row>
                                                     <Col md={12}>
                                                          <h5 align="center" style={{marginTop: "30px"}}>Aucun article ne correspond à la recherche.</h5>
                                                     </Col>
                                                </Row>
                                           </Container>
                                  }


                             </Col>



                             {/*{ this.props.products.length === 0 ?
                                    <Col md="12">
                                        Aucun article n'est présent dans ce panier
                                    </Col>
                                    :
                                    _.map(this.props.products, (categories_values, categories_keys) => {
                                            return(
                                                <Col md="12" key={categories_keys}>
                                                    { _.map( categories_values, ( lots_values, lots_keys ) => {
                                                        return(
                                                            <div key={lots_keys}>
                                                                <div className="bloc-lot">
                                                                    <div className="title-bloc-lot">
                                                                        <p>{lots_values.lot_name} ({lots_values.lot_products.length} articles)</p>
                                                                    </div>
                                                                    { _.map( lots_values.lot_products, ( prestations_values, prestations_keys ) =>{
                                                                        //////////console.log(prestations_values)
                                                                        return(
                                                                            <Product key={prestations_keys} product_value={prestations_values} product_key={prestations_keys} lot_key={lots_keys} mode="panier"  />
                                                                        )
                                                                    })}
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </Col>
                                            )
                                        })
                                    }*/}



                             {/*<Col md="12" className="mb-5">
                                        <button className="btn-green"  onClick={() => this.handleOrder()} >
                                            {this.state.orderLoading ? "Commande en cours..." : "Commander mon panier"}
                                        </button>
                                </Col>*/}
                        </Row>
                   </Container>
              </div>
          )
     }

}

function mapStateToProps(state, props){

     /*

      // Good panier
      const the_panier_id = props.routeProps.match.params.id;
      const the_panier = _.get( _.pick( state.paniers, [the_panier_id] ), the_panier_id, {} );

      // Panier Products
      const lots_mapKeys = _.mapKeys( the_panier.lots, ( lot ) => {
           return lot.panier_lot_id
      })
      //////////console.log('mapStateToProps')
      //////////console.log(lots_mapKeys)
      const lots_mapValues = _.mapValues( lots_mapKeys, ( lot ) => {
           return _.map( lot.panier_lot_articles, ( article ) => {
                return article.panier_article_id
           })
      })
      //////////console.log(lots_mapValues)

      // Filters Lots
      const lotsFiltered = _.mapValues( state.products, ( cat_val, cat_key ) => {
           //////////console.log(cat_val)
           //////////console.log( lots_mapValues )

           const filtered = _.filter(cat_val, (lot_val,lot_key)=>{
                return _.has(lots_mapValues, lot_key)
           })

           return _.isEmpty( filtered ) ?
               {}:
               _.mapKeys( filtered, (lot_val,lot_key) =>{
                    return lot_val.lot_id
               })

      } )

      // Filters Products
      let new_product = {};
      let counterProduct = 0;
      let totalPrice = 0;
      for( let cat_name in lotsFiltered ){
           if( _.isEmpty( lotsFiltered[cat_name] ) === false ){
                new_product[cat_name] = {}
                for( let lot_id in lotsFiltered[cat_name] ){
                     new_product[cat_name][lot_id] = {}

                     new_product[cat_name][lot_id].lot_id = lotsFiltered[cat_name][lot_id].lot_id
                     new_product[cat_name][lot_id].lot_name = lotsFiltered[cat_name][lot_id].lot_name
                     new_product[cat_name][lot_id].lot_fournisseur_r1 = lotsFiltered[cat_name][lot_id].lot_fournisseur_r1

                     let products_array = []
                     // Good Products
                     for( let product of lotsFiltered[cat_name][lot_id].lot_products ){

                          // Si variation empty
                          if( _.isEmpty( product.variations ) === false ){
                               for( let good_product_id of lots_mapValues[lot_id] ){
                                    for( let variation of product.variations ){
                                         if( parseInt(variation.variation_id) === parseInt(good_product_id) ){
                                              // ajout
                                              products_array.push( product );
                                              counterProduct = counterProduct + 1;
                                              totalPrice = totalPrice + variation.variation_price
                                         }
                                    }
                               }
                          }else{
                               for( let good_product_id of lots_mapValues[lot_id] ){
                                    if( parseInt(product.id) === parseInt(good_product_id) ){
                                         // ajout
                                         products_array.push( product );
                                         counterProduct = counterProduct + 1;
                                         //totalPrice = totalPrice + variations.variation_price
                                    }
                               }
                          }

                     }

                     // Add Products
                     new_product[cat_name][lot_id].lot_products = products_array;

                }
           }
      }

      ////////console.log(new_product)
      //////////console.log(lotsFiltered)


      // Good product



      return {
           "user":state.user,
           "products":new_product,
           "panier":the_panier,
           "panierProducts":lots_mapValues,
           "paniersSettings":state.paniersSettings,
           "counterProduct": counterProduct,
           "totalPrice" : totalPrice
      }

      */

     // Good panier
     const the_panier_id = props.routeProps.match.params.id;
     const the_panier = _.get( _.pick( state.paniers, [the_panier_id] ), the_panier_id, {} );

     return {

          "user":state.user,
          "panier":the_panier,
          "paniersSettings":state.paniersSettings

     }

}

function mapDispatchToProps(dispatch){
     return bindActionCreators({
          "post_order":post_order,
          "order_panier":order_panier,
          "add_alert":add_alert
     },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPaniersDetail)