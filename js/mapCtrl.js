foodApp.controller('mapCtrl', ['$scope', '$http', 'uiGmapGoogleMapApi', function ($scope, $http, uiGmapGoogleMapApi) {

    $scope.filter = {
        truck: true,
        push_cart: true
    };
    var selectedMarker;
    $scope.selected = {};
    $scope.map = {
        center: { latitude: 37.72345985935402, longitude: -122.41944282531739 }, //initial center of map
        zoom: 14,
        bounds: {},
        events: {
            click: function(a, b, c){
                $scope.selected = {show: false};
                getmarkers($scope.map.bounds)
                $scope.$apply()
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
    var search_events = {
        places_changed: function (searchBox) {
            $scope.selected = {show: false};
            var place = searchBox.getPlaces()[0].geometry.location;
            $scope.map.center = {latitude: place.k, longitude: place.D };
            $scope.map.zoom = 14;
            $scope.marker.location = {latitude: place.k, longitude: place.D };
        }
    };
    $scope.searchbox = { template:'searchbox.tpl.html', events:search_events};
    $scope.bounds = {};
    $scope.$watchCollection(function(){ return $scope.map.bounds}, function(current, old){
        //console.log($scope.map.center);
        getmarkers(current)
    });
    $scope.$watchCollection('filter', function(current, old){
        if(old != current){
            console.log(current, old);
            $scope.map.markers = filter($scope.markers)
        }
    });
    function getmarkers(current) {
        if(current.northeast && !$scope.selected.show){
            var ne = current.northeast;
            var sw = current.southwest;
            $http.get('https://data.sfgov.org/resource/rqzj-sfat.json?$where=within_box(location,'+ne.latitude+','+sw.longitude+','+sw.latitude+','+ne.longitude+')').success(function(data){
                $scope.markers =  data;
                $scope.markers.forEach(function(v, i){
                    v.icon = v.facilitytype=="Push Cart" ? 'assets/push-cart.png' : 'assets/food-truck.png';
                    v.closeClick = function(){
                        $scope.showInfo =  false;
                    };
                    v.selected = true
                    v.events = {
                        click: function(a, b, c){
                            // store the selected marker in a variable
                            if(selectedMarker)
                                selectedMarker.icon = selectedMarker.facilitytype=="Push Cart" ? 'assets/push-cart.png' : 'assets/food-truck.png';
                            selectedMarker = c;
                            selectedMarker.icon = selectedMarker.facilitytype=="Push Cart" ? 'assets/push-cart-active.png' : 'assets/food-truck-active.png';
                            $scope.map.center = angular.copy(c.location);
                            $scope.selected = {
                                name: c.applicant,
                                serve: c.fooditems,
                                address: c.locationdescription,
                                show: true
                            }
                        }
                    }
                });
                $scope.map.markers = filter($scope.markers);
            });
        }

    }
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
    $scope.closeinfo = function(){
        $scope.selected.show = false;
        getmarkers($scope.map.bounds)

    }
    $scope.reset = function () {
        $scope.map.center = { latitude: 37.72345985935402, longitude: -122.41944282531739 };
        $scope.marker = {};
    }
}]);