// This example displays a marker at the center of Australia.
// When the user clicks the marker, an info window opens.

var infowindow = [];
var marker = [];
var marker_score = [];
var contentString = [];

var circles = {};
var cityCircle;

function initialize() {
  /**
   * Data for the markers consisting of a name, a LatLng and a zIndex for
   * the order in which these markers should display on top of each
   * other.
   * The fifth entry is its score.
   */

