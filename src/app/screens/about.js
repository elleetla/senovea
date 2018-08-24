import React, { Component } from 'react';

// import styles
import {Row, Col, Table} from 'reactstrap';

// import component centralis
import Banner from '../containers/Banner/Banner';
import AboutNavigation from '../containers/About-navigation/about-navigation';
import { urlApi } from '../../../config/config-api';
import { update_modal_settings, pageAbout } from "../actions";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

class About extends Component{

     constructor(props){
          super(props);
          this.handleModalToggle = this.handleModalToggle.bind(this);

          this.state = {
               modalRegistration: false,
          };
     }

     componentWillMount(){
          this.props.pageAbout();
     }

     handleModalToggle(component){
          const modalSize = component === "register" ? "big" : "medium";
          this.props.update_modal_settings({
               "isOpen": true,
               "title": component,
               "component": component,
               "size": modalSize
          });
     }

     render(){
          return(
              <div>
                   <Banner titleBanner={this.props.aboutPage.banner_page !== undefined ? this.props.aboutPage.banner_page.title_banner_page : null}/>

                   <AboutNavigation about={
                        {
                             "section1" : "#section1",
                             "section2" : "#section2",
                             "section3" : "#section3",
                             "section4" : "#section4",
                             "section5" : "#section5"
                        }
                   }/>

                   <section className="container">
                        <Row>
                             <Col sm={12} className="mb-4 mt-4">
                                  {this.props.aboutPage !== undefined ?
                                      <p dangerouslySetInnerHTML={{__html: this.props.aboutPage.text_intro_section}}></p>
                                  : null}
                             </Col>
                        </Row>
                   </section>

                   <section id="section1" className="container section-bloc-about">
                        <Row className="bloc-about">
                             <Col sm={8} className="align-self-center content-bloc">
                                  {this.props.aboutPage.section_about !== undefined ?
                                      <div>
                                           <h3>{this.props.aboutPage.section_about[0].title_section}</h3>
                                           <p dangerouslySetInnerHTML={{__html: this.props.aboutPage.section_about[0].text_section}}></p>
                                      </div>
                                      :
                                      <div>
                                           <h3>Titre de la section</h3>
                                           <p>Texte de la section</p>
                                      </div>
                                  }
                             </Col>
                             <Col sm={4} className="p-0">
                                  {this.props.aboutPage.section_about !== undefined ?
                                      <img className="img-fluid" src={this.props.aboutPage.section_about[0].img_section ? this.props.aboutPage.section_about[0].img_section : "https://via.placeholder.com/500x500"} alt={this.props.aboutPage.section_about[0].title_section}/>
                                      :
                                      <img className="img-fluid" src="https://via.placeholder.com/500x500" alt="titre de l'image"/>
                                  }
                             </Col>
                        </Row>
                   </section>

                   <section id="section2" className="container section-bloc-about">
                        <Row className="bloc-about">
                             <Col sm={4} className="p-0 content-bloc-img">
                                  {this.props.aboutPage.section_about !== undefined ?
                                      <img className="img-fluid" src={this.props.aboutPage.section_about[1].img_section ? this.props.aboutPage.section_about[1].img_section : "https://via.placeholder.com/500x500"} alt={this.props.aboutPage.section_about[1].title_section}/>
                                      :
                                      <img className="img-fluid" src="https://via.placeholder.com/500x500" alt="titre de l'image"/>
                                  }
                             </Col>
                             <Col sm={8} className="align-self-center content-bloc">
                                  {this.props.aboutPage.section_about !== undefined ?
                                      <div>
                                           <h3>{this.props.aboutPage.section_about[1].title_section}</h3>
                                           <p dangerouslySetInnerHTML={{__html: this.props.aboutPage.section_about[1].text_section}}></p>
                                      </div>
                                      :
                                      <div>
                                           <h3>Titre de la section</h3>
                                           <p>Texte de la section</p>
                                      </div>
                                  }
                             </Col>
                        </Row>
                   </section>

                   <section id="section3" className="container section-bloc-about">
                        <Row className="bloc-about">
                             <Col sm={8} className="align-self-center content-bloc">
                                  {this.props.aboutPage.section_about !== undefined ?
                                      <div>
                                           <h3>{this.props.aboutPage.section_about[2].title_section}</h3>
                                           <p dangerouslySetInnerHTML={{__html: this.props.aboutPage.section_about[2].text_section}}></p>
                                      </div>
                                      :
                                      <div>
                                           <h3>Titre de la section</h3>
                                           <p>Texte de la section</p>
                                      </div>
                                  }
                             </Col>
                             <Col sm={4} className="p-0 content-bloc-img">
                                  {this.props.aboutPage.section_about !== undefined ?
                                      <img className="img-fluid" src={this.props.aboutPage.section_about[2].img_section ? this.props.aboutPage.section_about[2].img_section : "https://via.placeholder.com/500x500"} alt={this.props.aboutPage.section_about[2].title_section}/>
                                      :
                                      <img className="img-fluid" src="https://via.placeholder.com/500x500" alt="titre de l'image"/>
                                  }
                             </Col>
                        </Row>
                   </section>

                   <section id="section4" className="container section-bloc-about">
                        <Row className="bloc-about">
                             <Col sm={4} className="p-0 content-bloc-img">
                                  {this.props.aboutPage.section_about !== undefined ?
                                      <img className="img-fluid" src={this.props.aboutPage.section_about[3].img_section ? this.props.aboutPage.section_about[3].img_section : "https://via.placeholder.com/500x500"} alt={this.props.aboutPage.section_about[3].title_section}/>
                                      :
                                      <img className="img-fluid" src="https://via.placeholder.com/500x500" alt="titre de l'image"/>
                                  }
                             </Col>
                             <Col sm={8} className="align-self-center content-bloc">

                                  {this.props.aboutPage.section_about !== undefined ?
                                      <div>
                                           <h3>{this.props.aboutPage.section_about[3].title_section}</h3>
                                           <ul className="list-section-about">
                                                <li>
                                                     <span className="icon-list-about">1</span>
                                                     Si vous n’êtes pas déjà adhérent, <a className="link-bloc-about" href={`${urlApi}/wp-content/uploads/2018/08/bulletin-adhesion.pdf`} target="_blank">téléchargez le bulletin d’adhésion
                                                     à compléter</a> et <a className="link-bloc-about" onClick={()=>{this.handleModalToggle('register')}}>inscrivez-vous en ligne</a>.
                                                     <br/>
                                                     <br/>
                                                     Le mot de passe sera envoyé rapidement dès validation de votre inscription par Centralis®.
                                                </li>
                                                <li>
                                                     <span className="icon-list-about">2</span>
                                                     Précisez le lieu des travaux, sélectionnez les prestations qui vous intéressent et validez votre panier.
                                                </li>
                                                <li>
                                                     <span className="icon-list-about">3</span>
                                                     Dès validation du panier, la centrale envoie les bons de commande
                                                     aux différentes entreprises concernées qui disposent de quelques
                                                     jours pour accuser réception et prendre contact avec vous.</li>
                                                <li>
                                                     <span className="icon-list-about">4</span>
                                                     Les entreprises interviennent dans le cadre contractuel et vous
                                                     facturent directement leurs prestations conformément à la commande,
                                                     sans autres frais de commission.
                                                </li>
                                           </ul>
                                      </div>
                                      : null
                                  }
                             </Col>
                        </Row>
                   </section>

                   <section id="section5" className="container section-bloc-about">
                        <Row className="bloc-about">
                             <Col sm={8} className="align-self-center content-bloc">
                                  <h3>Quel est le montant de l’adhésion ?</h3>
                                  <Table size="sm" className="text-center" striped>
                                       <thead>
                                            <tr>
                                                 <th>Adhésion annuelle</th>
                                                 <th>Pour les collectivités<br/>(en habitants)</th>
                                                 <th>Pour les autres organismes<br/>(en salariés)</th>
                                            </tr>
                                       </thead>
                                       <tbody>
                                       { this.props.aboutPage.section_about !== undefined ?
                                           this.props.aboutPage.section_about[4].array_data.map(data => {
                                                return(
                                                    <tr>
                                                         <td>{data.data_one}</td>
                                                         <td>{data.data_two}</td>
                                                         <td>{data.data_three}</td>
                                                    </tr>
                                                )
                                           })
                                           : null
                                       }
                                       </tbody>
                                  </Table>
                             </Col>
                             <Col sm={4} className="p-0 content-bloc-img">
                                  {this.props.aboutPage.section_about !== undefined ?
                                      <img className="img-fluid" src={this.props.aboutPage.section_about[4].img_section ? this.props.aboutPage.section_about[4].img_section : "https://via.placeholder.com/500x500"} alt={this.props.aboutPage.section_about[4].title_section}/>
                                      :
                                      <img className="img-fluid" src="https://via.placeholder.com/500x500" alt="titre de l'image"/>
                                  }
                             </Col>
                        </Row>
                   </section>

                   <section id="section5" className="container">
                        <Row>
                             <Col md={{size: "2", offset: "5"}}>
                                  <button className="btn-green" onClick={() => {this.handleModalToggle('register')}}>Inscrivez-vous !</button>
                             </Col>
                        </Row>
                   </section>
              </div>
          )
     }
}

function mapStateToProps(state){
     return {
          "aboutPage": state.aboutPage
     }
}

function mapDispatchToProps(dispatch){
     return bindActionCreators({
          "update_modal_settings":update_modal_settings,
          "pageAbout": pageAbout
     }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(About);