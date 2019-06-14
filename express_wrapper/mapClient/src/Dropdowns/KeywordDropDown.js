import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import * as actionTypes from '../store/actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import LocalizedStrings from 'react-localization';

const suggestions = [ //this array needs to be populated with the different keywords, either statically or dynamically
  { label: 'Abortion services' },
  { label: 'Acupuncture' },
  { label: 'Blood test' },
  { label: 'Counselling' }, //Not working...
  { label: 'Contraception' },
  { label: 'Consultation' },
  { label: 'Cardiology' },
  { label: 'Dentistry' },
  { label: 'Diabetes testing' },
  { label: 'Diagnostic services' },
  { label: 'ECG' },
  { label: 'EMG' },
  { label: 'Family medicine' },
  { label: 'Laboratory' },
  { label: 'Massotherapy' },
  { label: 'Nurse consultation' },
  { label: 'Physiotherapy' },
  { label: 'Physician' },
  { label: 'Psychologist' },
  { label: 'Pharmacy' },
  { label: 'Streptest' },
  { label: 'Travel health consultation' },
  { label: 'Urine test' },
  { label: 'Vaccination' },
];
// const suggestions = [ //this array needs to be populated with the different keywords, either statically or dynamically
//
//   { label: strings.abortion },
//   { label: strings.acupuncture },
//   { label: strings.bloodTest },
//   { label: strings.counselling }, //Not working...
//   { label: strings.contraception },
//   { label: strings.consult },
//   { label: strings.cardiology },
//   { label: strings.dental },
//   { label: strings.diabetes },
//   { label: strings.diagnostic },
//   { label: strings.ecg },
//   { label: strings.emg },
//   { label: strings.family },
//   { label: strings.lab },
//   { label: strings.masso },
//   { label: strings.nurse },
//   { label: strings.physio },
//   { label: strings.physician },
//   { label: strings.psychologist },
//   { label: strings.pharmacy },
//   { label: strings.streptest },
//   { label: strings.urine },
//   { label: strings.vacc },
// ];


function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          ),
        )}
      </div>
    </MenuItem>
  );
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

const styles = theme => ({
  root: {
    height: 50,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
    'background-color': '#fff',
    'border-radius': '4px',
    'height': '34px',
    'padding': '10px 20px',
    'font-weight': '300',
    'font-size': '16px',
    'border': '1px solid #aaa',
    color: '#4b9ad4',
    width: '172px',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
    'border-bottom-left-radius': '4px',
    'border-bottom-right-radius': '4px',
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
});

class KeywordDropDownComponent extends React.Component {
  state = {
    single: '',
    popper: '',
    suggestions: [],
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = name => (event, { newValue }) => {
    console.log(newValue);
    this.setState({
      [name]: newValue,
    });
  };

  render() {
    const { classes } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
    };

    return (
      <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            placeholder: 'i.e. blood test',
            value: this.props.keyword,///this.state.single,
            onChange: this.props.onChange('single')//this.handleChange('single'),
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
        <div className={classes.divider} />
      </div>
    );
  }
}

KeywordDropDownComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    keyword: state.lfS.leftMenu.keyDrop,
  }
};

/**
Need French Keyword Option:

i.e. if this.props.language === fr, dispatch KEYWORD_CHANGE_FR...?

Also has localized strings to compare to the db column s.services_fr Versus s.services
**/

const mapDispatchToProps = dispatch => {
  return {
    onChange: (name) => (event, {newValue}) => dispatch({type: actionTypes.KEYWORD_CHANGE, payload: newValue})
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(KeywordDropDownComponent);
