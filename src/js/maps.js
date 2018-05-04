function initMap() {
  var uluru = {lat: 30.246839, lng: -97.757901};
  var styledMapType = new google.maps.StyledMapType(
    [
      {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
          {
            "lightness": "42"
          },
          {
            "visibility": "on"
          },
          {
            "hue": "#ff0000"
          },
          {
            "saturation": "-100"
          },
          {
            "gamma": "0.78"
          },
          {
            "weight": "0.37"
          },
          {
            "invert_lightness": true
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#444444"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
          {
            "color": "#f2f2f2"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
          {
            "saturation": -100
          },
          {
            "lightness": 45
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
          {
            "color": "#3ec7c9"
          },
          {
            "visibility": "on"
          }
        ]
      }
    ]
    ,
    {name: 'Styled Map'});
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: uluru
  });
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}
