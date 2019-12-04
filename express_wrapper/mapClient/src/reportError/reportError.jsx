// React, routing
import React from 'react';
// import { withRouter } from 'react-router';
import { connect } from 'react-redux';
//This one import the constant and actions
import { 
    reportErrorRequest
} from '../store/actions';

//Style
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

// localization
import LocalizedStrings from 'react-localization';
import english from '../Localization/En';
import french from '../Localization/Fr';
import { string } from 'prop-types';
let strings = new LocalizedStrings({
  en: english.reportErrorStrings,
  fr: french.reportErrorStrings
});


class ReportErrorClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            email:'',
            content: ''
          };
    }

    componentDidMount() {
        strings.setLanguage(this.props.language);
    }

    componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {
            strings.setLanguage(this.props.language);
            this.forceUpdate();
          }
        if (prevProps.reportError !== this.props.reportError && this.props.reportError) {
            alert(strings.reportSuccessful);
            window.location.href = "/home";
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true })
        };
    
    handleClose = () => {
        this.setState({ open: false })
    };

  handleSubmit = e => {
        e.preventDefault();
        if(!this.state.email.replace(/ /g,'')){
            alert(strings.requireEmail)
            return;
        }
        if(!this.state.content.replace(/ /g,'')){
            alert(strings.requireContent)
            return;
        }

        let reportedError = {email: this.state.email, content:this.state.content};
        this.props.dispatch(reportErrorRequest(reportedError));
    };

   
  render(){
    return (
        <div>
            <Button 
                variant= "contained" 
                color= {"primary"}  
                style= {{
                        marginTop: "10px",
                        backgroundColor: '#4ec3c7',
                        '&:hover': {
                        backgroundColor: '#4ec3c7',
                        },
                        width: '100%',
                        color: 'white',
                        fontWeight: 'bold'
                    }}
                onClick= {this.handleClickOpen}
            >
                {strings.reportError}
            </Button>
       
            <Dialog fullScreen open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <AppBar style={{ position: 'relative'}}>
                    <Toolbar style={{backgroundColor: '#4ec3c7'}}>
                        <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        
                        <Typography variant="h5" >
                            {strings.reportError}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DialogContent>
              

                        <TextField
                            label={strings.email}
                            style={{paddingTop: '20px'}}
                            onChange={event => {
                                this.setState({ email : event.target.value })
                            }}
                        />




                        <TextField
                            label={strings.content}
                            style={{paddingTop: '20px'}}

                            multiline
                            fullWidth
                            rows="4"
                            onChange={event => {
                                this.setState({ content : event.target.value })
                            }}
                        />
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        {strings.cancel}
                    </Button>
        
                    <Button onClick={this.handleSubmit} color="primary">
                        {strings.submit}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
        )
    }
}

const mapStateToProps = state => {//the different actions called by the sidebar component
    return {
        language : state.lang.language,
        reportError: state.reportError
  };
}

const ReportError = connect(mapStateToProps)(ReportErrorClass);
export default ReportError;