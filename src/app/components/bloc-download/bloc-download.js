import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { urlApi } from '../../../../config/config-api';

// import styles
import { Container, Row, Col, } from 'reactstrap';
import './bloc-download.css';

// import assets
import PictoDoc from '../../assets/img/picto_doc.svg';

import { update_modal_settings } from '../../actions/index';
import {pageDownloading} from "../../actions";

// creation of the class "AllSupliers"
class BlocDownload extends Component{

    constructor(props){
        super(props);
        this.handleModalToggle = this.handleModalToggle.bind(this)
    }

    componentWillMount(){
        this.props.pageDownloading();
    }

    handleModalToggle( component ){
        const modalsize = component === "register" ? "big" : "medium";
        this.props.update_modal_settings( {
            "isOpen":true,
            "title":component,
            "component":component,
            "size":modalsize
        });
    }

    render(){
        console.log("data Download : ", this.props.downloadingPage.acf !== undefined ? this.props.downloadingPage.acf.section_doc_download : null);
        return(
            <section className="p-section-bloc">
                <Container>
                     <Row>
                          { this.props.downloadingPage.acf !== undefined ?
                              this.props.downloadingPage.acf.section_doc_download.map(data => {
                                   return(
                                       <Col sm={12} style={{marginBottom: "20px"}}>
                                           <div className="connect-bloc">
                                                <img src={PictoDoc} className="picto-user"/>
                                                <p>{data.title_section}</p>
                                                <p>{data.subtitle_section}</p>
                                                {data.file_section.map((dataFile) => {
                                                    const numberDoc = 0;
                                                     return(
                                                         <a href={dataFile.file_download} target="_blank">Document {numberDoc + 1}</a>
                                                     )
                                                })}
                                           </div>
                                       </Col>
                                   )
                              })
                              : null
                          }
                     </Row>
                </Container>
            </section>
        )
    }
}

function mapStateToProps(state){
     return{
          "downloadingPage": state.downloadingPage
     }
}

function mapDispatchTopProps(dispatch) {
     return bindActionCreators({
          "pageDownloading": pageDownloading,
          "update_modal_settings":update_modal_settings
     }, dispatch);
}

export default connect(mapStateToProps, mapDispatchTopProps)(BlocDownload);
