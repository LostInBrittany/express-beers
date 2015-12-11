var express = require('express');
var app = express();
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;

var findBeer = function(db, beerId, callback) {
   var cursor =db.collection('beers').find({id: beerId} );
   var beer;
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
        beer = doc;
      } else {
         callback(beer);
      }
   });
};

var findBeers = function(db, beerList,  callback) {
   var cursor =db.collection('beers').find( );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         beerList.push(doc);
      } else {
         callback();
      }
   });
};

app.get('/beers', function (req, res) {
  console.log('Received request for beers from', req.ip)

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    var beerList = [];
    findBeers(db, beerList, function() {
      res.json(beerList);
      db.close();
    });

  });
});

app.get('/beer/:beerId', function (req, res) {
  console.log('Received request for '+req.param('beerId')+' from', req.ip)
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    findBeer(db, req.param('beerId'),  function(beer) {
      console.log(beer)
      res.json(beer);
      db.close();
    });

  });
});


app.use('/beers/img', express.static('img'));
app.use('/img', express.static('img'));
app.use(express.static('public'));

var url = 'mongodb://localhost:27017/test';



var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at http://%s:%s', host, port);
});
