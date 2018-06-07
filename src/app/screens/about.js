import React from 'react'


import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

export class About extends React.Component{

    render(){
        return(
            <Paper elevation={1}>
                <div style={{padding:'0px'}}>

                        <div style={{padding:'30px'}}>
                        <Typography variant="headline" color="inherit">
                            About
                        </Typography>
                        </div>
                </div>
            </Paper>

        )
    }

}