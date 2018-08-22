import React, { Component } from 'react';

// import grid Bootstrap
import Banner from '../containers/Banner/Banner';
import BlocConnect from '../components/bloc-download/bloc-download';

export class Downloading extends Component{
    render() {
        return(
            <div>
                <Banner
                    titleBanner="Téléchargement"
                    desc="Retrouvez ici les documents à télécharger en vue de votre inscription en ligne"
                />
                <BlocConnect titleBloc="Télécharger les documents"/>
            </div>
        )
    }
}
