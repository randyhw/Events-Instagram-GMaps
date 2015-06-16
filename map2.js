
/*
   
  var beaches = [
    ['Outer Banks', 35.3736, -75.4953, 1, 95],
    ['Myrtle Beach', 33.7167, -78.8833, 2, 70],
    ['Wilmington Beach', 34.0189, -77.8986, 3, 65]
  ];

  var contentString_temp = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Outer Banks</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia.</p>'+
      '</div>'+
      '</div>';
  contentString.push(contentString_temp);

  var contentString_temp = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Myrtle Beach</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Myrtle Beach</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia.</p>'+
      '</div>'+
      '</div>';
  contentString.push(contentString_temp);

  var contentString_temp = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Wilmington Beach</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Wilmington Beach</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia.</p>'+
      '</div>'+
      '</div>';
  contentString.push(contentString_temp);*/
  
  // locations contain the name and coordinates of the attraction object.
  var locations = beaches;
  var Lat=0;
  var Lon=0;
  for (var i = 0; i < locations.length; i++) {
    var attraction = locations[i];
    Lat = Lat+attraction[1]/locations.length;
    Lon = Lon+attraction[2]/locations.length;

    console.log(i+": "+Lat+","+Lon);
  }
  
  var homeLatlng = new google.maps.LatLng(Lat, Lon);
  //var myLatlng1 = new google.maps.LatLng(-25.363882,131.044922);
  //var myLatlng2 = new google.maps.LatLng(-25.263882,132.144922);
  var mapOptions = {
    zoom: 8,
    center: homeLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var infowindow_temp = new google.maps.InfoWindow({
      content: contentString[0],
      maxWidth: 200
  });

  var beach = locations[0];
  var myLatLng = new google.maps.LatLng(beach[1], beach[2]);
  console.log(myLatLng)
  circles[beach[0]] = {
    center : new google.maps.LatLng(beach[1], beach[2]),
    score : beach[4]
  }
    var marker_temp = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: beach[0]
  });

  infowindow.push(infowindow_temp);
  marker.push(marker_temp);
  infowindow[0].open(map,marker[0]);

  var infowindow_temp = new google.maps.InfoWindow({
      content: contentString[1],
      maxWidth: 200
  });

  var beach = locations[1];
  var myLatLng = new google.maps.LatLng(beach[1], beach[2]);
  console.log(myLatLng);

  circles[beach[0]] = {
    center : new google.maps.LatLng(beach[1], beach[2]),
    score : beach[4]
  }

  var marker_temp = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: beach[0]
  });
  
  infowindow.push(infowindow_temp);
  marker.push(marker_temp);
  infowindow[1].open(map,marker[1]);

  /*google.maps.event.addListener(marker[1], 'click', function() {
    infowindow[1].open(map,marker[1]);
  });*/
  
  
  var infowindow_temp = new google.maps.InfoWindow({
      content: contentString[2],
      maxWidth: 200
  });

  var beach = locations[2];
  var myLatLng = new google.maps.LatLng(beach[1], beach[2]);
  console.log(myLatLng);

  circles[beach[0]] = {
    center : new google.maps.LatLng(beach[1], beach[2]),
    score : beach[4]
  }

  var marker_temp = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: beach[0]
  });
  
  infowindow.push(infowindow_temp);
  marker.push(marker_temp);
  infowindow[2].open(map,marker[2]);

  /*google.maps.event.addListener(marker[2], 'click', function() {
    infowindow[2].open(map,marker[2]);
  });*/


  for (var circle_n in circles) {
    var populationOptions = {
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.25,
      map: map,
      center: circles[circle_n].center,
      radius: circles[circle_n].score*300
    };
    // Add the circle for this city to the map.
    cityCircle = new google.maps.Circle(populationOptions);
  }
}

google.maps.event.addDomListener(window, 'load', initialize);
