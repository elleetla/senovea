import React from 'react';

// import grid Bootstrap
import { Container, Row } from 'reactstrap';
import Users from '../containers/Users/users';
import Banner from '../containers/Banner/Banner';

export class AllUsers extends React.Component{

    render(){
        return(
            <div>
                <Banner
                    titleBanner="Acheteurs référencés"
                    desc="Nous nous réjouissions de compter dans notre communauté d'acheteurs
                    des institutions prestigieuses qui nous font confiance dans le choix de leurs fournisseurs."
                />
                <Container>
                    <Row>
                        <Users/>
                    </Row>
                </Container>
            </div>
        )
    }
}
