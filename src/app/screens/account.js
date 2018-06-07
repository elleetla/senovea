import React from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';


class Account extends React.Component{

    render(){

        const activeStep = this.props.auth.isValidated ? 2 : 1
        return(
            <Paper elevation={1}>
                <div style={{padding:'0px'}}>

                        <div style={{padding:'30px'}}>
                        <Typography variant="headline" color="inherit">
                            Account
                        </Typography>
                        </div>

                        <Divider />

                        <div style={{padding:'30px'}}>
                        <Typography variant="headline" color="inherit">
                            User Validation
                        </Typography>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            <Step key={1}>
                                <StepLabel>Upload your document to the senovea-backend.</StepLabel>
                            </Step>
                            <Step key={2}>
                                <StepLabel>Have your account validated by our team.</StepLabel>
                            </Step>
                        </Stepper>
                        </div>

                        {/*

                            <Divider />

                            <div style={{padding:'30px'}}>
                            <Typography variant="headline" color="inherit">
                                User Informations
                            </Typography>

                       

                        </div>
                         */}

                </div>
            </Paper>
        )
    }

}

function mapStateToProps( state ){

    return {
        "user":state.user,
        "auth":state.auth
    }

}

export default compose(
    connect(mapStateToProps)
)(Account)