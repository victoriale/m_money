Template.map_marker.onRendered(function(){
  //We use Tracker to re-render map
  //when a new marker is added
  Tracker.autorun(function(){
    initializeMap();
  })
})

//Global Function to initialize the map
initializeMap = function() {
  //Global Variables

  var marker2,markers = [],markerCords = Markers.find({},{fields:{lat:1,lng:1}}).fetch();
  console.log(markerCords)
  //Map options
  var mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(41.8781136, -87.6297982),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(
    document.getElementById('map'),
    mapOptions
  );
  //Event to insert map on the "click" event
  google.maps.event.addListener(map, 'click', function(event,template) {
    var myLatLng = event.latLng,
    lat = myLatLng.lat(),
    lng = myLatLng.lng();
    Markers.insert({lat:lat,lng:lng},function(err,result){
      if(!err){
        console.log(result)
      }
    })
  });
}

Template.map_marker.events({
  'click .map-box6': function() {
    var url = 'http://d5u4si4z0f8i6.cloudfront.net/reviews/4936468/thumb_275.jpg';
    $('.map-image').css('background-image', 'url(http://d5u4si4z0f8i6.cloudfront.net/reviews/4936468/thumb_275.jpg)');
    $("#map").css('display', 'none');
  },
 'click .map-box5': function() {
   var url = 'http://www.saporitrattoria.net/upload/gallery/Milk-and-Honey-Ribs.jpg';
   $('.map-image').css('background-image', 'url(http://www.saporitrattoria.net/upload/gallery/Milk-and-Honey-Ribs.jpg)');
   $("#map").css('display', 'none');
 },
 'click .map-box4': function() {
   var url = 'http://www.opentable.com/img/restimages/2159.jpg';
   $('.map-image').css('background-image', 'url(http://www.opentable.com/img/restimages/2159.jpg)');
   $("#map").css('display', 'none');
 },
 'click .map-box3': function() {
   var url = 'http://trattoriasapori.co.uk/images/reservations.jpg';
   $('.map-image').css('background-image', 'url(http://trattoriasapori.co.uk/images/reservations.jpg)');
   $("#map").css('display', 'none');
 },
 'click .map-imgtext':function(){
   var id= 'map';
   $('.map-gmaps').css("display","block");

 }
 })

//$host_period = $_POST['dropdown'];
