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
                    desc="Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.
                    Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme
                    assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte."
                />
                <BlocConnect
                    titleBloc="Télécharger les documents"
                />
            </div>
        )
    }
}
