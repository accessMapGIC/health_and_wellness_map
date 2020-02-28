import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import * as actionTypes from '../store/actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
// localization
import LocalizedStrings from 'react-localization';
import english from '../Localization/En.js';
import french from '../Localization/Fr.js';
let strings = new LocalizedStrings({
  en: english.langStrings,
  fr: french.langStrings
})

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
  constructor(props) {
    super(props);
    this.state = {
      langSelected : [],
      language : [
                    {name: 'English', value : 'EN'}, 
                    {name: 'French', value : 'FR'}, 
                    {name: 'Mandarin', value : 'mandarin'}, 
                    {name: 'Spanish', value : 'Spanish'}
                  ]
    }
  }

  componentDidMount() { //load the information for the card from the card container
    strings.setLanguage(this.props.localLang);
  }

  componentDidUpdate(prevProp) {
    if (this.props.localLang !== prevProp.localLang) {
      strings.setLanguage(this.props.localLang);
      this.forceUpdate();
    }
  }

  render() {
    const { classes } = this.props;
    
    return (
      <form className={classes.root} autoComplete="off">
        <FormControl variant="outlined" className={classes.formControl} fullWidth={true}>
          <Select
            value={this.state.langSelected}
            onChange={event => {
              this.setState({ langSelected: event.target.value });
              this.props.onChange(event);
            }}
            input={
              <OutlinedInput
                name="language"
                id="outlined-age-simple"
                labelWidth={0}
              />
            }
            renderValue={selected => {
              let renderLang = [];
              this.state.language.forEach(lang => {
                if (selected.includes(lang.value)) renderLang.push(lang.name);
              })
              if(renderLang && renderLang.length !== 0) {
                  return renderLang.join(', ');
              } else {
                return strings.default;
              };
            }}
            displayEmpty
            style={selectStyle}
            multiple
          >
            <MenuItem value="" disabled={true}>
              {strings.default}
            </MenuItem>
            {this.state.language.map((data, index) => (
              <MenuItem  value={data.value} key={index}>
                  <Checkbox checked={this.state.langSelected.indexOf(data.value) > -1} />
                  <ListItemText primary={data.name} />
              </MenuItem>
              ))
            }
          </Select>
          <FormHelperText>{strings.helperText}</FormHelperText>
        </FormControl>
      </form>
    );
  }
}

LanguageDropDownComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    language: state.lfS.leftMenu.langDrop,
    localLang: state.lang.language
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onChange: (event) => dispatch({type: actionTypes.LANGUAGE_CHANGE, payload: (event.target.value)})
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(LanguageDropDownComponent);
