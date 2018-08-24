import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// import styles
import { Container, Row, Col, } from 'reactstrap';
import './bloc-download.css';
import PictoDoc from '../../assets/img/picto_doc.svg';

import { update_modal_settings } from '../../actions/index';
import { pageDownloading } from "../../actions";

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
        return(
            <section>
                <Container className="mb-5 mt-5">
                     <Row>
                          {this.props.downloadingPage.acf !== undefined ?
                              this.props.downloadingPage.acf.section_doc_download.map(data => {
                                   return(
                                       <Col sm={12}>
                                            <div className="bloc-download">
                                                 <Row>
                                                      <Col md="1">
                                                           <img src={PictoDoc} className="picto-user"/>
                                                      </Col>
                                                      <Col md="6">
                                                           <p className="title-bloc-download">{data.title_section}</p>
                                                           <p className="subtitle-bloc-download">{data.subtitle_section}</p>
                                                     </Col>
                                                     <Col md="5">
                                                          <ul>
                                                               {data.file_section.map(dataFile => {
                                                                    return(
                                                                        <li key={dataFile.file_download.id}>
                                                                             <a href={dataFile.file_download.url} target="_blank" download={dataFile.file_download.filename}>{dataFile.file_download.filename}</a>
                                                                        </li>
                                                                    )
                                                               })}
                                                          </ul>
                                                      </Col>
                                                </Row>
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
