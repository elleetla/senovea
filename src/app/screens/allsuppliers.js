// import components react
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { callSuppliers, pageProviders } from '../actions/index';

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
        this.props.pageProviders();
    }

    renderSuppliers(){
        const suppliersArray = this.props.suppliers.filter((data) => {
            if (data.organisme.toLowerCase().indexOf(this.props.suppliersSettings.name.toLowerCase()) !== -1 &&
                data.arrondissement.toLowerCase().indexOf(this.props.suppliersSettings.arrondissement.toLowerCase()) !== -1 &&
                data.arrondissement.toLowerCase().indexOf(this.props.suppliersSettings.rang.toLowerCase()) !== -1){
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
        return(
            <div>
                <Banner
                    titleBanner={this.props.providersPage.acf !== undefined ? this.props.providersPage.acf.banner_page.title_banner_page : null}
                    desc={this.props.providersPage.acf !== undefined ? this.props.providersPage.acf.banner_page.subtitle_banner_page : null}
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
        "suppliersSettings": state.suppliersSettings,
        "providersPage": state.providersPage
    }
}

function mapDispatchToPros(disptach){
    return(
        bindActionCreators({
             "callSuppliers": callSuppliers,
             "pageProviders": pageProviders
        }, disptach)
    )
}

// export
export default connect(mapStateToProps, mapDispatchToPros)(AllSuppliers);