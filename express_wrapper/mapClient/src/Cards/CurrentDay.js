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

class CurrentDay extends React.Component(props) {
  render() {
    const { classes } = this.props;

    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.props.checkedA}
              onChange={this.props.onChange('checkedA')}
              value="checkedA"
              classes={{
                  root: classes.root,
                  checked: classes.checked,
              }}
            />
          }
          classes={{
              label: classes.openNow,
          }}
          label="Open Now"
        />
      </FormGroup>
    );
  }
}

let CurrentDay = function currentDayComponentClass(props) {
    let classNm = props.className;
    

    return (
        <div className={}></div>
    );
};

CheckboxComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxComponent);