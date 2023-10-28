
// require only reading the data and creating a copy of it to use in server.js. So nothing we do with the imported data will ever affect the content of the file from which that data came.
const express = require('express');

//tell our app to use that port, if it has been set, and if not, default to port 3001
const PORT = process.env.PORT || 3001;

// instantiate the server
const app = express();

//The require() statements will read the index.js files in each of the directories indicated - require(), the index.js file will be the default file read if no other file is provided, which is the coding method we're using here.
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());

// adds css and js files to html -  all of our front-end code can now be accessed without having a specific server endpoint created for it!
app.use(express.static('public/zookeepr-public'));

//This is our way of telling the server that any time a client navigates to <ourhost>/api, the app will use the router we set up in apiRoutes. If / is the endpoint, then the router will serve back our HTML routes.
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// tell the server to listen for requests
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
