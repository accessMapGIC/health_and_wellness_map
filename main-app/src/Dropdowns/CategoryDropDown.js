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

class CategoryDropDownComponent extends React.Component {
  // state = {
  //   category: '',
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
            value={this.props.category}
            onChange={this.props.onChange}
            input={
              <OutlinedInput
                name="category"
                id="outlined-age-simple"
              />
            }
            displayEmpty
            style={selectStyle}
          >
            <MenuItem value="">
              Choose a Category
            </MenuItem>
            <MenuItem value={2}>Counseling & Mental Health</MenuItem>
            <MenuItem value={1}>Medical Care</MenuItem>
            <MenuItem value={3}>Peer Support</MenuItem>
            <MenuItem value={4}>Relaxation & Recreation</MenuItem>
            <MenuItem value={5}>Wellness Resources</MenuItem>
          </Select>
          <FormHelperText>Here is help text</FormHelperText>
        </FormControl>
      </form>
    );
  }
}

CategoryDropDownComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    category: state.lfS.catDrop,
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
)(CategoryDropDownComponent);