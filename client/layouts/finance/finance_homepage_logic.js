function ExecSearch() {
  var LocationText = $('.fi_mainsearch input')[0].value;
  if ( LocationText.match(/^[^\,]*\,[^\,]*$/) ) {
    LocationText = LocationText.split(',');
    LocationText[0] = LocationText[0].trim();
    LocationText[1] = LocationText[1].trim();
    LocationText[0] = LocationText[0].replace(/.+?[\.\?\!](\s|$)/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    LocationText[1] = LocationText[1].toUpperCase();
    if ( LocationText[1].length != 2 ) {
      console.log("Incorrect state length");
      return;
    }
    var location_id = LocationText[0] + "_" + LocationText[1];
  } else {
    return;
  }
  window.location.href = LocationURL(location_id);
  // Router.go('content.finance.location',{location_id: location_id});
  // $('.fi_mainsearch input')[0].value = "";
}

function GetSuggest(nowTime) {
  var searchString = $('.fi_mainsearch input')[0].value;
  if ( searchString == "" ) {
    $('.fi_search_recommendations').removeClass('active');
  } else {
    /*
    var HTMLString = '';
    var data = [{city:'Wichita', state:'KS'}, {city:'Derby', state:'KS'}, {city: 'Andover', state: 'KS'}];
    for ( var index = 0; index < data.length; index++ ) {
      if ( index < 10 ) {
        if ( index != 0 ) {
          HTMLString = HTMLString + '<div class="border-li"></div>';
        }
        HTMLString = HTMLString + '<a style="color: #000" href=""><div class="fi_search_recommendations_item">' + data[index].city + ", " + data[index].state + '<i class="fa fa-angle-right"></i></div></a>';
      }
    }
    $('.fi_search_recommendations')[0].innerHTML = HTMLString;
    $('.fi_search_recommendations').addClass('active');*/


     Meteor.call('GetSuggestion',encodeURIComponent(searchString),nowTime,function(error, data){
       if ( error ) {
         console.log('Suggestion Error',error);
         return false;
       }

       if ( Session.get('SuggestTime') > data.time ) {
         return false;
       }

       Session.set('SuggestTime',data.time);
       console.log(data);
       data = data.data;

       if ( data.length == 0 ) {
         $('.fi_search_recommendations').removeClass('active');
         return false;
       }
       //var HTMLString = '<div class="caret-top"></div><i class="fa fa-times fi_search_recommendations_close"></i>';
       var HTMLString = '';
       for ( var index = 0; index < data.length; index++ ) {
         if ( index < 10 ) {
           if ( index != 0 ) {
             HTMLString = HTMLString + '<div class="border-li"></div>';
           }
           HTMLString = HTMLString + '<a style="color: #000" href="' + LocationURL(data[index].city + "_" + data[index].state) + '"><div class="fi_search_recommendations_item">' + data[index].city + ", " + data[index].state + '<i class="fa fa-angle-right"></i></div></a>';
         }
       }
       $('.fi_search_recommendations')[0].innerHTML = HTMLString;
       $('.fi_search_recommendations').addClass('active');
     });
  }
}

Template.finance_homepage.events({
  'keyup .fi_mainsearch input': function(event) {

    if($('.fi_mainsearch input')[0].value == "" || $('.fi_mainsearch input')[0].value == undefined)
    {
      $('.fi_searchbtn').css("background-color", "rgb(48, 152, 255)");
      $(".fi_mainsearch").removeClass("boxhighlight-black");
      $(".fi_mainsearch").addClass("boxhighlight");
    }
    if ( event.which === 13 ) {
      event.preventDefault();
        //ExecSearch();
      Finance_Search($('.fi_mainsearch input')[0].value);
      return "";
    }
    if ( typeof StartTime == "undefined" ) {
      StartTime = 0;
    }
    var d = new Date();
    d = d.getTime();
    curTime = d;
    if ( d - StartTime < 250 ) {
      setTimeout(function(curTime){GetSuggest(curTime);},250,curTime);
      return "";
    }
    StartTime = d;
    GetSuggest(curTime);
  },

  'click .fi_search_recommendations_item': function(event) {
    $('.fi_mainsearch input')[0].value = $(event.target)[0].innerHTML.replace('<i class="fa fa-angle-right"></i>', '');
    $('.fi_search_recommendations').removeClass('active');
    $('.fi_searchbtn').css("background-color", "black");
    $(".fi_mainsearch").addClass("boxhighlight-black");
     Search($('.fi_mainsearch input')[0].value);
  },

  'click .fi_search_recommendations_close': function() {
    $('.fi_search_recommendations').removeClass('active');
    return false;
  },

  'click .fi_searchbtn.fa-search': function() {
     Finance_Search($('.fi_mainsearch input')[0].value);
  },

  'mousedown .fi_searchbtn': function(){
    $('.fi_searchbtn').css("background-color", "black");
    $(".fi_mainsearch").addClass("boxhighlight-black");
  },

  'mouseup .fi_searchbtn': function(){
    $('.fi_searchbtn').css("background-color", "#3098ff");
    $(".fi_mainsearch").removeClass("boxhighlight-black");
  },

  'focus .fi_mainsearch-text': function(){
    $(".fi_mainsearch").addClass("boxhighlight");
  },
  'focusout .fi_mainsearch-text' : function(){
    $(".fi_mainsearch").removeClass("boxhighlight");
  }
});

Template.finance_homepage.onCreated(function() {
   Session.set('SuggestTime',0);

   Meteor.http.get('http://apireal.synapsys.us/listhuv/?action=get_remote_addr', function(error, data){
     //console.log(data);

     var getLoc = data.data.loc;
     for(obj in getLoc){
       //console.log(obj);
       obj = obj.split(', ');
       var state = [obj[obj.length-1]];
     }
     Session.set('home_state',state);
     //console.log(state);
   });
});

Template.finance_homepage.onRendered(function(){
  //$('.finance_body_faq').css('display','none');

  //images for features boxes
  $("#feature1").css({"background-image":"URL(http://cdn.joyfulhome.com/Image_Interactive_Map.png)","float":"left"});
  $("#feature2").css({"background-color":"#000000","float":"left"});
  $("#feature3").css({"background-image":"URL(http://cdn.joyfulhome.com/Image_Trending_News.png)","float":"right"});
  $("#feature4").css({"background-image":"URL(http://cdn.joyfulhome.com/Image_Top_100_List.png)","float":"right"});

  $(".fi_explore-blue").css({"background-image":"URL(http://cdn.joyfulhome.com/Icons_Explore.png)"});
  $(".fi_features_note-blue").css({"background-image":"URL(http://cdn.joyfulhome.com/Icons_Features.png)"});
});

Template.finance_homepage.helpers({


  Cities: function() {
    var state = homestates();

    var randomState = [];
    for(i = 0; i < 6; i++){
      var x = Math.floor((Math.random() * 50));
      randomState[i] = state[x];
      var curLoc = state.indexOf(Session.get('home_state'));
      //remove the current home location gotten from removeaddr api
      if(typeof curLoc != 'undefined'){
        if (curLoc > -1) {
          state.splice(curLoc, 1);
        }
      }
      //remove the random states that were randomized and chosen so that it doesnt pop into the array again
      var index = state.indexOf(state[x]);
      if (index > -1) {
        state.splice(index, 1);
      }
    }
    var image = randomimage();
    var x = Math.floor(Math.random()*5);
    //plug in the data
    Cities = [
      {URL: Router.path('content.locationprofile',{loc_id:Session.get('home_state')}), class: "fi_explore-image1",id: "explore1", State: fullstate(Session.get('home_state')), txt: '', index: 0, image: image[x]},
      {URL: Router.path('content.locationprofile',{loc_id:randomState[1]}), class: "fi_explore-image2",id: "explore2", State: fullstate(randomState[1]), txt: '', index: 1, image: image[x+1]},
      {URL: Router.path('content.locationprofile',{loc_id:Session.get('home_state')}), class: "fi_explore-image3",id: "explore3", isString: true, GeoLocation: '', txt: 'Check out the public companies in ' + fullstate(Session.get('home_state')), image: ''},
      {URL: Router.path('content.locationprofile',{loc_id:randomState[2]}), class: "fi_explore-image1",id: "explore4", State: fullstate(randomState[2]), txt: '', index: 2, image: image[x+2]},
      {URL: Router.path('content.locationprofile',{loc_id:randomState[3]}), class: "fi_explore-image1",id: "explore5", State: fullstate(randomState[3]), txt: '', index: 3, image: image[x+3]},
      {URL: Router.path('content.locationprofile',{loc_id:randomState[4]}), class: "fi_explore-image2",id: "explore6", State: fullstate(randomState[4]), txt: '', index: 4, image: image[x+4]}
    ];
    console.log(Cities);
    return Cities;
  }
});

function homestates(){
  var stateName = [
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DC',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'ON',
    'OR',
    'PA',
    'PR',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY'
  ];
  return stateName;
}
//store few images for randomization on home page Exlore area
function randomimage(){
  var image_array = [
    '/homepage_images/img1.png',
    '/homepage_images/img2.png',
    '/homepage_images/img3.png',
    '/homepage_images/img4.png',
    '/homepage_images/img5.png',
    '/homepage_images/img6.png',
    '/homepage_images/img7.png',
    '/homepage_images/img8.png',
    '/homepage_images/img9.png',
    '/homepage_images/img10.png'
];
return image_array;
}
