# Express-Beers

## A server-side companion to the [Angular Beers](https://github.com/LostInBrittany/angular-beers) and [Polymer Beers](https://github.com/LostInBrittany/polymer-beers) projects

The [angular-beers](https://github.com/LostInBrittany/angular-beers) project is a small [AngularJS](http://angularjs.org) tutorial that can be used on its own. But IMHO it is a pity to do only the client-side and mocking the server API with plain files. So here we have a companion project where we are going to do the server-side of [angular-beers](https://github.com/LostInBrittany/angular-beers) using [ExpressJS](http://expressjs.org/), tiny [Sinatra](http://www.sinatrarb.com/) inspired framework for creating web applications in NodeJS with minimal effort.

## What are the objectives of this tutorial

Follow this tutorial to learn to build APIs in JavaScript quickly an easily, without all the pain of the classic way. You will use the [ExpressJS](http://expressjs.org/) framework, with some drops of NoSQL databases (with [MongoDB](http://mongodb.com), work in progress).



## How is the tutorial organized ##

As many computers used for the course haven't Git, we have structurated the project to allow a Git-less use. The `src` directory is the sources directory of the project, the working version of the code. The tutorial is divided in steps, each one in its own directory:

1. [Hello world](./step-01/)
1. [Basic routing](./step-02/)
1. [JSON beers](./step-03/)
1. [Serving the webapp](./step-04/)
1. [Mongo beers](./step-05/)

In each step directory you have a README file that explain the objective of the step, that you will do in the working directory `app`. If you have problems or if you get lost, you also have the solution of each step in the step directories.
