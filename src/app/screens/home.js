import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


export class Home extends React.Component{
    render(){
        return(
            <Paper elevation={1}>
                <div style={{padding:'30px'}}>

                        <div style={{padding:'0px'}}>
                        <Typography variant="headline" color="inherit">
                            Welcome to senovea-spa!
                        </Typography>
                        </div>

                </div>
            </Paper>
        )
    }
}