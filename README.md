# Food-trucks
Find food-trucks around you

###Problem
Search for food truck around a particular location using freely available API.

###Libraries

- AngularJs
- AngularGoogleMap

###Why Angular?
Angular is aptly suited for this project due to its two way data binding feature. Any change in map's bounds triggers API calls. And the gathered data is seamlessly reflected in ui, without any manual DOM manipulation.
It also makes filtering data according to truck type easy as the filter preference is watched by angular and UI is automatically updated when filter is changed

###Why Angular-Google-Map?
Angular-Google-Map provides convenient wrapper for common Google Map components. Markers directive is optimised for huge amount of data points and solves the issue to taxing DOM manipulation which would of occurred if the markers had been rendered with ng-repeat directive.
This library also provides convenient wrapper for search box using angular, which was also used in this project

###Challenges and issues

- On click on markers at the top of window the map repositions to show the complete infowindow, which triggers API call and refreshes the marker data.
- Some markers open us multiple infowindow on click
- Filter setting get over infowindow for some markers in such locations. Changing z-index of either element did not solve the issue.

###Solutions and Workarounds

- API is called when a particular variable is true which is set to false when infowindow is in open state
- A custom static infowindow is created which is filled with relevant data when marker is clicked
- Does not obstruct other ui components, but will hide the current marker if present at its location

There are 2 branches in this project, one implimented using standard infowindow and other using custom infowindow. The one with custon infowindow is merged with the master.

###TODOs

Move the map's center if the current marker gets behind the custom infowindow. This would be done using current bounds of the map in Lat and Long and current map width and height in px. Map requires new Lat Long data for its center. Distance to be moved in px to be converted into Lat Long data for the map to be repositioned accordingly. 

