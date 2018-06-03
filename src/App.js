// import plugin
import React, { Component } from 'react';
import axios from 'axios';

// import component
import Header from './components/Header';
import Footer from './components/Footer';
import logoWp from './logo-wp.svg';
import './App.css';
import FiltrePost from './components/Filtre-post';
import Button from '@material-ui/core/Button';

const urlSiteWp = 'http://senovea.juliengrelet.com/wp-json';
const urlSiteWpPost = 'http://senovea.juliengrelet.com/wp-json/wp/v2/posts';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            dataPost: {},
            loader: true,
            shop: 0
        }
    }

    componentWillMount() {
        // requete ajax site
        axios.get(urlSiteWp)
            .then(function (response) {
                this.setState({
                    data: response.data,
                    loader: false
                })
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });

        // requete ajax Post
        axios.get(urlSiteWpPost)
            .then(function (responsePost) {
                console.log(responsePost);
                this.setState({
                    dataPost: responsePost.data
                });

            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    // méthode addShop
    addShop() {
        this.setState({
            shop: this.state.shop + 1
        })
    }

    // methode removeShop
    removeShop() {
        this.setState({
            shop: this.state.shop = 0
        })
    }

    // more post
    renderPost() {
        return(
            this.state.dataPost.slice(0, 4).map((dataUser) => {
                return(
                    <div className="col-lg-12" key={dataUser.id} >
                        <img src={dataUser.title.rendered} alt=""/>
                        <h4>{dataUser.title.rendered}</h4>
                        <p>{dataUser.date}</p>
                        <p>{dataUser.content.rendered}</p>
                    </div>
                )
            })
        )
    }

    render() {
        if(this.state.loader){
            return (
                <div id="preloader">
                    <img src={logoWp} className="logo-preloader" alt="logo wp" />
                </div>
            )
        } else {
            return (
                <div className="App">
                    <Header
                        name={this.state.data.name}
                        desc={this.state.data.description}
                        link={this.state.data.home}
                        shop={this.state.shop}
                    />

                    <div className="App-intro">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <p>
                                        <button onClick={() => this.addShop()}>Ajouter</button>
                                        <button onClick={() => this.removeShop()}>Vider</button>
                                    </p>
                                </div>

                                <FiltrePost/>
                                {this.renderPost()}

                                <div className="col-lg-12">
                                    <Button variant="raised" color="primary">
                                        Hello World
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Footer name={this.state.data.name} />
                </div>
            );
        }
    }

}

// export
export default App
