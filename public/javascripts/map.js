var map, infoWindow, currPos, currPosMarker, waypts, wayptsList, cols, place, geocoder, markers, namesArray;
var labelIndex = 0;
// var isDuplicate = false;

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
/*
  // Create the search box and link it to the UI element.
  var searchInput = document.getElementById('location-search-box');
  var searchBox = new google.maps.places.SearchBox(searchInput);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchInput);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
    });
*/
  waypts = [];
  initWaypoints(waypts);
  // waypts = [];
  // wayptsList = document.getElementById('waypoints');
  // var places = wayptsList.getElementsByTagName('li');
  // for (var i = 0; i < places.length; i++) {
  //   waypts.push({
  //     placeId: places[i].getAttribute('name'),
  //     location: places[i].getAttribute('data-value'),
  //     stopover: true
  //   });
  // }

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
    if (window.location.pathname == '/create') {
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

  document.getElementById('add-waypoint-btn').addEventListener('click', function() {
    addWaypoint(waypts);
  });

    // document.getElementById('submit').addEventListener('click', function() {
    //     currPosMarker.setVisible(false);
    //     infoWindow.close();
    //     currPosMarker.open = true;
    //
    //     calculateAndDisplayRoute(directionsService, directionsDisplay, currPos, waypts);
    // });

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

function addWaypoint(waypts) {
  waypts = [];
  wayptsList = document.getElementById('waypoints');
  var places = wayptsList.getElementsByTagName('li');
  namesArray = [];
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
    // isDuplicate = false;
    // waypts.filter(function(loc) {
    //   isDuplicate = loc.location == document.getElementById('new-waypoint').value;
    // });

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
  }
}

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

function mapWaypoints(directionsService, directionsDisplay, waypts) {
  waypts = [];
  wayptsList = document.getElementById('waypoints');
  var places = wayptsList.getElementsByTagName('li');
  namesArray = [];
  for (var i = 0; i < places.length; i++) {
    waypts.push({
      location: places[i].getAttribute('data-value'),
      stopover: true
    });
    namesArray.push(places[i].getAttribute('name'));
  }

  if (window.location.pathname == '/create') {
    document.getElementById('waypoints-error').innerHTML = '';
  }

  if (waypts.length == 0) {
    deleteMarkers();
    document.getElementById('directions-panel').innerHTML = '';
    directionsDisplay.setMap(null);
  } else if (waypts.length == 1) {
    deleteMarkers();
    document.getElementById('directions-panel').innerHTML = '';
    var onePointLocation = waypts[0].location;
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
        directionsDisplay.setMap(null);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  } else {
    deleteMarkers();
    directionsDisplay.setMap(map);
    for (var i = 0; i < waypts.length; i++) {
      waypts[i].stopover = true;
    }
    waypts.slice(-1)[0].stopover = false;

    var startingPoint = null;
    if (window.location.pathname == '/create') {
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
        if (window.location.pathname == '/create') {
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
            //attachText(marker, route.legs[i].start_address);
            var html = "<b>" + namesArray[i] + "</b> <br/>" + route.legs[i].start_address;
            attachText(marker, html);
            markers.push(marker);
          }
          var marker = new google.maps.Marker({
            position: route.legs[i - 1].end_location,
            map: map,
            label: labels[labelIndex++ % labels.length]
            //icon: "https://chart.googleapis.com/chart?chst=d_map_pin_icon&chld=flag|ADDE63"
          });
          markers.push(marker);
          var html = "<b>" + namesArray[i] + "</b> <br/>" + route.legs[i - 1].end_address;
          attachText(marker, html);
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
            }
            var marker = new google.maps.Marker({
              position: route.legs[i - 1].end_location,
              map: map,
              label: labels[labelIndex++ % labels.length]
            });
            markers.push(marker);
            var html = "<b>" + namesArray[i - 1] + "</b> <br/>" + route.legs[i - 1].end_address;
            attachText(marker, html);
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
            }
            var marker = new google.maps.Marker({
              position: route.legs[i - 1].end_location,
              map: map,
              label: labels[labelIndex++ % labels.length]
            });
            markers.push(marker);
            var html = "<b>" + namesArray[i] + "</b> <br/>" + route.legs[i - 1].end_address;
            attachText(marker, html);
          }
        }
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, pos, waypts) {
  waypts = [];
  wayptsList = document.getElementById('waypoints');
  var places = wayptsList.getElementsByTagName('li');
  for (var i = 0; i < places.length; i++) {
    waypts.push({
      location: places[i].getAttribute('data-value'),
      stopover: true
    });
  }

  /* var waypts = [];
    var checkboxArray = document.getElementById('waypoints');
    var places = checkboxArray.getElementsByTagName('li');
    for (var i = 0; i < places.length; i++) {
        waypts.push({
            location: places[i].getAttribute('data-value'),
            stopover: true
        });
    }*/

  /*for (var i = 0; i < checkboxArray.length; i++) {
    //if (checkboxArray.options[i].selected) {
        waypts.push({
              location: checkboxArray[i].value,
              stopover: true
          });
     // }
  }*/

  for (var i = 0; i < waypts.length; i++) {
    waypts[i].stopover = true;
  }

  waypts.slice(-1)[0].stopover = false;

  /*var markerArray = [];

  for (i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(null);
  }

  markerArray = [];*/

  directionsService.route({
    origin: currPos,
    destination: waypts.slice(-1)[0].location,
    waypoints: waypts,
    optimizeWaypoints: true,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      /*var route = response.routes[0];
              var summaryPanel = document.getElementById('directions-panel');
              summaryPanel.innerHTML = '';
              // For each route, display summary information.
              for (var i = 0; i < route.legs.length; i++) {
                var routeSegment = i + 1;
                if (route.legs[i].start_address == route.legs[i].end_address) {
                    break;
                }
                summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
                    '</b><br>';
                summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
            }*/
      /*var route = response.routes[0];
            for (var i = 0; i < route.legs.length; i++) {
                var icon = "https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=" + i + "|FCB131|FFFFFF";
                if (i == 0) {
                    icon = "https://chart.googleapis.com/chart?chst=d_map_xpin_icon&chld=pin_star|car-dealer|00FFFF|FF0000";
                }
                var marker = new google.maps.Marker({
                    position: route.legs[i].start_location,
                    map: map,
                    icon: icon
                });
                attachText(marker, route.legs[i].start_address);
                markerArray.push(marker);
            }
            var marker = new google.maps.Marker({
                position: route.legs[i - 1].end_location,
                map: map,
                icon: "https://chart.googleapis.com/chart?chst=d_map_pin_icon&chld=flag|ADDE63"
            });
            markerArray.push(marker);
            attachText(marker, route.legs[i-1].end_address);

            google.maps.event.trigger(markerArray[0], "click");*/
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

// var dragSrcEl = null;
// var srcIndex = -1;
// var index = -1;
//
// function handleDragStart(e) {
//     // Target (this) element is the source node.
//     //this.style.opacity = '0.4';
//
//     dragSrcEl = this;
//     for (var i = 0; i < waypts.length; i++) {
//      if (waypts[i].location == this.getAttribute('data-value')) {
//          srcIndex = i;
//          break;
//      }
//     }
//
//     e.dataTransfer.effectAllowed = 'move';
//     e.dataTransfer.setData('text/html', this.innerHTML);
//     e.dataTransfer.setData('text/plain', this.getAttribute('data-value'));
// }
//
// function handleDragOver(e) {
//     if (e.preventDefault) {
//         e.preventDefault(); // Necessary. Allows us to drop.
//     }
//
//     e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
//
//     return false;
// }
//
// function handleDragEnter(e) {
//     // this / e.target is the current hover target.
//     this.classList.add('over');
// }
//
// function handleDragLeave(e) {
//     this.classList.remove('over');  // this / e.target is previous target element.
// }
//
// function handleDrop(e) {
//     // this/e.target is current target element.
//
//     if (e.stopPropagation) {
//         e.stopPropagation(); // Stops some browsers from redirecting.
//     }
//
//     // Don't do anything if dropping the same column we're dragging.
//     if (dragSrcEl != this) {
//         // Set the source column's HTML to the HTML of the column we dropped on.
//         dragSrcEl.innerHTML = this.innerHTML;
//
//         for (var i = 0; i < waypts.length; i++) {
//          if (waypts[i].location == this.getAttribute('data-value')) {
//              index = i;
//              break;
//          }
//         }
//         waypts[srcIndex].location = this.getAttribute('data-value');
//         waypts[index].location = dragSrcEl.getAttribute('data-value');
//
//         dragSrcEl.setAttribute('data-value', this.getAttribute('data-value'));
//         this.innerHTML = e.dataTransfer.getData('text/html');
//         this.setAttribute('data-value', e.dataTransfer.getData('text/plain'));
//     }
//
//     return false;
// }
//
// function handleDragEnd(e) {
//     // this/e.target is the source node.
//
//     [].forEach.call(cols, function (col) {
//         col.classList.remove('over');
//     });
// }

/*var cols = document.querySelectorAll('.points');
[].forEach.call(cols, function (col) {
    col.addEventListener('dragstart', handleDragStart, false);
    col.addEventListener('dragenter', handleDragEnter, false)
    col.addEventListener('dragover', handleDragOver, false);
    col.addEventListener('dragleave', handleDragLeave, false);
    col.addEventListener('drop', handleDrop, false);
    col.addEventListener('dragend', handleDragEnd, false);
});*/
