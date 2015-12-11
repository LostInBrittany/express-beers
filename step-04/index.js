var express = require('express');
var app = express();


app.get('/beers', function (req, res) {
  console.log('Received request for beers from', req.ip)
  res.json(beerList);
});

app.get('/beer/:beerId', function (req, res) {
  console.log('Received request for '+req.param('beerId')+' from', req.ip)
  var beerDetails = require('./beers/'+req.param('beerId')+'.json');
  res.json(beerDetails);
});


app.use('/beers/img', express.static('img'));
app.use('/img', express.static('img'));
app.use(express.static('public'));


var beerList = require('./beers/beers.json');
console.log("Beers loaded")

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at http://%s:%s', host, port);
});
