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
// import LocalizedStrings from 'react-localization';

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
          >
            <MenuItem value="">
              Select your Insurance coverage (optional)
            </MenuItem>
            <MenuItem value={'International Health Insurance'}>International Health Insurance</MenuItem>
            <MenuItem value={'MCSS'}>MCSS</MenuItem>
            <MenuItem value={'Out of Province'}>Out of Province</MenuItem>
            <MenuItem value={'PGSS'}>PGSS</MenuItem>
            <MenuItem value={'RAMQ'}>RAMQ</MenuItem>
            <MenuItem value={'SSMU'}>SSMU</MenuItem>
          </Select>
          <FormHelperText>Reflects whether the service requires a fee to open a file based on your insurance plan</FormHelperText>
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
