import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import * as actionTypes from '../store/actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
// localization
import LocalizedStrings from 'react-localization';
import english from '../Localization/En.js';
import french from '../Localization/Fr.js';
let strings = new LocalizedStrings({
  en: english.insStrings,
  fr: french.insStrings
})

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 130,
    maxWidth: 214,
  },
});

const selectStyle = {
  backgroundColor: '#fff',
  borderRadius: '4px',
}

class InsuranceDropDownComponent extends React.Component {
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
    const { classes, insurances } = this.props;
    return (
      <form className={classes.root} autoComplete="off">
        <FormControl variant="outlined" className={classes.formControl} fullWidth={true}>
          <Select
            value={this.props.insurance}
            onChange={this.props.onChange}
            input={
              <OutlinedInput
                name="insurance"
                id="outlined-age-simple"
                labelWidth={0}
              />
            }
            displayEmpty
            style={selectStyle}
          >
            <MenuItem value="">
              {strings.default}
            </MenuItem>
            {insurances.map((ins, i) => {
              return (
                <MenuItem key={i} value={ins.insur_name}>{ins.insur_name}</MenuItem>
              );
            })}
          </Select>
          <FormHelperText><div dangerouslySetInnerHTML={{__html: strings.helperText}}/></FormHelperText>
        </FormControl>
      </form>
    );
  }
}

InsuranceDropDownComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    insurance: state.lfS.leftMenu.insDrop,
    language: state.lang.language,
    insurances: state.lfS.leftMenu.insurances
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onChange: (event) => dispatch({type: actionTypes.INSURANCE_CHANGE, payload: (event.target.value)})
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(InsuranceDropDownComponent);
