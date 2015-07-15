var listings_home_global=[]; /*Declared a global variable */
var listings_home_counter=0;/*Declared a global counter for counter */
var listings_global=[]/*Declared a global variable (second one) */
var listings_counter=0;/*Declared a global variable (second counter)*/

listings_home_global[0]=500;
listings_global[0]=500;

Template.latest_homes.onRendered(function(){
   /*gets the data of latest_homes from API when onrendered */
    var data= Session.get("latest_homes");
})

Template.latest_homes.events({
  'click #lh_button': function(){
    $('#lh_height').css("height: auto !important");
    console.log('click');
  }
})
Template.latest_homes.helpers({
  List: function(){
    data_array = Session.get('latest_homes');
    if(typeof data_array == 'undefined'){
      return '';
    }
    data_array.map(function(item, index){
      var x = Math.floor((Math.random() * 4) + 1);
      var random = randomimage();
      item['day'] = givesdate(item['listing_date_ut']);
      item['month'] = givesmonth(item['listing_date_ut']);
      item['stockimage'] = random[x];
      return item;
    })
    return data_array;
  },
  location: function(){
    data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    return data['city'] + ', ' + data['state'];
  },
})

/*created a function to return date and time and used same code of this for rest of unix_monthi*/

  function givesdate(UNIX_timestamp){
  var a = new Date(UNIX_timestamp*1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var months_num = ['1','2','3','4','5','6','7','8','9','10','11','12'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var month_no = months_num[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
return date;
  }
/*created a function to return month and time and used same code of this for rest of unix_monthi*/
  function givesmonth(UNIX_timestamp){
  var a = new Date(UNIX_timestamp*1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var months_num = ['1','2','3','4','5','6','7','8','9','10','11','12'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var month_no = months_num[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
return month;
}

function randomimage(){

  var image_array = new Object();
  image_array['1'] = '/myframeSmall.png';
  image_array['2'] = '/Image_Top_100_List.png';
  image_array['3'] = '/Image_Wicker_Park.png';
  image_array['4'] = '/Image_Trending_News.png';
  return image_array;
}
