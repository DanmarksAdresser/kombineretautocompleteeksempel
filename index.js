import './styles.css';
import autocomplete from 'autocomplete.js';
import 'babel-polyfill';
import 'whatwg-fetch';

function initAutocomplete(input, selected) {

  function search(url) {
    return async function search(query, callback) {
      let response= await fetch(url+query);
      let resultat= await response.json();
      callback(resultat);
    }
  }

  autocomplete(input, {hint: true, openOnFocus: true}, [
    {
      source: search('https://dawa.aws.dk/stednavne2?undertype=by|bydel&autocomplete&per_side=5&q='),
      displayKey: 'betegnelse',
      templates: {
        header: '<i>By og bydele</i>',
        suggestion: function(suggestion) {
          return suggestion.betegnelse;
        }
      }
    },
    {
      source: search('https://dawa.aws.dk/supplerendebynavne2?autocomplete&per_side=5&q='),
      displayKey: 'betegnelse',
      templates: {
        header: '<i>Supplerende bynavne</i>',
        suggestion: function(suggestion) {
          return suggestion.betegnelse;
        }
      }
    },
    {
      source: search('https://dawa.aws.dk/postnumre?autocomplete&per_side=5&q='),
      displayKey: 'betegnelse',
      templates: {
        header: '<i>Postnumre</i>',
        suggestion: function(suggestion) {
          return suggestion.betegnelse;
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

initAutocomplete('#input', selected);