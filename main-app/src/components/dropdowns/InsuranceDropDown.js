import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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
  'background-color': '#fff',
  'border-radius': '4px',
}

class InsuranceDropDownComponent extends React.Component {
  state = {
    insurance: '',
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl variant="outlined" className={classes.formControl} fullWidth='true'>
          <Select
            value={this.state.insurance}
            onChange={this.handleChange}
            input={
              <OutlinedInput
                name="insurance"
                id="outlined-age-simple"
              />
            }
            displayEmpty
            style={selectStyle}
          >
            <MenuItem value="">
              Choose an insurance
            </MenuItem>
            <MenuItem value={1}>International Health Insurance</MenuItem>
            <MenuItem value={2}>Out of Province</MenuItem>
            <MenuItem value={3}>PGSS</MenuItem>
            <MenuItem value={4}>RAMQ</MenuItem>
            <MenuItem value={5}>SSMU</MenuItem>
          </Select>
          <FormHelperText>Here is help text</FormHelperText>
        </FormControl>
      </form>
    );
  }
}

InsuranceDropDownComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InsuranceDropDownComponent);