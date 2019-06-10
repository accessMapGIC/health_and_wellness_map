import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';

// localization
import LocalizedStrings from 'react-localization';
import english from '../Localization/En.js';
import french from '../Localization/Fr.js';
let strings = new LocalizedStrings({    
  en: english.subCatStrings,
  fr: french.subCatStrings
});

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 130,
    maxWidth: 214,
    maxHeight: '230px !important',
  },
});

const selectStyle = {
  backgroundColor: '#fff',
  bordeRadius: '4px',
}

class SubcategoryDropDownComponent extends React.Component {
  // state = {
  //   subcategory: '',
  // };

  // handleChange = event => {
  //   this.setState({ [event.target.name]: event.target.value });
  // };
  componentDidMount() { //load the information for the card from the card container
    strings.setLanguage(this.props.language);
  }

  componentDidUpdate(prevProp) {
    if (this.props.language !== prevProp.language) {
      strings.setLanguage(this.props.language);
      this.forceUpdate();
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl variant="outlined" className={classes.formControl} fullWidth={true}>
          <Select
            value={this.props.subcategory}
            onChange={this.props.onChange}
            input={
              <OutlinedInput
                name="subcategory"
                id="outlined-age-simple"
                labelWidth={0}
              />
            }
            displayEmpty
            style={selectStyle}
          >
            <MenuItem value="">
              {strings.default}
            </MenuItem> //Translate
            <MenuItem value={'Academic'}>{strings.academic}</MenuItem>
            <MenuItem value={'Career'}>{strings.career}</MenuItem>
            <MenuItem value={'Clinic'}>{strings.clinic}</MenuItem>
            <MenuItem value={'CLSC'}>{strings.clsc}</MenuItem>
            <MenuItem value={'Counsellor'}>{strings.counsellor}</MenuItem>
            <MenuItem value={'Cultural'}>{strings.cultural}</MenuItem>
            <MenuItem value={'Dentistry'}>{strings.dentistry}</MenuItem>
            <MenuItem value={'Emotional'}>{strings.emotional}</MenuItem>
            <MenuItem value={'Financial'}>{strings.financial}</MenuItem>
            <MenuItem value={'Hospital'}>{strings.hospital}</MenuItem>
            <MenuItem value={'Pharmacy'}>{strings.pharmacy}</MenuItem>
            <MenuItem value={'Physical'}>{strings.physical}</MenuItem>
            <MenuItem value={'Physiotherapy'}>{strings.physiotherapy}</MenuItem>
            <MenuItem value={'Psychologist'}>{strings.psychologist}</MenuItem>
            <MenuItem value={'Spiritual'}>{strings.spiritual}</MenuItem>
            <MenuItem value={'Social'}>{strings.social}</MenuItem>
            <MenuItem value={'Super-Clinic'}>{strings.superClinic}</MenuItem>
          </Select>
          <FormHelperText>{strings.helperText}</FormHelperText>
        </FormControl>
      </form>
    );
  }
}

SubcategoryDropDownComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    subcategory: state.lfS.leftMenu.subCatDrop,
    language: state.lang.language
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onChange: (event) => dispatch({type: actionTypes.SUBCATEGORY_CHANGE, payload: (event.target.value)})
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(SubcategoryDropDownComponent);
