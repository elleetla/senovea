import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import Banner from '../containers/Banner/Banner';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {callCustomers} from "../actions/index";

class AllUsers extends Component{
     componentDidMount(){
          this.props.callCustomers();
     }

     renderCustomers(){
          return this.props.customers.map(data => {
               return(
                   <Col key={data.id} sm={12}>
                        <div className="article-bloc">
                             <Row>
                                  <Col md="12" className="text-center">
                                       <b>{data.username}</b>
                                  </Col>
                             </Row>
                        </div>
                   </Col>
               )
          })
     }

     render(){
          console.log(this.props);
          return(
              <div>
                   <Banner
                       titleBanner="Acheteurs référencés"
                       desc="Nous nous réjouissions de compter dans notre communauté d'acheteurs
                       des institutions prestigieuses qui nous font confiance dans le choix de leurs fournisseurs."
                   />
                   <Container className="mb-5 mt-5">
                        <Row>
                             <Col sm={12}>
                                  <div className="title-bloc-lot">
                                       <p>Acheteurs référencés</p>
                                  </div>
                             </Col>
                             {this.renderCustomers()}
                        </Row>
                   </Container>
              </div>
          )
     }
}

// Redux
function mapStateToProps(state){
     return {
          "products": state.products,
          "user": state.user,
          "suppliers": state.suppliers,
          "suppliersSettings": state.suppliersSettings,
          "customers": state.customers
     }
}

function mapDispatchToPros(disptach){
     return(
         bindActionCreators(
             {"callCustomers":callCustomers}, disptach)
     )
}

// export
export default connect(mapStateToProps, mapDispatchToPros)(AllUsers);