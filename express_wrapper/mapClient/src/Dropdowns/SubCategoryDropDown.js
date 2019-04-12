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
              Choose a Subcategory
            </MenuItem>
            <MenuItem value={'Academic'}>Academic</MenuItem>
            <MenuItem value={'Career'}>Career</MenuItem>
            <MenuItem value={'Clinic'}>Clinic</MenuItem>
            <MenuItem value={'CLSC'}>CLSC</MenuItem>
            <MenuItem value={'Counselor'}>Counselor</MenuItem>
            <MenuItem value={'Cultural'}>Cultural</MenuItem>
            <MenuItem value={'Emotional'}>Emotional</MenuItem>
            <MenuItem value={'Financial'}>Financial</MenuItem>
            <MenuItem value={'Hospital'}>Hospital</MenuItem>
            <MenuItem value={'Pharmacy'}>Pharmacy</MenuItem>
            <MenuItem value={'Physical'}>Physical</MenuItem>
            <MenuItem value={'Physiotherapy'}>Physiotherapy</MenuItem>
            <MenuItem value={'Psychologist'}>Pyschologist</MenuItem>
            <MenuItem value={'Spiritual'}>Spiritual</MenuItem>
            <MenuItem value={'Social'}>Social</MenuItem>
            <MenuItem value={'Super-Clinic'}>Super-Clinic</MenuItem>
          </Select>
          <FormHelperText>Here is help text</FormHelperText>
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