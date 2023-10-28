const path = require('path');
//Router
const router = require('express').Router();

// ('/' is the route used to create a homepage for a server.) - respond with an HTML page to display in the browser
router.get('/', (req, res) => {
    // res.sendFile(), tell them where to find the file we want our server to read and send back to the client. - path module  ensure that we're finding the correct location for the HTML code we want to display in the browser
    res.sendFile(path.join(__dirname, '../../public/zookeepr-public/index.html'));
});

// This route will take us to /animals page.
router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepr-public/animals.html'));
});

// This route will take us to /zookeepr page
router.get('/zookeepers', (req, res) =>  {
    res.sendFile(path.join(__dirname, '../../public/zookeepr-public/zookeepers.html'));
});

// wildcard route for error handling - shouldways come last in route order'*' will act as a wildcard, meaning any route that wasn't previously defined will fall under this request and will receive the homepage as the response
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepr-public/index.html'));
});

module.exports = router;