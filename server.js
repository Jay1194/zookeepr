const express = require('express');

//creating a route that the front-end can request data from
const { animals } = require('./data/animals');

//tell our app to use that port, if it has been set, and if not, default to port 3001
const PORT = process.env.PORT || 3001;

// instantiate the server
const app = express();

//  for instead of handling the filter functionality inside the .get() callback (will take in req.query as an argument and filter through the animals accordingly, returning the new filtered array)
function filterByQuery(query, animalsArray) {

    //filterByQuery() method ensures that query.personalityTraits is always an array before the .forEach() method executes.
    let personalityTraitsArray = []

    // Note that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;

    if (query.personalityTraits) {

    // Save personalityTraits as a dedicated array.
    // If personalityTraits is a string, place it into a new array and save.
    if (typeof query.personalityTraits === 'string') {
        personalityTraitsArray = [query.personalityTraits];

    } else {
        personalityTraitsArray = query.personalityTraits;
    }

    // Loop through each trait in the personalityTraits array:
    personalityTraitsArray.forEach(trait => {

      // Check the trait against each animal in the filteredResults array.
      // Remember, it is initially a copy of the animalsArray,
      // but here we're updating it for each trait in the .forEach() loop.
      // For each trait being targeted by the filter, the filteredResults
      // array will then contain only the entries that contain the trait,
      // so at the end we'll have an array of animals that have every one 
      // of the traits when the .forEach() loop is finished.

      filteredResults = filteredResults.filter(
        animal => animal.personalityTraits.indexOf(trait) !== -1
      );
    });
    }

    //filters animals based diet name or species
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }

    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }

    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    // return the filtered results:
    return filteredResults;
}

// add route
app.get('/api/animals', (req, res) => {

    //whatever string of query parameters you use on the URL will become JSON
    let results = animals;
    // call the filterByQuery() in the app.get() callback
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// tell the server to listen for requests
app.listen(3001, () => {
    console.log(`API server now on port ${PORT}!`);
});

//navigate to http://localhost:3001/api/animalsLinks to an external site. in your browser to see string in res.