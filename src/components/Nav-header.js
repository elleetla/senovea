import React, {Component} from 'react';

class NavHeader extends Component{
    render() {
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" target="_blank" href={this.props.link}>{this.props.name}</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Qui-sommes-nous ?</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Acheteurs référencé</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Fournisseurs</a>
                            </li>
                        </ul>
                    </div>
                    <div className="my-2 my-lg-0">
                        <p>Panier</p>
                    </div>
                </nav>
            </div>
        )
    }

}

// export
export default NavHeader