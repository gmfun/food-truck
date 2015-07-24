# Food-trucks
Find food-trucks around you

###Problem
Search for food truck around a particular location using freely available API.

###Libraries

- AngularJs
- AngularGoogleMap
- Gulp.js (gulp-concat)

###Features
- Search any location and find food-truck nearby
- Filter food-truck according to type
- Get selected food-trucks name address and items served
- Highlight selected marker and bring it to center
- Cluster up markers

###Why Angular?
Angular is aptly suited for this project due to its two way data binding feature. Any change in map's bounds triggers API calls. And the gathered data is seamlessly reflected in ui, without any manual DOM manipulation.
It also makes filtering data according to truck type easy as the filter preference is watched by angular and UI is automatically updated when filter is changed

###Why Angular-Google-Map?
Angular-Google-Map provides convenient wrapper for common Google Map components. Markers directive is optimised for huge amount of data points and solves the issue to taxing DOM manipulation which would of occurred if the markers had been rendered with ng-repeat directive.
This library also provides convenient wrapper for search box and clustering of markers, which were used in this project

###Challenges and issues

Default infowindow directive provided by angular-google-map had some issues like 
* Infowindow flickering after being clicked
* Autoclose when map's center changed. (angular-google-map traces markers by idkey, so change in data should not re-render the marker until idkey is unique)



###Solutions and Workarounds
Due to issues with default infowindow, custom infowindow was used. 

Implementation with default infowindow can be found in another branch.

####TODO
- Cluster only similar types of truck's markers
- Position custom infowindow near the clicked marker

