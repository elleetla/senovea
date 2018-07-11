// import components react
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { callSuppliers } from '../actions/index';

// import components elle&la
import BlocConnect from '../components/bloc-connect/bloc-connect';
import Banner from '../containers/Banner/Banner';
import FiltersSuppliers from '../containers/Filters-suppliers/Filters-suppliers';
import {
    Container,
    Row,
    Col } from 'reactstrap';

// creation of the class "AllSupliers"
export class AllSuppliers extends Component{

    componentDidMount(){
        this.props.callSuppliers();
    }

    renderSuppliers(){
        const suppliersArray = this.props.suppliers.filter((data) => {
            if (data.organisme.toLowerCase === this.props.suppliersSettings.name.toLowerCase()){
                return data;
            }
        });

        return suppliersArray.map(data => {
            return(
                <Col key={data.id} sm={12}>
                    <div className="article-bloc">
                        <Row>
                            <Col md="3" className="text-center">
                                <b>{data.organisme}</b>
                            </Col>
                            <Col md="3" className="text-center">
                                <p>{data.organisme}</p>
                            </Col>
                            <Col md="3" className="text-center">
                                <p>{data.organisme}</p>
                            </Col>
                            <Col md="3" className="text-center">
                                <p>Arrondissement : <b>{data.arrondissement}</b></p>
                            </Col>
                        </Row>
                    </div>
                </Col>
            )

        })
    }

    render(){
        //console.log(this.props.suppliers);
        console.log(this);
        return(
            <div>
                <Banner
                    titleBanner="Prestataires référencés"
                    desc="Nous nous réjouissions de compter parmis nos entreprises
                    partenaires des fournisseurs de services reconnus pour la qualité
                    de leur travail et de leur accompaganement auprès d’organismes publics
                    de dimensions nationale et internationale."
                />
                { this.props.user.user_auth.auth_token === '' && this.props.user.user_auth.isAuth === false ?
                    <BlocConnect
                        titleBloc="Veuillez vous connecter ou créer un compte pour visualiser le contenu de cette page"
                    />
                    :
                    <div>
                        <FiltersSuppliers/>
                        <Container className="mb-5 mt-5">
                            <Row>
                                { this.renderSuppliers() }
                            </Row>
                        </Container>
                    </div>
                }
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
        "suppliersSettings": state.suppliersSettings
    }
}

function mapDispatchToPros(disptach){
    return(
        bindActionCreators({"callSuppliers":callSuppliers}, disptach)
    )
}

// export
export default connect(mapStateToProps, mapDispatchToPros)(AllSuppliers);