# ExpressJS - Step 05 - Mongo Beers

Let's say you already have your beers in a MongoDB database. Now we are going to replace our local JSON files with calls to MongoDB.

> In order to do this step you need to have your beer data in a MongoDB database.
> How to do it is outside the scope of this tutorial, but if you only want to do a quicktest, you could:
>
> - Install MongoDB (see http://mongodb.com/)
> - Start the MongoDB daemon (usually with the command `mongod`)
> - Use `mongoimport` command line tool to import the detailed JSON datafiles
>
>    ```
>      mongoimport --jsonArray --db test --collection beers beers/AffligemBlond.json
>      mongoimport --jsonArray --db test --collection beers beers/AffligemDubbel.json
>      ...
>   ```   


## Adding the MongoDB driver dependency

For this step, we are going to use the official [MongoDB NodeJS driver](http://docs.mongodb.org/ecosystem/drivers/node-js).

Use `npm` to install the MongoDB Node.js driver:

    npm install --save mongodb

And we get it added to the `package.json`:  

    {
      "name": "express-beers",
      "version": "1.0.0",
      "description": "Express-Beers",
      "main": "index.js",
      "author": "Horacio. Gonzalez <horacio.gonzalez@gmail.com>",
      "license": "MIT",
      "dependencies": {
        "express": "^4.13.3",
        "mongodb": "^2.1.0"
      }
    }

## Connecting to Mongo

Now in our `index.js` we are going to get a `MongoClient` variable:

    var MongoClient = require('mongodb').MongoClient;


Connect using the `MongoClient` to your running `mongod` instance by specifying the MongoDB URI. For example, the following code connects to a MongoDB instance that runs on the localhost interface on port 27017 and switch to the `beers` database.

    var url = 'mongodb://localhost:27017/test';
    MongoClient.connect(url, function(err, db) {
      console.log("Connected correctly to MongoDB server.");
      db.close();
    });


## Ask for the beer list

Let's begin by coding a function that queries Mongo to get the beer list:

    var findBeers = function(db, beerList, callback) {
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


And then we can call that function in our `/beers` route:

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


![Beer list](/assets/step-05-beerlist.png)


## And about the beer details?

We begin by crating a function to query for a beer:

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

And like for the beer list, now we call it from the `/beer/:beerId` route:

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


![Beer list](/assets/step-05-beerdetails.png)
