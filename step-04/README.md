# ExpressJS - Step 04 - Serving the webapp

## Getting the webapp files

Now we need to copy the [Angular Beers](https://github.com/LostInBrittany/angular-beers) or the [Polymer Beers](https://github.com/LostInBrittany/polymer-beers) web application into the `app/public` folder, to get it served from the static express route.

For Angular Beers, you can simply get the [step 10 of Angular Beers](https://github.com/LostInBrittany/angular-beers/tree/master/step-10) and copy it into public. For the Polymer version do the same thing with the [step 8 of Polymer Beers](https://github.com/LostInBrittany/polymer-beers/tree/master/step-08).

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

To do :)

![Beer list](/assets/step-04-beerlist-withoutpics.png)

## Where are my pics?

We still have a problem with the images' path. We could correct it by modifying the JSON... but let's do it in the express way, by adding a route specifically for that:


    app.use('/beers/img', express.static('img'));      


And now we can see our work on the browser:


![Beer list](/assets/step-04-beerlist.png)
