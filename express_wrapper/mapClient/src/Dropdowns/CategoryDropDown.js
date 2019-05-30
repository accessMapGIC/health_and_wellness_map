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
                labelWidth={0}
              />
            }
            displayEmpty
            style={selectStyle}
          >
            <MenuItem value="">
              Choose a Category
            </MenuItem>
            <MenuItem value={'Counseling & Mental Health'}>Counselling & Mental Health</MenuItem>
            <MenuItem value={'Medical Care'}>Medical Care</MenuItem>
            <MenuItem value={'Peer Support'}>Peer Support</MenuItem>
            <MenuItem value={'Relaxation & Recreation'}>Relaxation & Recreation</MenuItem>
            <MenuItem value={'Wellness Resources'}>Wellness Resources</MenuItem>
          </Select>
          <FormHelperText>Select a Primary Category that corresponds with a subcategory below</FormHelperText>
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
    category: state.lfS.leftMenu.catDrop,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onChange: (event) => dispatch({type: actionTypes.CATEGORY_CHANGE, payload: (event.target.value)})
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(CategoryDropDownComponent);
