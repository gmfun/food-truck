var foodApp = angular.module('foodApp', ['uiGmapgoogle-maps'])
    .config(function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v: '3.17',
            libraries: 'weather,geometry,places'
        });
    });

/**
 * Created by gauravmukherjee on 19/07/15.
 */
