foodApp.controller('mapCtrl', ['$scope', '$http', 'uiGmapGoogleMapApi', function ($scope, $http, uiGmapGoogleMapApi) {

    $scope.filter = {
        truck: true,
        push_cart: true
    };
    $scope.map = {
        center: { latitude: 37.75, longitude: -122.43 },
        zoom: 13,
        bounds: {},
        event: {
            click: function(a, b, c){
                console.log(a , b, c)
                $scope.showInfo =  true;
            }
        },
        closeClick: function(){
            $scope.showInfo =  false;
        }
    };
    $scope.markers = [{}];
    $scope.marker = {};
    $scope.map.markers = [{
            location: $scope.map.center,
            objectid: '1',
            icon: "assets/food-truck.png",
            closeClick: function(){
                $scope.showInfo =  false;
            }
    }];
    var events = {
        places_changed: function (searchBox) {
            var place = searchBox.getPlaces()[0].geometry.location;
            $scope.map.center = {latitude: place.k, longitude: place.D };
            $scope.map.zoom = 14;
            $scope.marker.location = {latitude: place.k, longitude: place.D };
        }
    }
    $scope.searchbox = { template:'searchbox.tpl.html', events:events};
    $scope.bounds = {};
    $scope.$watchCollection(function(){ return $scope.map.bounds}, function(current, old){
        if(current.northeast && !$scope.showInfo){
            var ne = current.northeast;
            var sw = current.southwest;
            $http.get('https://data.sfgov.org/resource/rqzj-sfat.json?$where=within_box(location,'+ne.latitude+','+sw.longitude+','+sw.latitude+','+ne.longitude+')').success(function(data){
                $scope.markers =  data;
                $scope.markers.forEach(function(v, i){
                    v.icon = v.facilitytype=="Push Cart" ? 'assets/push-cart.png' : 'assets/food-truck.png';
                    v.closeClick = function(){
                        $scope.showInfo =  false;
                    }
                });
                $scope.map.markers = filter($scope.markers);
                $scope.map.markers.forEach(function(v, i){
                    v.icon = v.facilitytype=="Push Cart" ? 'assets/push-cart.png' : 'assets/food-truck.png';
                    v.closeClick = function(){
                        $scope.showInfo =  false;
                    }
                });
            });
        }
    });
    $scope.$watchCollection('filter', function(current, old){
        if(old != current){
            console.log(current, old);
            $scope.map.markers = filter($scope.markers)
        }
    });
    function filter(markers){
        return markers.filter(function(v){
            if(v.facilitytype=="Push Cart"){
                return $scope.filter.push_cart;
            }
            if(v.facilitytype=="Truck"){
                return $scope.filter.truck;
            }
        })
    }
    $scope.reset = function () {
        $scope.map.center = { latitude: 37.75, longitude: -122.43 };
        $scope.marker = {};
    }
}]);