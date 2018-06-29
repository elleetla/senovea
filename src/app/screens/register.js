import React                                from 'react'
import { compose, bindActionCreators }      from 'redux'
import { connect }                          from 'react-redux'
import { Field, reduxForm }                 from 'redux-form'
import { Redirect }                         from  'react-router-dom'

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';

// user auth action 
import { user_register_action } from '../actions/index' 


// FIX FOR INPUT TYPE FILE
const adaptFileEventToValue = delegate =>
  e => delegate(e.target.files[0])

const FileInput = ({
  input: {
    value: omitValue,
    onChange,
    onBlur,
    type="file",
    id="register_document",
    name="register_document",
    accept=".pdf",
    // {...inputProps}
  },
  meta: omitMeta,
  //...props, ???
}) =>
  <input
    onChange={adaptFileEventToValue(onChange)}
    onBlur={adaptFileEventToValue(onBlur)}
    type="file"
    id="register_document"
    name="register_document"
    accept=".pdf"
    // {...inputProps}
    //{...props} ???
  />


// Fields
const renderTextField = ( field ) => (
    <TextField {...field.input} label={field.placeholder} type={field.type} />
)

const renderCheckBoxField = ( field ) => {
    console.log(field)
    return(
        <div>
            <Typography style={{marginBottom:'5px'}} variant="body2" color="inherit">
                By checking the box you accept to receive emails from senovea:
            </Typography>
            <Checkbox
            type={field.type}
            {...field}
            {...field.input}
            value={field.value}
        />
        </div>
    )

}

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            redirect:false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(formProps){
        console.log('handlesubmit')
        console.log(formProps)

        // Calling register action
        this.props.user_register_action(formProps, ()=>{
            // redirect
            this.setState({ redirect: true });
        })
    }   

    render(){
        
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/login'/>;
        }

        return(
            <Paper elevation={1}>
            <div>

                {/*
            <div style={{padding:'30px'}}>
                        <Typography variant="headline" color="inherit">
                        Request an invite.
                        </Typography>
                        <Typography variant="subheading" color="inherit">
                        You have to request an invite to get access to senovea-spa, for that you need to fill the form bellow.
                        </Typography>
                        <Typography variant="subheading" color="inherit">
                        You'll receive activation link by email when your candidacy is accepted by our team.
                        </Typography>
                </div>
                        <Divider/>
                        */}

                <div style={{padding:'30px'}}>
                <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>

                        <Divider style={{margin:'15px 0'}}/>
                    <Typography variant="subheading" color="inherit">
                        Organisme acheteur
                    </Typography>

                    <div style={{marginBottom:'15px'}}>
                        <Field 
                            style={{width:"100%"}}
                            name="register_organisme"
                            id="register_organisme"
                            //component={renderTextField}
                            component="input"
                            type="text"
                            placeholder="Nom de l'organisme"
                        />
                    </div>
                    <div style={{marginBottom:'15px'}}>
                        <Field
                            style={{width:"100%"}}
                            name="register_service"
                            id="register_service"
                            //component={renderTextField}
                            component="input"
                            type="text"
                            placeholder="Nom du service ou du département"
                        />
                    </div>
                    <Divider style={{margin:'15px 0'}}/>

                    <Typography variant="subheading" color="inherit">
                        Personne Référente
                    </Typography>

                    <div style={{marginBottom:'15px'}}>
                        <Field
                            style={{width:"100%"}}
                            name="register_username"
                            id="register_username"
                            //component={renderTextField}
                            component="input"
                            type="text"
                            placeholder="Votre identifiant de connexion ( username ) ( sans espace ou caractères spéciaux )"
                        />
                    </div>

                    <div style={{marginBottom:'15px'}}>
                        <Field
                            style={{width:"100%"}}
                            name="register_nom"
                            id="register_nom"
                            //component={renderTextField}
                            component="input"
                            type="text"
                            placeholder="Nom"
                        />
                    </div>
                    <div style={{marginBottom:'15px'}}>
                        <Field
                            style={{width:"100%"}}
                            name="register_prenom"
                            id="register_prenom"
                            //component={renderTextField}
                            component="input"
                            type="text"
                            placeholder="Prenom"
                        />
                    </div>
                    <Divider style={{margin:'15px 0'}}/>

                    <Typography variant="subheading" color="inherit">
                        Adresse
                    </Typography>

                    <div style={{marginBottom:'15px'}}>
                        <Field
                            style={{width:"100%"}}
                            name="register_arrondissement"
                            id="register_arrondissement"
                            //component={renderTextField}
                            component="input"
                            type="number"
                            placeholder="Arrondissement Napoléonien"
                        />
                    </div>
                    <div style={{marginBottom:'15px'}}>
                        <Field
                            style={{width:"100%"}}
                            name="register_adresse"
                            id="register_adresse"
                            //component={renderTextField}
                            component="input"
                            type="text"
                            placeholder="Adresse"
                        />
                    </div>
                    <div style={{marginBottom:'15px'}}>
                        <Field
                            style={{width:"100%"}}
                            name="register_code"
                            id="register_code"
                            //component={renderTextField}
                            component="input"
                            type="number"
                            placeholder="Code Postal"
                        />
                    </div>
                    <div style={{marginBottom:'15px'}}>
                        <Field
                            style={{width:"100%"}}
                            name="register_ville"
                            id="register_ville"
                            //component={renderTextField}
                            component="input"
                            type="text"
                            placeholder="Ville"
                        />
                    </div>
                    <Divider style={{margin:'15px 0'}}/>

                    <Typography variant="subheading" color="inherit">
                        Contact
                    </Typography>

                    <div style={{marginBottom:'15px'}}>
                        <Field
                            style={{width:"100%"}}
                            name="register_email"
                            id="register_email"
                            //component={renderTextField}
                            component="input"
                            type="text"
                            placeholder="User Email"
                        />
                    </div>

                    <div style={{marginBottom:'15px'}}>
                        <Field
                            style={{width:"100%"}}
                            name="register_phone"
                            id="register_phone"
                            //component={renderTextField}
                            component="input"
                            type="number"
                            placeholder="Num. Téléphone"
                        />
                    </div>
                    <Divider style={{margin:'15px 0'}}/>

                    <Typography variant="subheading" color="inherit">
                        Importer la carte d'adhésion
                    </Typography>


  
                    {/*
                    <div style={{marginBottom:'30px'}}>
                        <Field
                            name="register_password"
                            id="register_password"
                            component={renderTextField}
                            type="password"
                            placeholder="User Password"
                        />
                    </div>
                    */}
                    <div style={{marginBottom:'30px'}}>
                        <Typography style={{marginBottom:'15px'}} variant="body2" color="inherit">
                            Upload Document:
                        </Typography>
                        <Field
                            name="register_document"
                            id="register_document"
                            component={FileInput}
                            type="file"
                            accept=".pdf"
                        />
                    </div>
                    <Divider style={{margin:'15px 0'}}/>

                    <Typography variant="subheading" color="inherit">
                        Emailing
                    </Typography>

                    <div style={{marginBottom:'30px'}}>
                        <Field 
                            name="login_accept" 
                            id="login_accept" 
                            value="login_accept"
                            type="checkbox"
                            label="Accept Condition Checkbox"
                            component={renderCheckBoxField}
                        />
                    </div>
                    <Divider style={{margin:'15px 0'}}/>

                    <div>

                        <Button type="submit" variant="contained" color="secondary">
                            Request invite to SENOVEA
                        </Button>

                    </div>
                    </form>
                </div>
            </div>
            </Paper>
        )
    }
}

function mapStateToProps(state){
    return {
        "user":state.user
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        "user_register_action":user_register_action
    }, dispatch)
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form:'registerForm'
    })
)(Register)