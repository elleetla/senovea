import React, { Component } from 'react';
import { connect } from 'react-redux';

class Users extends Component{
    render() {

        const userData = this.props.user;
        const userArray = [...userData];
        return(
            !this.props.user.user_auth.isAuth === false ?
            <div>
                { userArray.map(dataUsers => {
                    return(
                        <p>{dataUsers.user_name}</p>
                    )
                }) }
            </div> :
                null
        )
    }
}

function mapStateToProps(state){
    return {
        "user": state.user
    }
}

// export
export default connect(mapStateToProps)(Users)