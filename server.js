
// require only reading the data and creating a copy of it to use in server.js. So nothing we do with the imported data will ever affect the content of the file from which that data came.
const express = require('express');

//to write that data to animals.json
const fs = require('fs');
const path = require('path');

//creating a route that the front-end can request data from
const { animals } = require('./data/animals');

//tell our app to use that port, if it has been set, and if not, default to port 3001
const PORT = process.env.PORT || 3001;

// instantiate the server
const app = express();

// adds css and js files to html -  all of our front-end code can now be accessed without having a specific server endpoint created for it!
app.use(express.static('public/zookeepr-public'));

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());

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

//takes in the id and array of animals and returns a single animal object
function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
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

function createNewAnimal(body, animalsArray) {
    const animal = body;

    //.push() to save the new data in this local server.js copy of our animal data with  import and use the fs library to write that data to animals.json
    animalsArray.push(animal);

    // to write to our animals.json file in the data subdirectory, so we use the method path.join() to join the value of __dirname, which represents the directory of the file we execute the code in, with the path to the animals.json file.
    fs.writeFileSync(

        //write to our animals.json file in the data subdirectory, so we use the method path.join() to join the value of __dirname, which represents the directory of the file we execute the code in, with the path to the animals.json file
        path.join(__dirname, './data/animals.json'),

        //we need to save the JavaScript array data as JSON, so we use JSON.stringify() to convert it - null argument means we don't want to edit any of our existing data; -  2 indicates we want to create white space between our values to make it more readable 
        JSON.stringify({ animals: animalsArray }, null, 2)
    );
        
    return animal;
}

// add get route using (query)
app.get('/api/animals', (req, res) => {

    //whatever string of query parameters you use on the URL will become JSON
    let results = animals;

    // call the filterByQuery() in the app.get() callback
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// Create a new GET route for animals (using params)
app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);

    //JSON response is a single object instead of an array
    if (result) {
        res.json(result);

    //no record exists for the animal being searched for, the client receives a 404 error
    } else {
        res.send(404);
    }
});

// user send to to server to accept
app.post('/api/animals', (req, res) => {
    // req.body is where our incoming content will be ( length property of the animals array (because it's a one-to-one representation of our animals.json file data) and set that as the id for the new data. Remember, the length property is always going to be one number ahead of the last index of the array so we can avoid any duplicate values.)
    //set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    // if any data in req.body is incorrect, send 400 error back -(res.status().send(); is a response method to relay a message to the client making the request. We send them an HTTP status code and a message explaining what went wrong. Anything in the 400 range means that it's a user error and not a server error, and the message can help the user understand what went wrong on their end)
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');

    } else {
      //add animal to json file and animals array in this function
      const animal = createNewAnimal(req.body, animals);
      res.json(animal); 
    }
});

// ('/' is the route used to create a homepage for a server.) - respond with an HTML page to display in the browser
app.get('/', (req, res) => {
    // res.sendFile(), tell them where to find the file we want our server to read and send back to the client. - path module  ensure that we're finding the correct location for the HTML code we want to display in the browser
    res.sendFile(path.join(__dirname, './public/zookeepr-public/index.html'));
});

// This route will take us to /animals page.
app.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepr-public/animals.html'));
});

// This route will take us to /zookeepr page
app.get('/zookeepers', (req, res) =>  {
    res.sendFile(path.join(__dirname, './public/zookeepr-public/zookeepers.html'));
});

// wildcard route for error handling - shouldways come last in route order'*' will act as a wildcard, meaning any route that wasn't previously defined will fall under this request and will receive the homepage as the response
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepr-public/index.html'));
});

// tell the server to listen for requests
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

