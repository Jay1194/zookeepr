const express = require('express');

// Setting up the server only takes two steps: we need to instantiate the server, then tell it to listen for requests. To instantiate the server
const app = express();

// tell it to listen for requests
app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});