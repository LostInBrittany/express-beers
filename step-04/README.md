# ExpressJS - Step 04 - Serving the webapp

## Getting the webapp files

Now we need to copy the [Angular Beers](https://github.com/LostInBrittany/angular-beers) or the [Polymer Beers](https://github.com/LostInBrittany/polymer-beers) web application into the `app/public` folder, to get it served from the static express route.

For Angular Beers, you can simply get the [step 10 of Angular Beers](https://github.com/LostInBrittany/angular-beers/tree/master/step-10) and copy it into `public`. Then you go to `localhost:3000/index.html` to see the main page of your app.

For the Polymer version copy the [step 8 of Polymer Beers](https://github.com/LostInBrittany/polymer-beers/tree/master/step-08) into `public/app` and then copy the [`bower_components` folder](https://github.com/LostInBrittany/angular-beers/tree/master/bower_components) into `public`. Then you go to `localhost:3000/app/index.html` to see the main page of your app.

In both cases, in order to be sure you're calling the Express server, delete the `data` folder of the webapp, so you don't feel tempted to simply read your JSON files...

## Modify the webapp to call the express server

### Angular Beers

Now we need to modify the controllers of Angular Beers to call our new server instead of simply requesting the JSON files.

    angular
      .module('BeerControllers', [])
      .controller('BeerListCtrl', ['$scope', '$http', function($scope, $http) {

        $http.get('beers').success(function(data) {
          $scope.beers = data;
        });

        $scope.orderProp = 'alcohol';
      }])
      .controller('BeerDetailCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
        $http.get('beer/' + $routeParams.beerId).success(function(data) {
          $scope.beer = data;      
          $scope.mainImg = $scope.beer.img;

          $scope.setImage = function(img) {
            $scope.mainImg = img;
          }
        });
      }]);


### Polymer Beers

In `beer-list` element, modify the `iron-ajax`to to call our new server using the routes defined for express in `index.js` instead of simply requesting the JSON files:

```
    <iron-ajax
      auto
      url="/beers"
      method='get'
      params='{}'
      handle-as="json"
      on-response="gotBeers"
      debounce-duration="300"></iron-ajax>
```

Same thing in `beer-details`:

```
    getUrl: function(id) {
      return "/beer/"+id;
    },
```

![Beer list](/assets/step-04-beerlist-withoutpics.png)

## Where are my pics?

We still have a problem with the images' path. We could correct it by modifying the JSON... but let's do it in the express way, by adding a route specifically for that:


    app.use('/beers/img', express.static('img'));      


And now we can see our work on the browser:


![Beer list](/assets/step-04-beerlist.png)
