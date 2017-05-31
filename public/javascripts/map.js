var map, infoWindow, currPos, currPosMarker, waypts, wayptsList, cols, place, geocoder, markers, namesArray, service, request;
var labelIndex = 0;
// var isDuplicate = false;

$("#new-waypoint").keyup(function(event) {
  if (event.keyCode == 13) {
    $("#add-waypoint-btn").click();
  }
});

function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
  geocoder = new google.maps.Geocoder();
  markers = [];
  namesArray = [];

  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 32.8801,
      lng: -117.2340
    },
    mapTypeControl: false,
    zoom: 13,
    styles: [{
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [{
        "visibility": "on"
      }, {
        "weight": "0.75"
      }]
    }, {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [{
        "color": "#d0e3b4"
      }]
    }, {
      "featureType": "landscape.natural.terrain",
      "elementType": "geometry",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "poi",
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "poi.attraction",
      "elementType": "geometry.fill",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "poi.attraction",
      "elementType": "geometry.stroke",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "poi.attraction",
      "elementType": "labels.text.fill",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "poi.attraction",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "poi.attraction",
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "poi.business",
      "elementType": "all",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "poi.government",
      "elementType": "geometry.fill",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "poi.government",
      "elementType": "labels.text.fill",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "poi.medical",
      "elementType": "geometry",
      "stylers": [{
        "color": "#fbd3da"
      }]
    }, {
      "featureType": "poi.medical",
      "elementType": "geometry.fill",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "poi.medical",
      "elementType": "labels.text.fill",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "poi.medical",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [{
        "color": "#bde6ab"
      }]
    }, {
      "featureType": "poi.park",
      "elementType": "geometry.stroke",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#ffe15f"
      }, {
        "visibility": "on"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#efd151"
      }, {
        "visibility": "off"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "road.highway.controlled_access",
      "elementType": "labels.text.fill",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "road.highway.controlled_access",
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#ffffff"
      }, {
        "visibility": "on"
      }]
    }, {
      "featureType": "road.local",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "black"
      }]
    }, {
      "featureType": "transit.station.airport",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#cfb2db"
      }]
    }, {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{
        "color": "#a2daf2"
      }]
    }]
  });
  infoWindow = new google.maps.InfoWindow;

  waypts = [];
  initWaypoints(waypts);

  var input = document.getElementById('new-waypoint');
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);
  autocomplete.addListener('place_changed', function() {
    place = autocomplete.getPlace();
    var address = autocomplete.formatted_address;
    var name = autocomplete.name;
  });

  cols = document.querySelectorAll('.points');

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    if (window.location.pathname == '/create' || window.location.pathname.indexOf('/edit/') == 0) {
      mapWaypoints(directionsService, directionsDisplay, waypts);
    } else {
      if (document.getElementById('curr-location').checked) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          map.setCenter(pos);
          currPos = pos;

          currPosMarker = new google.maps.Marker({
            position: currPos,
            map: map,
            title: 'You are here.',
            animation: google.maps.Animation.DROP,
            visible: true
          });

          mapWaypoints(directionsService, directionsDisplay, waypts);

        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        mapWaypoints(directionsService, directionsDisplay, waypts);
      }
    }
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  directionsDisplay.setMap(map);
  document.getElementById('directions-panel').innerHTML = '';
  directionsDisplay.setPanel(document.getElementById('directions-panel'));

  if (window.location.pathname == '/create' || window.location.pathname.indexOf('/edit/') == 0) {
    document.getElementById('add-waypoint-btn').addEventListener('click', function() {
      addWaypoint(waypts);
    });
  }

  //automatically detect changes in waypoints list and update map.
  var map_waypoints = $("#waypoints").html();
  setInterval(detectListChange, 3000);

  function detectListChange() {
    if (map_waypoints != $("#waypoints").html()) {
      map_waypoints = $("#waypoints").html();
      mapWaypoints(directionsService, directionsDisplay, waypts);
    }
  }
}

function initWaypoints(waypts) {
  waypts = [];
  wayptsList = document.getElementById('waypoints');
  var places = wayptsList.getElementsByTagName('li');
  for (var i = 0; i < places.length; i++) {
    waypts.push({
      placeId: places[i].getAttribute('name'),
      location: places[i].getAttribute('data-value'),
      stopover: true
    });
    namesArray.push(places[i].getAttribute('name'));
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

// add new location to list if valid and less than 22 locations
function addWaypoint(waypts) {
  waypts = [];
  wayptsList = document.getElementById('waypoints');
  var places = wayptsList.getElementsByTagName('li');
  namesArray = [];
  if (places.length > 21) {
    alert('Too many locations!');
    return;
  }
  for (var i = 0; i < places.length; i++) {
    waypts.push({
      location: places[i].getAttribute('data-value'),
      stopover: true
    });
    namesArray.push(places[i].getAttribute('name'));
  }

  var newWaypoint = place.name;
  document.getElementById('waypoints-error').innerHTML = '';
  if (newWaypoint != '') {
    // check if valid address
    geocoder.geocode({'address': document.getElementById('new-waypoint').value}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
        // check if user is trying to add a duplicate destination
        var x;
        for (x = 0; x < waypts.length; x++) {
          if (document.getElementById('new-waypoint').value == waypts[x].location) {
            document.getElementById('waypoints-error').innerHTML = 'Destination already exists in the list';
            document.getElementById('new-waypoint').value = '';
            cols = document.querySelectorAll('.points');
            place.name = '';
            return;
          }
        }

        // if not, add the new destination to the list
        namesArray.push(newWaypoint);
        waypts.push({
          location: document.getElementById('new-waypoint').value,
          stopover: true
        });
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(newWaypoint));
        li.className += "points";
        li.draggable = true;
        li.setAttribute('data-value', document.getElementById('new-waypoint').value);
        li.setAttribute('name', newWaypoint);
        var point_i = document.createElement('i');
        point_i.className += "fa fa-times fa-lg remove-point";
        point_i.setAttribute('aria-hidden', "true");
        li.appendChild(point_i);
        wayptsList.appendChild(li);
        document.getElementById('waypoints').appendChild(li);
        document.getElementById('new-waypoint').value = '';
        cols = document.querySelectorAll('.points');
        place.name = '';

      } else {
        alert('Invalid address!');
        return;
      }
    });
  }
}

// adds a new marker to specified location
function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    label: labels[labelIndex++ % labels.length]
  });
  markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
  labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  labelIndex = 0;
}

// adds text to the specified marker's infowindow content
function attachText(marker, text) {
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(text);
    if (infoWindow.getMap() == null) {
      infoWindow.open(map, marker);
    } else {
      if (marker == infoWindow.anchor) {
        infoWindow.close();
      } else {
        infoWindow.open(map, marker);
      }
    }
  });
}

// handles main functionality of mapping the path
function mapWaypoints(directionsService, directionsDisplay, waypts) {
  waypts = [];
  wayptsList = document.getElementById('waypoints');
  var places = wayptsList.getElementsByTagName('li');
  namesArray = [];
  var totalDistance = 0;
  var totalDuration = 0;
  for (var i = 0; i < places.length; i++) {
    waypts.push({
      location: places[i].getAttribute('data-value'),
      stopover: true
    });
    namesArray.push(places[i].getAttribute('name'));
  }

  if (window.location.pathname == '/create' || window.location.pathname.indexOf('/edit/') == 0) {
    document.getElementById('waypoints-error').innerHTML = '';
  }

  if (waypts.length == 0) { // if 0 waypoints, display nothing
    deleteMarkers();
    document.getElementById('directions-panel').innerHTML = '';
    directionsDisplay.setMap(null);
    totalDistance = 0;
    totalDuration = 0;
    document.getElementById('total-distance').innerHTML = '';
    document.getElementById('total-duration').innerHTML = '';
  } else if (waypts.length == 1) { // if only one waypoint, display only a marker
    deleteMarkers();
    var onePointLocation = waypts[0].location;
    document.getElementById('directions-panel').innerHTML = '';
    geocoder.geocode( {'address': onePointLocation}, function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        var onePointMarker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            label: labels[labelIndex++ % labels.length]
        });
        var html = "<b>" + namesArray[0] + "</b> <br/>" + results[0].formatted_address;
        attachText(onePointMarker, html);
        markers.push(onePointMarker);
        // if on list view and checking box to start from current location
        if (!(window.location.pathname == '/create') && !(window.location.pathname.indexOf('/edit/') == 0) && document.getElementById('curr-location').checked) {
          directionsDisplay.setMap(map);
          waypts[0].stopover = false;
          directionsService.route({
            origin: currPos,
            destination: onePointLocation,
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: 'DRIVING'
          }, function(response, status) {
            if (status === 'OK') {
              directionsDisplay.setDirections(response);

              var route = response.routes[0];
              for (var i = 0; i < route.legs.length; i++) {
                // calculating total distance and duration
                totalDistance += route.legs[i].distance.value;
                totalDuration += route.legs[i].duration.value;
              }

              totalDistance = totalDistance/1609.34; // convert from meters (default) to miles
              totalDistance = totalDistance.toFixed(1); // 1 decimal places
              totalDuration = totalDuration/60; // convert from seconds to minutes
              totalDuration = totalDuration.toFixed(1); // 1 decimal places
              document.getElementById('total-distance').innerHTML = 'Total Distance: ' + totalDistance + ' mi.';
              document.getElementById('total-duration').innerHTML = 'Total Duration: ' + totalDuration + ' mins';
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          });
        } else { // list view without starting from curr location or create page for single location
          directionsDisplay.setMap(null);
          totalDistance = 0;
          totalDuration = 0;
          document.getElementById('total-distance').innerHTML = '';
          document.getElementById('total-duration').innerHTML = '';
        }
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  } else { // if more than 1 waypoint, display markers, path, total duration, total distance and directions
    deleteMarkers();
    directionsDisplay.setMap(map);
    for (var i = 0; i < waypts.length; i++) {
      waypts[i].stopover = true;
    }
    waypts.slice(-1)[0].stopover = false;

    var startingPoint = null;
    if (window.location.pathname == '/create' || window.location.pathname.indexOf('/edit/') == 0) {
      waypts[0].stopover = false;
      startingPoint = waypts[0].location;
    } else {
      if (!(document.getElementById('curr-location').checked)) {
        waypts[0].stopover = false;
        startingPoint = waypts[0].location;
      } else {
        startingPoint = currPos;
      }
    }

    directionsService.route({
      origin: startingPoint,
      destination: waypts.slice(-1)[0].location,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        var route = response.routes[0];
        // create page -- no check box option
        if (window.location.pathname == '/create' || window.location.pathname.indexOf('/edit/') == 0) {
          for (var i = 0; i < route.legs.length; i++) {
            //var icon = "https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=" + i + "|FCB131|FFFFFF";
            /*if (i == 0) {
                icon = "https://chart.googleapis.com/chart?chst=d_map_xpin_icon&chld=pin_star|car-dealer|00FFFF|FF0000";
            }*/
            var marker = new google.maps.Marker({
              position: route.legs[i].start_location,
              map: map,
              label: labels[labelIndex++ % labels.length]
            });
            var html = "<b>" + namesArray[i] + "</b> <br/>" + route.legs[i].start_address;
            attachText(marker, html);
            markers.push(marker);

            // calculating total distance and duration
            totalDistance += route.legs[i].distance.value;
            totalDuration += route.legs[i].duration.value;
          }
          var marker = new google.maps.Marker({
            position: route.legs[i - 1].end_location,
            map: map,
            label: labels[labelIndex++ % labels.length]
          });
          markers.push(marker);
          var html = "<b>" + namesArray[i] + "</b> <br/>" + route.legs[i - 1].end_address;
          attachText(marker, html);

          totalDistance = totalDistance/1609.34; // convert from meters (default) to miles
          totalDistance = totalDistance.toFixed(1); // 1 decimal places
          totalDuration = totalDuration/60; // convert from seconds to minutes
          totalDuration = totalDuration.toFixed(1); // 1 decimal places
          document.getElementById('total-distance').innerHTML = 'Total Distance: ' + totalDistance + ' mi.';
          document.getElementById('total-duration').innerHTML = 'Total Duration: ' + totalDuration + ' mins';
        } else {
          // list page -- checkbox to start from current location is checked
          if (document.getElementById('curr-location').checked) {
            for (var i = 1; i < route.legs.length; i++) {
              var marker = new google.maps.Marker({
                position: route.legs[i].start_location,
                map: map,
                label: labels[labelIndex++ % labels.length]
              });
              var html = "<b>" + namesArray[i - 1] + "</b> <br/>" + route.legs[i].start_address;
              attachText(marker, html);
              markers.push(marker);

              // calculating total distance and duration
              totalDistance += route.legs[i - 1].distance.value;
              totalDuration += route.legs[i - 1].duration.value;
            }
            var marker = new google.maps.Marker({
              position: route.legs[i - 1].end_location,
              map: map,
              label: labels[labelIndex++ % labels.length]
            });
            markers.push(marker);
            var html = "<b>" + namesArray[i - 1] + "</b> <br/>" + route.legs[i - 1].end_address;
            attachText(marker, html);

            totalDistance += route.legs[i - 1].distance.value;
            totalDuration += route.legs[i - 1].duration.value;
            totalDistance = totalDistance/1609.34; // convert from meters (default) to miles
            totalDistance = totalDistance.toFixed(1); // 1 decimal places
            totalDuration = totalDuration/60; // convert from seconds to minutes
            totalDuration = totalDuration.toFixed(1); // 1 decimal places
            document.getElementById('total-distance').innerHTML = 'Total Distance: ' + totalDistance + ' mi.';
            document.getElementById('total-duration').innerHTML = 'Total Duration: ' + totalDuration + ' mins';
          } else { // list view -- checkbox not checked (display normally)
            for (var i = 0; i < route.legs.length; i++) {
              var marker = new google.maps.Marker({
                position: route.legs[i].start_location,
                map: map,
                label: labels[labelIndex++ % labels.length]
              });
              var html = "<b>" + namesArray[i] + "</b> <br/>" + route.legs[i].start_address;
              attachText(marker, html);
              markers.push(marker);

              // calculating total distance and duration
              totalDistance += route.legs[i].distance.value;
              totalDuration += route.legs[i].duration.value;
            }
            var marker = new google.maps.Marker({
              position: route.legs[i - 1].end_location,
              map: map,
              label: labels[labelIndex++ % labels.length]
            });
            markers.push(marker);
            var html = "<b>" + namesArray[i] + "</b> <br/>" + route.legs[i - 1].end_address;
            attachText(marker, html);

            totalDistance = totalDistance/1609.34; // convert from meters (default) to miles
            totalDistance = totalDistance.toFixed(1); // 1 decimal places
            totalDuration = totalDuration/60; // convert from seconds to minutes
            totalDuration = totalDuration.toFixed(1); // 1 decimal places
            document.getElementById('total-distance').innerHTML = 'Total Distance: ' + totalDistance + ' mi.';
            document.getElementById('total-duration').innerHTML = 'Total Duration: ' + totalDuration + ' mins';
          }
        }
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
}