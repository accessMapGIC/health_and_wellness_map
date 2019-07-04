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
    const { classes } = this.props;

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
            disabled='true' /*{ Delete this line once data is updated }*/
          >
            <MenuItem value="">
              {strings.default}
            </MenuItem>
            <MenuItem value={'International Health Insurance'}>{strings.intl}</MenuItem>
            <MenuItem value={'MCSS'}>{strings.mcss}</MenuItem>
            <MenuItem value={'Out of Province'}>{strings.oop}</MenuItem>
            <MenuItem value={'PGSS'}>{strings.pgss}</MenuItem>
            <MenuItem value={'RAMQ'}>{strings.ramq}</MenuItem>
            <MenuItem value={'SSMU'}>{strings.ssmu}</MenuItem>
          </Select>
          <FormHelperText>{strings.helperText}</FormHelperText>
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
    language: state.lang.language
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
