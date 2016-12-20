# ExpressJS - Step 01 - Hello World!


## Initialize npm

Let's begin by initializing npm

    $ npm init

Now we add ExpressJS to your dependencies by installing it with the `--save` flag

    $ npm install --save express

A suitable `packager.json` file is generated including the ExpressJS dependency:

    {
      "name": "express-beers",
      "version": "1.0.0",
      "description": "Express-Beers",
      "main": "index.js",
      "author": "Horacio. Gonzalez <horacio.gonzalez@gmail.com>",
      "license": "MIT",
      "dependencies": {
        "express": "^4.13.3"
      }
    }

## Create a minimal Hello World express

Now we are going to create our first API server in the `index.js` file.

Let's begin by requiring the `express` module, who has all the routing defining functions we need for our API server,
and using it to create an `app` object.

    var express = require('express');
    var app = express();

On this `app` object we can now define routes. For each route we define the HTTP method and the URL path it answers to, and the callback function the application will call when a request with matching method and matching path is received.

    app.get('/', function (req, res) {
      console.log('Received request from', req.ip)
      res.send('Hello World!');
    });

So here we are saying that all the GET requests to the base URL of our server (path `'/'`) are answered by this route, and the answer is given by the callback function: we send "Hello World!" back to the client.

Now we create a web server serving our application on the port 3000, and login the starting of the server.

    var server = app.listen(3000, function () {
      var host = server.address().address;
      var port = server.address().port;
      console.log('Listening at http://%s:%s', host, port);
    });



## Let's test it

Let's start the API server:

    $ node index.js
    Listening at http://:::3000

And now go to [127.0.0.1:3000](http://127.0.0.1:3000) in your browser and see the nice response.

![Hello World!](/assets/step-01-helloworld.png)

Meanwhile in the console you should get something like:

    $ node index.js
    Listening at http://:::3000
    Received request from 127.0.0.1
