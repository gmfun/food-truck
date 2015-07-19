foodApp.controller('mapCtrl', ['$scope', '$http', 'uiGmapGoogleMapApi', function ($scope, $http, uiGmapGoogleMapApi) {
    $scope.map = {
        center: { latitude: 37.75, longitude: -122.43 },
        zoom: 13,
        bounds: {}
    };
    $scope.data = [{location: $scope.map.center, objectid: '1'}]
    //$scope.data.location = $scope.map.center;
    $scope.bounds = {};
    $scope.$watchCollection(function(){
        return $scope.map.bounds
    }, function(current, old){
        console.log(current);
        //var newmap = current;
        if(current.northeast){
            var ne = current.northeast;
            var sw = current.southwest;
            $http.get('https://data.sfgov.org/resource/rqzj-sfat.json?$where=within_box(location,'+ne.latitude+','+sw.longitude+','+sw.latitude+','+ne.longitude+')').success(function(data){

                $scope.data=data;
                console.log(data[0]);
            });
        }
    });
}]);