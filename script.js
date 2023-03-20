// Varilable with the endpoint link for the data base with the states' and cities' names

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

// Declare cities variable with an empty array

const cities = [];

// Fetch the endpoint - gives us a promise

fetch(endpoint)
  .then(reply => reply.json())  // then() converts the parameter into json
  .then(data => cities.push(...data)); // then() push the data into the cities array using ES6 spread

// Function to take an input and give an array with the subset of objects/places 

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    // Check if the city or state matches what was searched
    const regex = new RegExp(wordToMatch, 'gi'); // 'gi' stands for 'global' and 'case insensitive'
    return place.city.match(regex) || place.state.match(regex)
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

// =============================================================================

/*
1. declare a varilable with the endpoint link;

2. declare cities variable with an empty array;

3. fetch the endpoint - gives us a promise;

4. then() convert the blob into json;

5. then() push the data into the cities array using ES6 spread(...);

6. Write a function findMatches that takes an input and gives an array with the subset of objects/places whose city and state properties match the input;

6a. function with wordToMatch (which will be the input) and an array as parameter;
6b. return a filtered array:
6c. each object is checked for the wordToMatch in it's city name or state name;
6d. declare a new Reg Exp which which hold the wordToMatch, and use the regex to find a match in the objects;
6e. test it in console using a word and cities array as parameters;

7. declare variable for the search field;

8. add a event listeners for the searchfield (change, keyup), which will run a new Function displayMatches;

9. declare a variable for suggestions list items;

10. wirte a function which will get the input from search field and passes it as wordToMatch parameter for the findMatches function;

11. create a HTML variable and assign - array.map'ing the resulting subset of matched cities array to get the name of the city, state, and population as varilables;

12. return a html list item with the variables, to be added to the suggestions;

13. use regex to replace the city name and statename with a new class to highlight content.
*/

