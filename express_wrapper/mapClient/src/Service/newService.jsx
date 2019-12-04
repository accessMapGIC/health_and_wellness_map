// React, routing
import React from 'react';
// import { withRouter } from 'react-router';
import { connect } from 'react-redux';
//This one import the constant and actions
import { 
        getInsuranceRequest, createServiceRequest,
        getPrimaryCategoryRequest, getSubcategoryRequest
    } from '../store/actions';

//Style
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

import './newService.scss';

// localization
import LocalizedStrings from 'react-localization';
import english from '../Localization/En';
import french from '../Localization/Fr';
let strings = new LocalizedStrings({
  en: english.serviceSuggestionStrings,
  fr: french.serviceSuggestionStrings
});

class NewServiceClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            serviceName:'',
            primaryCategory: '',
            Subcategory:'',
            Insurance:'',
            langs:[],
            address: '',
            latitude: '',
            longitude: '',
            transit: '',
            website:'',
            phoneNumber:'',
            emergencyNumber:'',
            dropIn:'',
            services: [],
            services_fr: [],
            note:'',
            note_fr:'',
            sundayBusinessHour: null,
            mondayBusinessHour: null,
            tuesdayBusinessHour: null,
            wednesdayBusinessHour: null,
            thursdayBusinessHour: null,
            fridayBusinessHour: null,
            saturdayBusinessHour: null,
           
          };
    }

    componentDidMount() {
        strings.setLanguage(this.props.language);
        this.props.dispatch(getPrimaryCategoryRequest());
        this.props.dispatch(getSubcategoryRequest());
        this.props.dispatch(getInsuranceRequest());
    }

    componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {
            strings.setLanguage(this.props.language);
            this.forceUpdate();
          }
        if (prevProps.suggestServiceStatus !== this.props.suggestServiceStatus && this.props.suggestServiceStatus) {
            alert(strings.suggestSuccessful);
            window.location.href = "/home";
        } 
    }

    handleClickOpen = () => {
        this.setState({ open: true })
        };
    
    handleClose = () => {
        this.setState({ open: false })
    };


    parseTime(time) {
        if (!time) {
            return true;
        }

        let parsed = time.split('-');
        if (parsed.length !== 2) {
            return false;
        }

        let start = parsed[0].split(':');
        if (start.length !== 2 || isNaN(start[0]) || isNaN(start[1])) {
            return false;
        }
        let end = parsed[1].split(':');
        if (end.length !== 2 || isNaN(end[0]) || isNaN(end[1])) {
            return false;
        }
        return true;
    }

    getHours(time, last) {
        if (time) {
            if (this.parseTime(time)) {
                if (last) {
                    return `{${time}}`;
                }
                else {
                    return `{${time}},`;
                }
            }
            else {
                return false
            }
        }
        else {
            if (last) {
                return `{NA}`;
            }
            else {
                return `{NA},`;
            }
        }
    }

    extractInfo(data){
        if(data && data.length == 0  ){
            return null 
        }
        let info = '';
        for(let i = 0 ; i < data.length ; i ++){
            info = info + data[i].label.toString() + ', '

        }
        return info
    }

  handleSubmit = e => {
        e.preventDefault();
        if(!this.state.serviceName.replace(/ /g,'')){
            alert(strings.requireName)
            return;
        }
        if(!this.state.address.replace(/ /g,'')){
            alert(strings.requireAddress)
            return;
        }

        let formInfo = {};
    
        // Build business hours string
        let hours = "{";
        if (this.getHours(this.state.sundayBusinessHour) && this.getHours(this.state.mondayBusinessHour) && this.getHours(this.state.tuesdayBusinessHour) && this.getHours(this.state.wednesdayBusinessHour) && this.getHours(this.state.thursdayBusinessHour) && this.getHours(this.state.fridayBusinessHour) && this.getHours(this.state.saturdayBusinessHour)) {
            hours += this.getHours(this.state.sundayBusinessHour, false);
            hours += this.getHours(this.state.mondayBusinessHour, false);
            hours += this.getHours(this.state.tuesdayBusinessHour, false);
            hours += this.getHours(this.state.wednesdayBusinessHour, false);
            hours += this.getHours(this.state.thursdayBusinessHour, false);
            hours += this.getHours(this.state.fridayBusinessHour, false);
            hours += this.getHours(this.state.saturdayBusinessHour, true);
        }
        else {
            return alert(strings.hourFormat);
        }
        hours += "}";

        //Array changes to object and subcategory use number
        formInfo.name = this.state.serviceName;
        formInfo.primary_cat_id = this.state.primaryCategory;
        formInfo.sub_cat_id = this.state.Subcategory;
        formInfo.insur_id = this.state.Insurance;
        formInfo.languages_spoken = this.extractInfo(this.state.langs);
        formInfo.address = this.state.address;
        formInfo.lat = this.state.latitude;
        formInfo.lon = this.state.longitude;
        formInfo.website = this.state.website;
        formInfo.phone_num = this.state.phoneNumber;
        formInfo.emergency_num = this.state.emergencyNumber;
        formInfo.drop_in = this.state.dropIn;
        formInfo.services = this.extractInfo(this.state.services);
        formInfo.services_fr = this.extractInfo(this.state.services_fr);
        formInfo.transit = this.state.transit;
        formInfo.notes = this.state.note;
        formInfo.notes_fr = this.state.note_fr;
        formInfo.hours = hours;
        formInfo.verified_by = null;
       
        this.props.dispatch(createServiceRequest(formInfo));
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
                 {strings.haveSuggestion}
            </Button>
       
            <Dialog fullScreen open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <AppBar style={{ position: 'relative'}}>
                    <Toolbar style={{backgroundColor: '#4ec3c7'}}>
                        <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        
                        <Typography variant="h5" >
                            {strings.haveSuggestion}
                        </Typography>
                    </Toolbar>
                </AppBar>
                        
                <DialogTitle >
                    {strings.editSuggestion}
                </DialogTitle>

                <DialogContent>
                    <TextField
                        required
                        margin="dense"
                        id="Service Name"
                        label= {strings.serviceName}
                        placeholder="eg. CLSC du parc"
                        type="text"
                        fullWidth
                        onChange={event => {
                            this.setState({ serviceName: event.target.value })
                        }}
                    />
                    <br />

                    <FormControl className="selectControl">
                        <InputLabel > {strings.primCategory} </InputLabel>
                        <Select
                            id="primaryCategory"
                            value={this.state.primaryCategory}
                            onChange={event => {
                                this.setState({ primaryCategory: event.target.value })
                          }}
                            displayEmpty
                        >
                            {this.props.PrimaryCategoryData
                            ?
                            this.props.PrimaryCategoryData.map(data => (
                            <MenuItem  value={data.cat_id}>
                                {data.cat_name}
                            </MenuItem>
                            ))
                            : null
                            }
                        </Select>
                    </FormControl>
                    <br />
                    <Divider />

                    <FormControl className="selectControl">
                        <InputLabel> {strings.subcat} </InputLabel>
                        <Select
                            id="Subcategory"
                            value={this.state.Subcategory}
                            onChange={event => {
                                this.setState({ Subcategory: event.target.value })
                            }}
                          
                        >
                            {this.props.SubCategoryData
                            ?
                                this.props.SubCategoryData.map(data => (
                                <MenuItem  value={data.subcat_id}>
                                    {data.subcat_name}
                                </MenuItem>
                                ))
                            :   null
                            }
                        </Select>
                    </FormControl>
                    <br />

                    <FormControl className="selectControl">
                        <InputLabel > {strings.insurance} </InputLabel>
                        <Select
                            id="Insurance"
                            value={this.state.Insurance}
                            onChange={event => {
                                this.setState({ Insurance: event.target.value })
                          }}
                        >
                             {this.props.InsuranceData
                            ?
                                this.props.InsuranceData.map(data => (
                                <MenuItem  value={data.insur_id}>
                                    {data.insur_name}
                                </MenuItem>
                                ))
                            :   null
                            }
                        </Select>
                    </FormControl>
                    <br />

                    <TextField
                        margin="dense"
                        id="lang_spoken"
                        label= {strings.lang}
                        type="text"
                        onKeyPress= {(e) => {
                            if (e.key === 'Enter') {
                                let newChip = { key:this.state.langs.length, label: e.target.value}
                                let chipsData = this.state.langs
                                chipsData.push(newChip)
                                this.setState({langs : chipsData})
                                e.target.value = ''
                            }}
                        }
                    />
                    <Paper >
                        {this.state.langs.map(data => {
                            return (
                                <Chip
                                    key={data.key}
                                    label={data.label}
                                    color="primary"
                                    onDelete={ () => this.setState({
                                        langs: this.state.langs.filter(function (lang) {
                                         return lang.key !== data.key;
                                       })
                                     })}
                                />
                            );
                        })}
                    </Paper>
                    
                    <TextField
                        required
                        margin="dense"
                        id="Address"
                        label= {strings.address}
                        placeholder="e.g. 123 Avenue du Parc"
                        fullWidth
                        onChange={event => {
                            this.setState({ address: event.target.value })
                        }}
                    />
                    <br />

                    <TextField
                        margin="dense"
                        id="Latitude"
                        label= {strings.lat}
                        placeholder="e.g. 45.23424"
                        fullWidth
                        onChange={event => {
                            this.setState({ latitude: event.target.value })
                        }}
                    />
                    <br />

                    <TextField
                        margin="dense"
                        id="Longitude"
                        label= {strings.lon}
                        placeholder="e.g. -75.23424"
                        fullWidth
                        onChange={event => {
                            this.setState({ longitude: event.target.value })
                        }}
                    />
                    <br />

                    <TextField
                        margin="dense"
                        id="Transit"
                        label= {strings.transit}
                        placeholder="e.g. Yes, near Place des Arts"
                        fullWidth
                        onChange={event => {
                            this.setState({ transit: event.target.value })
                        }}
                    />
                    <br />

                    <TextField
                        margin="dense"
                        id="Website"
                        label= {strings.website}
                        placeholder="e.g. www.example.com"
                        fullWidth
                        onChange={event => {
                            this.setState({ website: event.target.value })
                        }}
                    />
                    <br />

                    <TextField
                        margin="dense"
                        id="Phone number"
                        label= {strings.phoneNumber}
                        placeholder="e.g. 514-555-4444"
                        fullWidth
                        onChange={event => {
                            this.setState({ phoneNumber: event.target.value })
                        }}
                    />
                    <br />

                    <TextField
                        margin="dense"
                        id="Emergency Number"
                        label= {strings.emergencyNumber}
                        placeholder="e.g. 514-555-4444"
                        fullWidth
                        onChange={event => {
                            this.setState({ emergencyNumber: event.target.value })
                        }}
                    />
                    <br />

                    <TextField
                        
                        margin="dense"
                        id="Drop In"
                        label= {strings.dropIn}
                        placeholder="e.g. Yes"
                        fullWidth
                        onChange={event => {
                            this.setState({ dropIn: event.target.value })
                        }}
                    />
                    <br />

                    <TextField
                        margin="dense"
                        id="Name_Of_Suggestion_Service"
                        label= {strings.service}
                        type="text"
                        onKeyPress= {(e) => {
                            if (e.key === 'Enter') {
                                let newChip = { key:this.state.services.length, label: e.target.value}
                                let chipsData = this.state.services
                                chipsData.push(newChip)
                                this.setState({services : chipsData})
                                e.target.value = ''
                            }}
                        }
                    />
                    <Paper >
                        {this.state.services.map(data => {
                            return (
                                <Chip
                                    key={data.key}
                                    label={data.label}
                                    color="primary"
                                    onDelete={ () => this.setState({
                                        services: this.state.services.filter(function (service) {
                                         return service.key !== data.key;
                                       })
                                     })}
                                />
                            );
                        })}
                    </Paper>
                    <br />

                    <TextField
                            margin="dense"
                            id="Name_Of_Suggestion_Service_Fr"
                            label= {strings.service_fr}
                            type="text"
                            onKeyPress= {(e) => {
                                if (e.key === 'Enter') {
                                    let newChip = { key:this.state.services_fr.length, label: e.target.value}
                                    let chipsData = this.state.services_fr
                                    chipsData.push(newChip)
                                    this.setState({services_fr : chipsData})
                                    e.target.value = ''
                                }}
                            }
                        />
                    <Paper >
                        {this.state.services_fr.map(data => {
                            return (
                                <Chip
                                    key={data.key}
                                    label={data.label}
                                    color="primary"
                                    onDelete={ () => this.setState({
                                        services_fr: this.state.services_fr.filter(function (service_fr) {
                                         return service_fr.key !== data.key;
                                       })
                                     })}
                                />
                            );
                        })}
                    </Paper>

                    <TextField
                        id="standard-multiline-flexible"
                        label= {strings.note}
                        multiline
                        fullWidth
                        rows="4"
                        margin="normal"
                        onChange={event => {
                            this.setState({ note: event.target.value })
                        }}
                    />
                    <br />

                    <TextField
                        id="standard-multiline-flexible"
                        label= {strings.note_fr}
                        multiline
                        fullWidth
                        rows="4"
                        margin="normal"
                        onChange={event => {
                            this.setState({ note_fr: event.target.value })
                        }}
                    />
                    <br />

                    
                    <form  noValidate >
                        <Typography variant="h6" gutterBottom>
                            {strings.enterBusinessHour}
                        </Typography>
                        <TextField
                            id="sundayTime"
                            label= {strings.sunTime}
                            onChange={event => {
                                this.setState({ sundayBusinessHour : event.target.value })
                            }}
                        /> 
                          <TextField
                            id="mondayTime"
                            label= {strings.monTime}
                            onChange={event => {
                                this.setState({ mondayBusinessHour : event.target.value })
                            }}
                        />
                        <TextField
                            id="tuesdayTime"
                            label= {strings.tueTime}
                            onChange={event => {
                                this.setState({ tuesdayBusinessHour : event.target.value })
                            }}
                        />
                        <TextField
                            id="wednesdayTime"
                            label= {strings.wedTime}
                            onChange={event => {
                                this.setState({ wednesdayBusinessHour : event.target.value })
                            }}
                        />
                        <TextField
                            id="thursdayTime"
                            label= {strings.thuTime}
                            onChange={event => {
                                this.setState({ thursdayBusinessHour : event.target.value })
                            }}
                        />
                        <TextField
                            id="fridayTime"
                            label= {strings.friTime}
                            onChange={event => {
                                this.setState({ fridayBusinessHour : event.target.value })
                            }}
                        />
                        <TextField
                            id="saturdayTime"
                            label= {strings.satTime}
                            onChange={event => {
                                this.setState({ saturdayBusinessHour : event.target.value })
                            }}
                        />
                    </form>
                    
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
        PrimaryCategoryData : state.loadPrimaryCategory,
        SubCategoryData : state.loadSubCategory, 
        InsuranceData : state.loadInsurance, 
        suggestServiceStatus: state.suggestService
  };
}

// const ServiceForm = Form.create()(NewServiceClass);
const NewService = connect(mapStateToProps)(NewServiceClass);
export default NewService;