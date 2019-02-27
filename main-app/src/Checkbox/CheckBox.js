import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import * as actionTypes from '../store/actions';
import { compose } from 'redux';
import { connect } from 'react-redux';


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
  // state = {
  //   checkedA: true,
  // };

  // handleChange = name => event => {
  //   this.setState({ [name]: event.target.checked });
  // };

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

const mapStateToProps = state => {
  return {
    checkedA: state.lfS.leftMenu.openNow,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onChange: (name) => (event) => dispatch({type: actionTypes.ON_IS_OPEN_CHANGE, payload: (event.target.checked)})
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(CheckboxComponent);