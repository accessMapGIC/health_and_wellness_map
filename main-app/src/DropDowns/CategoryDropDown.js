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

class SimpleSelect extends React.Component {
  state = {
    category: '',
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
            value={this.state.category}
            onChange={this.handleChange}
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
            <MenuItem value={1}>Mediccal Care</MenuItem>
            <MenuItem value={3}>Peer Support</MenuItem>
            <MenuItem value={4}>Relaxation & Recreation</MenuItem>
            <MenuItem value={5}>Wellness Resources</MenuItem>
          </Select>
          <FormHelperText>Some important helper text</FormHelperText>
        </FormControl>
      </form>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);