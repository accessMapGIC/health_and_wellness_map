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
  },
});

const selectStyle = {
  backgroundColor: '#fff',
  bordeRadius: '4px',
}

class SubcategoryDropDownComponent extends React.Component {
  state = {
    subcategory: '',
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl variant="outlined" className={classes.formControl} fullWidth={true}>
          <Select
            value={this.state.subcategory}
            onChange={this.handleChange}
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
            <MenuItem value={1}>Sub 1</MenuItem>
            <MenuItem value={2}>Sub 2</MenuItem>
            <MenuItem value={3}>Sub 3</MenuItem>
            <MenuItem value={4}>Sub 4</MenuItem>
            <MenuItem value={5}>Sub 5</MenuItem>
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
    subcategory: state.lfS.subCatDrop,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onChange: (event) => dispatch({type: actionTypes.CATEGORY_CHANGE, cat: (event.target.value)})
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(SubcategoryDropDownComponent);