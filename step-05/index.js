var express = require('express');
var app = express();
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;


var findBeer = async function(db, beerId, callback) {
   var cursor =db.collection('beers').find({id: beerId} );
   // Iterate over the cursor
   while(await cursor.hasNext()) {
     const doc = await cursor.next();
     if (doc != null) {
      callback(doc);
      return;
    } 
  }
};

var findBeers = async function(db, beerList,  callback) {
   var cursor =db.collection('beers').find( );

  // Iterate over the cursor
  while(await cursor.hasNext()) {
    const doc = await cursor.next();
    if (doc != null) {
        beerList.push(doc);
    } 
  }
  callback();
};

app.get('/beers', function (req, res) {
  console.log('Received request for beers from', req.ip)

  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    assert.equal(null, err);
    var beerList = [];
    findBeers(db, beerList, function() {
      res.json(beerList);
      client.close();
    });

  });
});

app.get('/beer/:beerId', function (req, res) {
  console.log(`Received request for ${req.params.beerId} from ${req.ip}`)
  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    assert.equal(null, err);
    findBeer(db, req.params.beerId,  function(beer) {
      console.log(beer)
      res.json(beer);
      client.close();
    });

  });
});


app.use('/beers/img', express.static('img'));
app.use('/img', express.static('img'));
app.use(express.static('public'));

var url = 'mongodb://localhost:27017';
var dbName = 'beers'



var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at http://%s:%s', host, port);
});
