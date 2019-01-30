import React from 'react';
import Autosuggest from 'react-autosuggest';
import './AutoSuggest.scss';

const languages = [
    {
      title: 'Hospitals',
      languages: [
        {
          name: 'Jewish General Hospital',

        }
      ]
    },
    {
      title: 'Clinics',
      languages: [
        {
          name: 'Clinic',
        },
        {
          name: 'Mental Health Clinic',
        }
      ] 
    },
    {
      title: 'Physiotherapist',
      languages: [
        {
          name: 'Sinamedic',
        },
        {
          name: 'McGill Sports Clinic',
        },
        {
          name: 'Super Clinics',
        },
        {
          name: 'Special Phyio',
        },
        {
          name: 'Jack the Physiotherapist',
        },
        {
          name: 'Carries Therapy',
        }
      ]
    },
    {
      title: 'Pyschologists',
      languages: [
        {
          name: 'McGill Psychology',
        },
        {
          name: 'Douglas Medical',
        },
        {
          name: 'Super Psychologist',
        },
        {
          name: 'Bob the Psychologist',
        }
      ]
    },
    {
      title: 'Gyms',
      languages: [
        {
          name: 'McGill Ahtletic Center',
        }
      ]
    }
];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return languages
        .map(section => {
        return {
            title: section.title,
            languages: section.languages.filter(language => regex.test(language.name))
        };
        })
        .filter(section => section.languages.length > 0);
}

function getSuggestionValue(suggestion) {
    return suggestion.name;
}

function renderSuggestion(suggestion) {
    return (
        <span>{suggestion.name}</span>
    );
}

function renderSectionTitle(section) {
    return (
        <strong>{section.title}</strong>
    );
}

function getSectionSuggestions(section) {
    return section.languages;
}

class AutoSuggestComponent extends React.Component {
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
        placeholder: "Type 'c'",
        value,
        onChange: this.onChange
        };

        return (
        <Autosuggest 
            multiSection={true}
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            renderSectionTitle={renderSectionTitle}
            getSectionSuggestions={getSectionSuggestions}
            inputProps={inputProps} />
        );
    }
}

export default AutoSuggestComponent;

  