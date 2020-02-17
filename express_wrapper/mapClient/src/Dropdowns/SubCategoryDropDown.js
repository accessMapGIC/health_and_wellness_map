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

// localization
import LocalizedStrings from 'react-localization';
import english from '../Localization/En.js';
import french from '../Localization/Fr.js';
let strings = new LocalizedStrings({
  en: english.subCatStrings,
  fr: french.subCatStrings
});

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 130,
    maxWidth: 214,
    maxHeight: '230px !important',
  },
});

const selectStyle = {
  backgroundColor: '#fff',
  bordeRadius: '4px',
}

class SubcategoryDropDownComponent extends React.Component {
  // state = {
  //   subcategory: '',
  // };

  // handleChange = event => {
  //   this.setState({ [event.target.name]: event.target.value });
  // };
  componentDidMount() { //load the information for the card from the card container
    strings.setLanguage(this.props.language);
  }

  componentDidUpdate(prevProp) {
    if (this.props.language !== prevProp.language) {
      strings.setLanguage(this.props.language);
      this.forceUpdate();
    };
    if (this.props.cat !== prevProp.cat) {
      this.props.dropdownSubcategories(this.props.cat);
    }
  }

  render() {
    const { classes, subCategories } = this.props;
    return (
      <form className={classes.root} autoComplete="off">
        <FormControl variant="outlined" className={classes.formControl} fullWidth={true}>
          <Select
            value={this.props.subcategory}
            onChange={this.props.onChange}
            disabled={MenuItem.length > 1 ? false : true}
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
            <MenuItem value=''> {strings.default} </MenuItem>
            {subCategories.map((sub, i) => {
              return (
                <MenuItem key={i} value={sub.subcat_name}>{sub.subcat_name}</MenuItem>
              );
            })}
          </Select>
          <FormHelperText>{strings.helperText}</FormHelperText>
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
    subcategory: state.lfS.leftMenu.subCatDrop,
    cat: state.lfS.leftMenu.catDrop,
    language: state.lang.language,
    subCategories: state.lfS.leftMenu.subCategories
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onChange: (event) => dispatch({type: actionTypes.SUBCATEGORY_CHANGE, payload: (event.target.value)}),
    dropdownSubcategories: (params) => dispatch(actionTypes.getSubcategories(params))
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(SubcategoryDropDownComponent);
