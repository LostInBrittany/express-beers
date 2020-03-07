var express = require('express');
var app = express();
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;


app.get('/beers', async function (req, res) {
  console.log('Received request for beers from', req.ip);
  let client;
  try {  
    client = await MongoClient.connect(url);
    const db = client.db(dbName);
    var beerList = await db.collection('beers').find().toArray();
    res.json(beerList);
  } catch(err) {
    console.log(err.stack);
  }
  client.close();
});

app.get('/beer/:beerId', async function (req, res) {
  console.log(`Received request for ${req.params.beerId} from ${req.ip}`);
  let client;
  try {  
    client = await MongoClient.connect(url);
    const db = client.db(dbName);
    let beerId = req.params.beerId;
    let beerList = await db.collection('beers').find({id: beerId}).toArray(); 
    let beer = beerList[0];
    console.log(beer);
    res.json(beer);
  } catch(err) {
    console.log(err.stack);
  }
  client.close();
});


app.use('/beers/img', express.static('img'));
app.use('/img', express.static('img'));
app.use(express.static('public'));

var url = 'mongodb://localhost:27017';
var dbName = 'test'



var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at http://%s:%s', host, port);
});
