import React from 'react';
import Autosuggest from 'react-autosuggest';
import './DropDown.scss';

const insurances = [
    {
        name: 'SSMU',
    },
    {
        name: 'PGSS',
    },
    {
        name: 'International Health Insurance (IHI)',
    },
    {
        name: 'RAMQ',
    },
    {
        name: 'Out of Province',
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

    return insurances.filter(insurance => regex.test(insurance.name));
}

function getSuggestionValue(suggestion) {
    return suggestion.name;
}

function renderSuggestion(suggestion) {
    return (
        <span>{suggestion.name}</span>
    );
}

class InsuranceDropDownComponent extends React.Component {
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
        placeholder: "Type your Insurance",
        value,
        onChange: this.onChange
        };

        return (
        <Autosuggest 
            id="insurance"
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps} />
        );
    }
}

export default InsuranceDropDownComponent;