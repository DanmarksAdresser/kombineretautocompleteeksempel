import './styles.css';
import autocomplete from 'autocomplete.js';
import 'babel-polyfill';
import 'whatwg-fetch';

function initAutocomplete(input, url, selected) {

  function search(url) {
    return async function search(query, callback) {
      let response= await fetch(url+query);
      let resultat= await response.json();
      callback(resultat);
    }
  }

  autocomplete(input, {hint: true}, [
    {
      source: search('https://dawa.aws.dk/stednavne2?undertype=by|bydel&autocomplete&per_side=5&q='),
      displayKey: 'betegnelse',
      templates: {
        header: '<p>By og bydele</p>',
        suggestion: function(suggestion) {
          return '<div>' + suggestion.betegnelse + '</div>';
        }
      }
    },
    {
      source: search('https://dawa.aws.dk/supplerendebynavne2?autocomplete&per_side=5&q='),
      displayKey: 'betegnelse',
      templates: {
        header: '<p>Supplerende bynavne</p>',
        suggestion: function(suggestion) {
          return '<div>' + suggestion.betegnelse + '</div>';
        }
      }
    },
    {
      source: search('https://dawa.aws.dk/postnumre?autocomplete&per_side=5&q='),
      displayKey: 'betegnelse',
      templates: {
        header: '<p>Postnumre</p>',
        suggestion: function(suggestion) {
          return '<div>' + suggestion.betegnelse + '</div>';
        }
      }
    }
  ]).on('autocomplete:selected', function(even, suggestion, dataset) {
    console.log(even + ', ' + suggestion + ', ' + dataset);
    selected(suggestion);
  });
}

function selected(objekt) {
	document.getElementById('label').textContent = 'Du valgte ' + objekt.betegnelse;
}

initAutocomplete('#input', 'https://dawa.aws.dk/jordstykker?autocomplete&q=', selected);