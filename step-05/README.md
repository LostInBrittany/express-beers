# ExpressJS - Step 05 - Mongo Beers

Let's say you already have your beers in a MongoDB database. Now we are going to replace our local JSON files with calls to MongoDB.

> In order to do this step you need to have your beer data in a MongoDB database.
> The image used in the [GitPod setup for this project](https://gitpod.io/#https://github.com/LostInBrittany/express-beers) there is already MongoDB installed, you only need to install it by yourself is you aren't using GitPod. 
> How to do it is outside the scope of this tutorial, but if you only want to do a quicktest, you could:
>
> - Install [MongoDB community server](https://www.mongodb.com/try/download/community)
> - Install [MongoDB database tools](https://www.mongodb.com/try/download/database-tools)
>
> In any case, you need to import the detailed JSON datafiles by using the `mongoimport` tool.
> Start the MongoDB daemon with the command `mongod`, and then import the JSON files with `mongoimport`:
>
>    ```
>    mongoimport --db test --collection beers beers/AffligemBlond.json
>    mongoimport --db test --collection beers beers/AffligemDubbel.json
>    mongoimport --db test --collection beers beers/AffligemTripel.json
>    mongoimport --db test --collection beers beers/ChimayRed.json
>    mongoimport --db test --collection beers beers/ChimayTriple.json
>    mongoimport --db test --collection beers beers/StBernardusAbt12.json
>    mongoimport --db test --collection beers beers/StBernardusPater6.json
>    mongoimport --db test --collection beers beers/StBernardusTriple.json
>    mongoimport --db test --collection beers beers/TrappistesRochefort6.json
>    mongoimport --db test --collection beers beers/TrappistesRochefort8.json
>    mongoimport --db test --collection beers beers/TrappistesRochefort10.json
>    ```   

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
    "express": "^4.16.4",
    "mongodb": "^3.1.10"
      }
    }

## Connecting to Mongo

Now in our `index.js` we are going to get a `MongoClient` variable:

    var MongoClient = require('mongodb').MongoClient;


Connect using the `MongoClient` to your running `mongod` instance by specifying the MongoDB URI. For example, the following code connects to a MongoDB instance that runs on the localhost interface on port 27017 and switch to the `beers` database.

```javascript
var url = 'mongodb://localhost:27017';
MongoClient.connect(url, function(err, client) {
  console.log("Connected correctly to MongoDB server.");
  client.close();
});
```

## Ask for the beer list

Let's add a  `/beers` route, with a callback that connects to Mongo and recovers the beer list. 
We are heavily using the power of [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) to make asynchronous code simple:

```js
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
```

![Beer list](/assets/step-05-beerlist.png)


## And about the beer details?

Like for the beer list, we begin by adding a `/beer/:beerId` route with an `async` callback.
In the callback we connect to Mongo and find the beer corresponding to `beerId`:

```js
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

```   


![Beer list](/assets/step-05-beerdetails.png)
