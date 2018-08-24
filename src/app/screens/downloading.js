import React, { Component } from 'react';

// import grid Bootstrap
import Banner from '../containers/Banner/Banner';
import BlocConnect from '../components/bloc-download/bloc-download';
import { pageDownloading } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export class Downloading extends Component{

     componentWillMount(){
          this.props.pageDownloading();
     }

    render() {
        return(
            <div>
                <Banner
                    titleBanner={this.props.downloadingPage.acf !== undefined ? this.props.downloadingPage.acf.banner_page.title_banner_page : null}
                    desc={this.props.downloadingPage.acf !== undefined ? this.props.downloadingPage.acf.banner_page.subtitle_banner_page : null}
                />
                <BlocConnect titleBloc="Télécharger les documents"/>
            </div>
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
          "pageDownloading": pageDownloading
     }, dispatch);
}

export default connect(mapStateToProps, mapDispatchTopProps)(Downloading);