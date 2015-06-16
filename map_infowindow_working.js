// This example displays a marker at the center of Australia.
// When the user clicks the marker, an info window opens.

var infowindow = [];
var marker = [];
var contentString = [];

function initialize() {
  /**
   * Data for the markers consisting of a name, a LatLng and a zIndex for
   * the order in which these markers should display on top of each
   * other.
   */
  var beaches = [
    ['Outer Banks', 35.3736, -75.4953, 1],
    ['Myrtle Beach', 33.7167, -78.8833, 2],
    ['Wilmington Beach', 34.0189, -77.8986, 3],
    ['Bald Head Island', 33.8619, -77.9900, 4],
    ['Kiawah Island', 32.6086, -80.0817, 5]
  ];

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

  var contentString_temp = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Outer Banks</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'http://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
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
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'http://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
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
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'http://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';
  contentString.push(contentString_temp);

  var contentString_temp = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Bald Head Island</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Bald Head Island</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'http://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';
  contentString.push(contentString_temp);

  var contentString_temp = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Kiawah Island</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Kiawah Island</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'http://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';
  contentString.push(contentString_temp);

  /*
  for (var i = 0; i < 2; i++) {
      contentString[i]=contentString_temp;

      var infowindow_temp = new google.maps.InfoWindow({
          content: contentString[i],
          maxWidth: 300
      });

      var beach = locations[i];
      var myLatLng = new google.maps.LatLng(beach[1], beach[2]);
      console.log(myLatLng)
      var marker_temp = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: beach[0]
      });

      infowindow.push(infowindow_temp);
      marker.push(marker_temp)

      google.maps.event.addListener(marker[i], 'click', function() {
        infowindow[i].open(map,marker[i]);
      });
  }
  */

  
  
  var infowindow_temp = new google.maps.InfoWindow({
      content: contentString[0],
      maxWidth: 300
  });

  var beach = beaches[0];
  var myLatLng = new google.maps.LatLng(beach[1], beach[2]);
  console.log(myLatLng)
  var marker_temp = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: beach[0]
  });

  infowindow.push(infowindow_temp);
  marker.push(marker_temp)

  google.maps.event.addListener(marker[0], 'click', function() {
    infowindow[0].open(map,marker[0]);
  });
  

  var infowindow_temp = new google.maps.InfoWindow({
      content: contentString[1],
      maxWidth: 300
  });

  var beach = beaches[1];
  var myLatLng = new google.maps.LatLng(beach[1], beach[2]);
  console.log(myLatLng)
  var marker_temp = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: beach[0]
  });
  
  infowindow.push(infowindow_temp);
  marker.push(marker_temp)

  google.maps.event.addListener(marker[1], 'click', function() {
    infowindow[1].open(map,marker[1]);
  });
  
  
  var infowindow_temp = new google.maps.InfoWindow({
      content: contentString[2],
      maxWidth: 300
  });

  var beach = beaches[2];
  var myLatLng = new google.maps.LatLng(beach[1], beach[2]);
  console.log(myLatLng)
  var marker_temp = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: beach[0]
  });
  
  infowindow.push(infowindow_temp);
  marker.push(marker_temp)

  google.maps.event.addListener(marker[2], 'click', function() {
    infowindow[2].open(map,marker[2]);
  });


  var infowindow_temp = new google.maps.InfoWindow({
      content: contentString[3],
      maxWidth: 300
  });

  var beach = beaches[3];
  var myLatLng = new google.maps.LatLng(beach[1], beach[2]);
  console.log(myLatLng)
  var marker_temp = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: beach[0]
  });
  
  infowindow.push(infowindow_temp);
  marker.push(marker_temp)

  google.maps.event.addListener(marker[3], 'click', function() {
    infowindow[3].open(map,marker[3]);
  });


  var infowindow_temp = new google.maps.InfoWindow({
      content: contentString[4],
      maxWidth: 300
  });

  var beach = beaches[4];
  var myLatLng = new google.maps.LatLng(beach[1], beach[2]);
  console.log(myLatLng)
  var marker_temp = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: beach[0]
  });
  
  infowindow.push(infowindow_temp);
  marker.push(marker_temp)

  google.maps.event.addListener(marker[4], 'click', function() {
    infowindow[4].open(map,marker[4]);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);