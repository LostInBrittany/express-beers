var express = require('express');
var app = express();
var cors = require('cors');
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');

async function connect() {
  try {  
    let client = await MongoClient.connect(url);
    db = client.db(dbName);
  } catch(err) {
    console.log(err.stack);
  }
}

function isBeer(obj) {
  // If the minimal information on the beer isn't available, the object isn't a valid beer
  if (
    !obj.hasOwnProperty('id') || 
    !obj.hasOwnProperty('name') || 
    !obj.hasOwnProperty('alcohol') || 
    !obj.hasOwnProperty('description') 
  ) {
    return false;
  }
  return true;
}

function sanitizeBeer(beer) {
  return { 
    id: beer.id, name: beer.name, alcohol: beer.alcohol, description: beer.description, 
    availability: beer.availability, brewery: beer.brewery, img: beer.img, label: beer.label,
    serving: beer.serving, style: beer.style
   };
}

app.use(bodyParser.json());
app.use(cors());

app.get('/beers', async function (req, res) {
  console.log('Received request for beers from', req.ip);
  try {  
    var beerList = await db.collection('beers').find().toArray();
    res.json(beerList);
  } catch(err) {
    console.log(err.stack);
  }
});

app.get('/beer/:beerId', async function (req, res) {
  console.log(`Received request for ${req.params.beerId} from ${req.ip}`);
  try {  
    let beerId = req.params.beerId;
    let beerList = await db.collection('beers').find({id: beerId}).toArray(); 
    let beer = beerList[0];
    console.log(beer);
    res.json(beer);
  } catch(err) {
    console.log(err.stack);
  }
});

app.put('/beer/:beerId', async function (req, res) {
  console.log(`Received request for editing ${req.params.beerId} from ${req.ip}`);
  let beer = req.body;
  console.log('Beer to edit', beer);
  if (!isBeer(beer)) {
    res.status(400);
    res.send(`Received object isn't a valid beer: ${JSON.stringify(beer)}`);
    return;
  }
  beer.id = req.params.beerId;
  beer = sanitizeBeer(beer);

  try {  
    let exists = await db.collection('beers').find({id: beer.id}).count();
    if (exists == 0) {
      res.status(401);
      res.send(`There is no beer with id ${beer.id} in the database \n`)
      return;
    }
    let result = await db.collection('beers').replaceOne({id: beer.id}, beer);
    res.send(`Beer ${beer.id} has been modified \n`);
  } catch(err) {
    console.log(err.stack);
  }
});

app.delete('/beer/:beerId', async function (req, res) {
  console.log(`Received request for deleting ${req.params.beerId} from ${req.ip}`);
  try {  
    let exists = await db.collection('beers').find({id: req.params.beerId}).count();
    if (exists == 0) {
      res.status(401);
      res.send(`There is no beer with id ${req.params.beerId} in the database \n`)
      return;
    }
    let result = await db.collection('beers').deleteOne({id: req.params.beerId});
    res.send(`Beer ${req.params.beerId} has been deleted \n`);
  } catch(err) {
    console.log(err.stack);
  }
});

app.post('/create', async function (req, res) {
  console.log('Received request to create a new beer from', req.ip);
  console.log('New beer', req.body);
  if (!isBeer(req.body)) {
    res.status(400);
    res.send(`Received object isn't a valid beer: ${JSON.stringify(req.body)}`);
    return;
  }
  let beer = sanitizeBeer(req.body);
  try {      
    let exists = await db.collection('beers').find({id: beer.id}).count();
    if (exists > 0) {
      res.status(401);
      res.send(`There is already a beer with id ${beer.id} in the database \n`)
      return;
    }
    let result = await db.collection('beers').insertOne(beer);
    res.send(`A beer was inserted with the _id: ${result.insertedId} \n`);
  } catch(err) {
    console.log(err.stack);
  }
});

app.use('/beers/img', express.static('img'));
app.use('/img', express.static('img'));
app.use(express.static('public'));

var url = 'mongodb://localhost:27017';
var dbName = 'test'
var db;

connect();

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at http://%s:%s', host, port);
});
