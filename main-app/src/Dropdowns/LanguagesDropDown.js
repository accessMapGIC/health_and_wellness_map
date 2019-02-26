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
  backgroundColor: '#fff',
  borderRadius: '4px',
}

class LanguageDropDownComponent extends React.Component {
  state = {
    language: '',
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
            value={this.state.language}
            onChange={this.handleChange}
            input={
              <OutlinedInput
                name="language"
                id="outlined-age-simple"
                labelWidth={0}
              />
            }
            displayEmpty
            style={selectStyle}
          >
            <MenuItem value="">
              Choose a language
            </MenuItem>
            <MenuItem value={1}>French</MenuItem>
            <MenuItem value={2}>English</MenuItem>
          </Select>
          <FormHelperText>Here is help text</FormHelperText>
        </FormControl>
      </form>
    );
  }
}

LanguageDropDownComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LanguageDropDownComponent);