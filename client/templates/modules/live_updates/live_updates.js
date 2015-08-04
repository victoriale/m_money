/*Author: [Naveen]
Created: [7/23/2015]
Description: [ This file includes js script for module live-updates along with comments (File name: lives_updates.less)]
Associated Files: [The modules.less, live_updates.html for the module]*/

// var counter=0;
// var counter2=0;

function GetURL(){
  var data = Session.get("profile_header");
  if (data == 'undefined'){
    return "";
  }
  urlString = "http://api.synapsys.us/listhuv/?action=live_updates&city=" + data['city'] + "&state=" + data['state'];
  return urlString;
}

Template.live_updates.onRendered(function(){
  var location = Session.get("profile_header");
  if (location == 'undefined'){
    return "";
  }
  Meteor.http.get("http://api.synapsys.us/listhuv/?action=live_updates&city="+location['city']+"&state="+location['state'], function(error, result){
    if(error){
      console.log("live_updates call FAILED");
    }
    else {
      data = result['data'];
      Session.set("live_updates",data);
    }
    $('.picture0').css("background-image", "url("+data[0]['photos'][0]+")");
    $('.picture1').css("background-image", "url("+data[1]['photos'][0]+")");
    $('.picture2').css("background-image", "url("+data[2]['photos'][0]+")");
  });
});

Template.live_updates.helpers({
  // ListingURL: function() {
  //   //var data = HTTP.call("GET",urlString);
  //   var data = Session.get("live_updates");
  //   if ( typeof data != 'undefined' ) {
  //     return ListingURL(data['listing_key']);
  //   }
  // },

  ListingList: function() {
    //var data = HTTP.call("GET",GetURL());
    var data = Session.get("live_updates");
    if ( typeof data == "undefined" ) {
      return "";
    }
    var ReturnData = new Array();
    for ( var index = 0; index < 3/*data.length*/; index++ ) {
      var LocalData = new Object();
      var ListData = data[index];
      //LocalData['url'] = ListingURL(ListData['listing_key']);
      //LocalData['photo'] = ListData['photos'][0];
      LocalData['address'] = ListData['street_address'];
      LocalData['date'] = ListData['timestamp'];
      LocalData['price'] = NumberToCommaNumber(ListData['list_price']);
      LocalData['bed'] = ListData['features']['rooms']['Bedroom'];
      LocalData['bath'] = ListData['features']['rooms']['Full Bath'];
      LocalData['sq'] = NumberToCommaNumber(ListData['living_area']);
      LocalData['city'] = ListData['city'];
      LocalData['state'] = ListData['state'];
      LocalData['updated'] = DaysSinceDate(ListData['timestamp']);
      LocalData['counter_no'] = "picture"+index;
      ReturnData[index] = LocalData;
    }
    return ReturnData;
  },
  // counter_no: function()
  // {
  //   counter2+=1;
  //   return "picture"+counter2;
  // },//calling tile from api
  // count_inc: function()
  // {
  //   counter=counter+1;
  //   if(counter>2)
  //   counter=0;
  // },

  //block:[/*contains a data for object */
  //
  //   {title:'7033 N Kedzie Ave #806',went:'went on market May 5,2015,',withh:'with an asking price of',price:'$124,900.',bed:' 2 Bed ',red:'',bath:' 2 Bath ',sq:' 1500 sq ft ',chic:'chicago,IL',updated:'updated 2 seconds ago'},
  //   {title:'3314 W Sunnyside Ave #3',went:'went on market May 10,2015,',withh:'with an asking price of',price: '$175,000.' ,bed:' 2 Bed ',red:'',bath:'1 Bath',sq:' 1000 sq ft ',chic:'chicago, IL',updated:'updated 10 seconds ago'},
  //   {title:'2614 N Clybourn Ave #402',went:'went on market May 8,2015,',withh:'with an asking price of',price: '$325,000.' ,bed:' 2 Bed ',red:'',bath:'2 Bath',sq:' n/a sq ft ',chic:'chicago, IL',updated:'updated 15 seconds ago'}
  // ],
  dotted:[ /*contains a data for dottted object */
    {circle:' fa-circle'},
    {circle:' fa-circle'},
    {circle:' fa-circle'},
  ]

});
