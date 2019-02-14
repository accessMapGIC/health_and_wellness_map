import React from 'react';
import Autosuggest from 'react-autosuggest';
import './DropDown.scss';

const languages = [
    {
        name: 'French',
    },
    {
        name: 'English',
    },
];

function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return languages.filter(language => regex.test(language.name));
}

function getSuggestionValue(suggestion) {
    return suggestion.name;
}

function renderSuggestion(suggestion) {
    return (
        <span>{suggestion.name}</span>
    );
}

class LanguageDropDownComponent extends React.Component {
    constructor() {
        super();

        this.state = {
        value: '',
        suggestions: []
        };    
    }

    onChange = (event, { newValue, method }) => {
        this.setState({
        value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
        suggestions: getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
        suggestions: []
        });
    };

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
        placeholder: "Type your language",
        value,
        onChange: this.onChange
        };

        return (
        <Autosuggest 
            id="language"
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps} />
        );
    }
}

export default LanguageDropDownComponent;