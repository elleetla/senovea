import React from "react";
import Account from "./account";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Card, Button, CardHeader, CardFooter, CardBody, CardTitle, CardText } from 'reactstrap';
import { Link } from "react-router-dom"
import _ from "lodash"
class AccountPaniers extends React.Component{

    render(){
        console.log(this)
        return(
            <Account>
                {
                    _.isEmpty(this.props.paniers) ? 
                    <div>
                        <h3>Il n'y a aucun panier lié à votre compte</h3>
                        <button>Créer un panier</button>
                    </div>
                    :
                    <div>
                        { 
                            _.map( this.props.paniers, (panier) => {

                                console.log(panier)
                                return (
                                        <Card key={panier.id} style={{marginBottom:"15px"}}>
                                            <CardHeader>status : {panier.status}</CardHeader>
                                                <CardBody>
                                                    <CardTitle>{panier.nicename}</CardTitle>
                                                    <hr/>
                                                    <div>
                                                        <div>
                                                        <h4>Panier Lots:</h4>
                                                        </div>
                                                        <div>
                                                            {
                                                                _.isEmpty( panier.lots ) || panier.lots === false ? 
                                                                <div> lots empty </div>
                                                                :
                                                                _.map( panier.lots, (lot) => {
                                                                    return(
                                                                        <div key={`${panier.id}_${lot.panier_lot_id}`}>
                                                                        <ul>
                                                                        <li><div> <strong>lot id :</strong>  {lot.panier_lot_id}</div></li>
                                                                        <li><div> <strong>lot status :</strong> {lot.panier_lot_status} </div></li>
                                                                        <li><div> <strong>lot articles :</strong> </div></li>
                                                                        <ul>
                                                                        {
                                                                            _.isEmpty( lot.panier_lot_articles ) || lot.panier_lot_articles === false ? 
                                                                            <li><div> Articles empty </div></li>
                                                                            :
                                                                            _.map( lot.panier_lot_articles, (article, i) => {
                                                                                return <li key={`${panier.id}_${lot.panier_lot_id}_${article.panier_article_id}_${i}`}><div> <strong>Article ID :</strong> {article.panier_article_id} </div></li>
                                                                            } )
                                                                        }
                                                                        </ul>
                                                                        </ul>
                                                                        </div>
                                                                    )
                                                                } )
                                                            }
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                    <Link to={{ pathname: `/account/paniers/${panier.id}` }}> <Button>Voir le panier</Button> </Link>
                                                </CardBody>
                                            <CardFooter>id : {panier.id}</CardFooter>
                                        </Card>
                                )

                            })
                        }
                    </div>
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