import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import * as actionTypes from '../store/actions';
import { compose } from 'redux';
import { connect } from 'react-redux';

import LocalizedStrings from 'react-localization';
import english from '../Localization/En.js';
import french from '../Localization/Fr.js';
let strings = new LocalizedStrings({
  en: english.cardStrings,
  fr: french.cardStrings
});

const styles = {
  root: {
    color: '#4b9ad4',
    '&$checked': {
      color: '#4b9ad4',
    },
  },
  checked: {},
  label: {
      color: '#4b9ad4',
      'font-weight': '600',
  }
};//Styling for the checkbox in the leftsidebar

class CheckboxComponent extends React.Component {
  // state = {
  //   checkedA: true,
  // };

  // handleChange = name => event => {
  //   this.setState({ [name]: event.target.checked });
  // };
  componentDidMount() { //load the information for the card from the card container
    strings.setLanguage(this.props.language);
  }

  componentDidUpdate(prevProp) {
    if (this.props.language !== prevProp.language) {
      strings.setLanguage(this.props.language);
      this.forceUpdate();
    }
  }

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
          label={strings.open} //Translate
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
    language: state.lang.language
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
