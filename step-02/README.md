# ExpressJS - Step 02 - Basic routing

## Getting the image files

Now we need to copy the `img` folder from the root of this tutorial into the `app` folder, as express will look for them there.

When done, you can proceed.

## Defining the routes

We are going to define the routes we need for our API application.

As we want to build a backend for [Angular Beers]() or [Polymer Beers]() applications,
we need to define:

- `GET /beers`: the list of beers, with name, description, alcohol content and image URL for each beers
- `GET /beer/<beerId>`: to get the detail of a beer

And we also want to serve as static files all the content of the `public` folder
(either [Angular Beers]() or [Polymer Beers]()), and all the content of the `img` folder
at the `/img` path.

Let's begin by defining the routes on Express:

    app.get('/beers', function (req, res) {
      console.log('Received request for beers from', req.ip)
      res.send('Hello beers');
    });

    app.get('/beer/:beerId', function (req, res) {
      console.log('Received request for '+req.params['beerId']+' from', req.ip)
      res.send('Hello beer '+req.params['beerId']);
    });

And the two static files folders:

    app.use('/img', express.static('img'));
    app.use(express.static('public'));
