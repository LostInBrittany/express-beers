# ExpressJS - Step 02 - Getting beer list

## Getting the beers files

Now we need to copy the `beers` folder from the root of this tutorial into the `app` folder, as express will look for them there.

When done, you can proceed.

## Reading beer from JSON file

With node you read a JSON file simply by using `require`:

    var myData = require('./data.json');

We are going to use this technique to get the beer list info needed in the `/beers` route:

    var beerList = require('./beers/beers.json');
    console.log("Beers", beerList)

    var server = app.listen(3000, function () {
      var host = server.address().address;
      var port = server.address().port;
      console.log('Listening at http://%s:%s', host, port);
    });


So we have a `beerList` variable that contains the info needed for the `/beers` route.
Now we can modify the route to send back the beer list:

    app.get('/beers', function (req, res) {
      console.log('Received request for beers from', req.ip)
      res.json(beerList);
    });
