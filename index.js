// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/whoami', (req, res) => {
  // Extract the IP address from headers or connection object
  const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  // Extract the preferred language from the 'Accept-Language' header
  const preferredLanguage = req.headers['accept-language']?.split(',')[0];
  
  // Extract the User-Agent string from the request headers for software info
  const userAgent = req.headers['user-agent'];

  // Return a JSON object with ipaddress, language, and software information
  res.json({
    ipaddress: ipAddress,
    language: preferredLanguage,
    software: userAgent
  });
});
// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
