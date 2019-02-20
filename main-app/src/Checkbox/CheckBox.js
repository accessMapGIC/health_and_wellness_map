import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const styles = {
  root: {
    color: '#000',
    '&$checked': {
      color: '#000',
    },
  },
  checked: {},
  label: {
      color: '#f3eae2',
      'font-weight': '600',
  }
};

class CheckboxComponent extends React.Component {
  state = {
    checkedA: true,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;

    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checkedA}
              onChange={this.handleChange('checkedA')}
              value="checkedA"
              classes={{
                  root: classes.root,
                  checked: classes.checked,
              }}
            />
          }
          classes={{
              label: classes.label,
          }}
          label="Open Now"
        />
      </FormGroup>
    );
  }
}

CheckboxComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxComponent);