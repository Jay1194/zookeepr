
//dependencies
const fs = require("fs");
const path = require("path");

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

    console.log(personalityTraitsArray);

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

//takes in the id and array of animals and returns a single animal object
function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}

function createNewAnimal(body, animalsArray) {
    const animal = body;

    //.push() to save the new data in this local server.js copy of our animal data with  import and use the fs library to write that data to animals.json
    animalsArray.push(animal);

    // to write to our animals.json file in the data subdirectory, so we use the method path.join() to join the value of __dirname, which represents the directory of the file we execute the code in, with the path to the animals.json file.
    fs.writeFileSync(

        //write to our animals.json file in the data subdirectory, so we use the method path.join() to join the value of __dirname, which represents the directory of the file we execute the code in, with the path to the animals.json file
        path.join(__dirname, '../data/animals.json'),

        //we need to save the JavaScript array data as JSON, so we use JSON.stringify() to convert it - null argument means we don't want to edit any of our existing data; -  2 indicates we want to create white space between our values to make it more readable 
        JSON.stringify({ animals: animalsArray }, null, 2)
    );
        
    return animal;
}

//(Validation) going to take our new animal data from req.body and check if each key not only exists, but that it is also the right type of data.
function validateAnimal(animal) {

    if (!animal.name || typeof animal.name !== 'string') {
        return false;
    }

    if (!animal.species || typeof animal.species !== 'string') {
        return false;
    }

    if (!animal.diet || typeof animal.diet != 'string') {
        return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    }

    return true;
}

module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
};