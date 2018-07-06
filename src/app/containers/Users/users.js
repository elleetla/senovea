import React, { Component } from 'react';
import { connect } from 'react-redux';
import {call_users} from "../../actions";
import {bindActionCreators} from "redux";

class Users extends Component{

    componentDidMount(){
        this.props.call_users(this.props.user.user_auth.auth_token)
    }

    render() {
        const userData = this.props.users;
        const userNewData = [...userData];
        console.log(this);

        return(
            <div>
                { userNewData.map((user) => {
                    return(
                        <div key={user.id}>
                            <p>{user.name}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        "user": state.user,
        "users" : state.users
    }
}

function mapDispatchToProps(disptach) {
    return bindActionCreators({
        "call_users": call_users
    },disptach)
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)