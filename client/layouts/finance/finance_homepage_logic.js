sortSuggestions = function(data, search_string) {
  // Sort all the data into location, company, executive
  var results = {
    company: [],
    location: [],
    officer: [],
    ticker: [],
    states: []
  };
  var total_results = 0;

  if ( data.name.func_success == true ) {
    var name_data = data.name.func_data.search_data;
    // Remove bad tickers
    var badTicker = [
      'Nasdaq',
      'AMEX',
      'Nyse'
    ];
    for ( var i = 0; i < name_data.length; i++ ) {
      var isBad = false;
      for ( var t = 0; t < badTicker.length; t++ ) {
        if ( badTicker[t] == name_data[i].c_name ) {
          isBad = true;
        }
      }
      if ( isBad ) {
        name_data.splice(i,1);
      }
    }
    total_results = total_results + name_data.length;
    for ( var index = 0; index < name_data.length; index++ ) {
      results[name_data[index].name_type][results[name_data[index].name_type].length] = name_data[index];
    }
  }

  if ( data.ticker.func_success == true ) {
    var ticker_data = data.ticker.func_data.search_data;
    // Remove bad tickers
    var badTicker = [
      '.IXIC',
      '.XAX',
      '.NYA'
    ];
    for ( var i = 0; i < ticker_data.length; i++ ) {
      var isBad = false;
      for ( var t = 0; t < badTicker.length; t++ ) {
        if ( badTicker[t] == ticker_data[i].c_ticker ) {
          isBad = true;
        }
      }
      if ( isBad ) {
        ticker_data.splice(i,1);
      }
    }
    total_results = total_results + ticker_data.length;
    var max_index = ticker_data.length;
    if ( max_index > 10 ) {
      max_index = 10;
    }
    for ( var index = 0; index < max_index; index++ ) {
      results[ticker_data[index].name_type][results[ticker_data[index].name_type].length] = ticker_data[index];
    }
  }

  var states = [
    'AL',
    'Alabama',
    'AK',
    'Alaska',
    'AZ',
    'Arizona',
    'AR',
    'Arkansas',
    'CA',
    'California',
    'CO',
    'Colorado',
    'CT',
    'Connecticut',
    'DC',
    'District of Columbia',
    'DE',
    'Delaware',
    'FL',
    'Florida',
    'GA',
    'Georgia',
    'HI',
    'Hawaii',
    'ID',
    'Idaho',
    'IL',
    'Illinois',
    'IN',
    'Indiana',
    'IA',
    'Iowa',
    'KS',
    'Kansas',
    'KY',
    'Kentucky',
    'LA',
    'Lousiana',
    'ME',
    'Maine',
    'MD',
    'Maryland',
    'MA',
    'Massachusetts',
    'MI',
    'Michigan',
    'MN',
    'Minnesota',
    'MS',
    'Mississippi',
    'MO',
    'Missouri',
    'MT',
    'Montana',
    'NE',
    'Nebraska',
    'NV',
    'Nevada',
    'NH',
    'New Hampshire',
    'NJ',
    'New Jersey',
    'NM',
    'New Mexico',
    'NY',
    'New York',
    'NC',
    'North Carolina',
    'ND',
    'North Dakota',
    'OH',
    'Ohio',
    'OK',
    'Oklahoma',
    'ON',
    'Ontario',
    'OR',
    'Oregon',
    'PA',
    'Pennsylvania',
    'PR',
    'Puerto Rico',
    'RI',
    'Rhode Island',
    'SC',
    'South Carolina',
    'SD',
    'South Dakota',
    'TN',
    'Tennessee',
    'TX',
    'Texas',
    'UT',
    'Utah',
    'VT',
    'Vermont',
    'VA',
    'Virginia',
    'WA',
    'Washington',
    'WV',
    'West Virginia',
    'WI',
    'Wisconsin',
    'WY',
    'Wyoming'
  ];
  for ( var i = 0; i < states.length; i++ ) {
    if ( states[i].toLowerCase().indexOf(search_string.toLowerCase()) != -1 ) {
      if ( typeof fullstate(states[i]) != "undefined" ) {
        states[i] = fullstate(states[i]);
      }
      var uq = true;
      for ( var e = 0; e < results.location.length; e++ ) {
        if ( results.location[e].state == states[i] ) {
          uq = false;
        }
      }
      if ( uq ) {
        results.location[results.location.length] = {
          state: states[i]
        };
      }
    }
  }

  if ( data.location.func_success == true ) {
    var loc_data = data.location.func_data.search_data;
    for ( var index = 0; index < loc_data.length; index++ ) {
      var isNew = true;
      for ( var i = 0; i < results.location.length; i++ ) {
        if ( results.location[i].c_dma_code == loc_data[index].c_dma_code && results.location[i].c_hq_city == loc_data[index].c_hq_city && results.location[i].c_hq_state == loc_data[index].c_hq_state ) {
          isNew = false;
        }
      }
      if ( isNew && typeof loc_data[index].c_hq_state != "undefined" && typeof fullstate(loc_data[index].c_hq_state) != "undefined" && loc_data[index].dma_frontend_name != null ) {
        results.location[results.location.length] = loc_data[index];
      }
    }
  }

  // Create the array of things that will be shown
  var suggestions = [];
  // Determine how many of which things to show
  var priority = [
    'ticker',
    'company',
    'location',
    'officer'
  ];
  var amounts = {
    ticker: 2,
    company: 2,
    location: 2,
    officer: 2
  };
  for ( var index = 0; index < priority.length; index++ ) {
    total_results += results[priority[index]].length;
    if ( results[priority[index]].length < 2 ) {
      amounts[priority[index]] = results[priority[index]].length;
    }
  }
  function getLength(array){
    var retNum = 0;
    for ( var attr in array ) {
      if ( array.hasOwnProperty(attr) ) {
        retNum = retNum + array[attr];
      }
    }
    return retNum;
  }
  if ( getLength(amounts) < 8 ) {
    for ( var index = 0; index < priority.length; index++ ) {
      if ( (8 - getLength(amounts)) > 0 && results[priority[index]].length > amounts[priority[index]] ) {
        if ( (8 - getLength(amounts)) > (results[priority[index]].length - amounts[priority[index]]) ) {
          amounts[priority[index]] = amounts[priority[index]] + (results[priority[index]].length - amounts[priority[index]]);
        } else {
          amounts[priority[index]] = amounts[priority[index]] + (8 - getLength(amounts));
        }
      }
    }
  }
  for ( var index = 0; index < priority.length; index++ ) {
    var type = priority[index];
    for ( var i = 0; i < amounts[type]; i++ ) {
      if ( type == 'ticker' ) {
        var i_data = {
          url: Router.pick_path('content.companyprofile',{company_id: results[type][i].c_id, name: compUrlName(results[type][i].c_name), ticker: results[type][i].c_ticker}),
          string: '<b>' + results[type][i].c_ticker + '</b> - ' + results[type][i].c_name + ' (' + results[type][i].c_exchange + ') <i class="fa fa-chevron-right"></i>'
        };
      } else if ( type == 'company' ) {
        var i_data = {
          url: Router.pick_path('content.companyprofile',{company_id: results[type][i].c_id, name: compUrlName(results[type][i].c_name), ticker: results[type][i].c_ticker}),
          string: '<b>' + results[type][i].c_name + '</b> - ' + results[type][i].c_exchange + ':' + results[type][i].c_ticker + ' <i class="fa fa-chevron-right"></i>'
        };
      } else if ( type == 'location' ) {
        if ( typeof results[type][i].state != "undefined" ) {
          var i_data = {
            url: Router.pick_path('content.locationprofile',{loc_id: results[type][i].state}),
            string: '<b>' + results[type][i].state + '</b> <i class="fa fa-chevron-right"></i>'
          };
        } else {
          var i_data = {
            url: Router.pick_path('content.locationprofile',{loc_id: fullstate(results[type][i].c_hq_state), city: compUrlName(results[type][i].dma_frontend_name), city_id: results[type][i].c_dma_code}),
            string: '<b>' + toTitleCase(results[type][i].c_hq_city) + ', ' + fullstate(results[type][i].c_hq_state) + '</b> - ' + toTitleCase(results[type][i].dma_frontend_name) + ' <i class="fa fa-chevron-right"></i>'
          };
        }
      } else if ( type == 'officer' ) {
        var i_data = {
          url: Router.pick_path('content.executiveprofile',{ticker: results[type][i].c_ticker, fname: compUrlName(results[type][i].o_first_name), lname: compUrlName(results[type][i].o_last_name), exec_id: results[type][i].o_id}),
          string: '<b>' + results[type][i].o_first_name + ' ' + results[type][i].o_last_name + '</b> - ' + results[type][i].c_name + ' (' + results[type][i].c_ticker + ') <i class="fa fa-chevron-right"></i>'
        };
      }
      suggestions[suggestions.length] = i_data;
    }
  }
  if ( total_results > 8 ) {
    suggestions[suggestions.length] = {
      url: Router.pick_path('content.search',{search_results: encodeURIComponent(search_string)}),
      string: 'See The Other <b>' + dNumberToCommaNumber(total_results - 8) + '</b> Results <i class="fa fa-chevron-right" style="visibility: visible;"></i>'
    };
  }
  return suggestions;
}

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
    Meteor.call('GetSuggestion',encodeURIComponent(searchString),nowTime,function(error, data){
      if ( error ) {
        console.log('Suggestion Error',error);
        return false;
      }

      if ( Session.get('SuggestTime') > data.time ) {
        return false;
      }

      Session.set('SuggestTime',data.time);
      data = data.data;

      var suggestions = sortSuggestions(data, $('.fi_mainsearch input')[0].value);

      if ( suggestions.length == 0 ) {
        $('.fi_search_recommendations').html('');
        $('.fi_search_recommendations').removeClass('active');
        return false;
      }

      var HTMLString = '<div class="caret-top"></div>';
      for ( var index = 0; index < suggestions.length; index++ ) {
        if ( index != 0 ) {
          HTMLString = HTMLString + '<div class="border-li"></div>';
        }
        HTMLString = HTMLString + '<a style="color: #000" href="' + suggestions[index].url + '"><div class="fi_search_recommendations_item">' + suggestions[index].string + '</div></a>';
      }

      if ( data['name']['func_success'] == false && data['location']['func_success'] == false && data['ticker']['func_success'] == false) {
        $('.fi_search_recommendations').removeClass('active');
        return false;
      }

      //  $('.fi_search_recommendations')[0].innerHTML = '<div class="caret-top"></div>' /*' <i class="fa fa-times fi_search_recommendations_close"></i>'*/ + HTMLStringTick + HTMLStringName + HTMLStringLoc;
      $('.fi_search_recommendations').html(HTMLString);
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
      $('.fi_search_recommendations').removeClass('active');
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
    Finance_Search($('.fi_mainsearch input')[0].value);
  },

  'click .fi_search_recommendations_close': function() {
    $('.fi_search_recommendations').removeClass('active');
    return false;
  },

  'click .fi_searchbtn.fa-search': function() {
     Finance_Search($('.fi_mainsearch input')[0].value);
     $('.fi_search_recommendations').removeClass('active');
  },

  'mousedown .fi_searchbtn': function(){
    $('.fi_searchbtn').css("background-color", "black");
    $('.fi_search_recommendations').removeClass('active');
    $(".fi_mainsearch").addClass("boxhighlight-black");
  },

  'mouseup .fi_searchbtn': function(){
    $('.fi_searchbtn').css("background-color", "#3098ff");
    $('.fi_search_recommendations').removeClass('active');
    $(".fi_mainsearch").removeClass("boxhighlight-black");
  },

  'click .fi_mainsearch-text': function(){
    $(".fi_mainsearch").addClass("boxhighlight");
    if($('.fi_mainsearch input')[0].value == '' || $('.fi_mainsearch input')[0].value == ' ' || $('.fi_mainsearch input')[0].value == undefined){
      return false;
    }else{
      $('.fi_search_recommendations').addClass('active');
    }
  },
  'mouseenter .fi_mainsearch': function(){
    $(".fi_mainsearch").addClass("boxhighlight");
    if($('.fi_mainsearch input')[0].value == '' || $('.fi_mainsearch input')[0].value == ' ' || $('.fi_mainsearch input')[0].value == undefined){
      return false;
    }else{
      $('.fi_search_recommendations').addClass('active');
    }
  },
  'mouseleave .fi_search_recommendations': function(){
    $('.fi_search_recommendations').removeClass('active');
  }
  //'click html': function() {
  //  $('.fi_search_recommendations').removeClass('active');
  // }
  // 'focusout .fi_mainsearch-text' : function(){
  //   $(".fi_mainsearch").removeClass("boxhighlight");
  //   $('.fi_search_recommendations').removeClass('active');
  // }
});

Template.finance_homepage.onCreated(function() {
   Session.set('SuggestTime',0);
   Session.set('IsHome', true);
   Meteor.http.get('http://apireal.synapsys.us/listhuv/?action=get_remote_addr', function(error, data){
     //console.log(data);

     var getLoc = data.data.loc;
     var state = 'KS';
     for(var obj in getLoc){
       //console.log(obj);
       if ( getLoc.hasOwnProperty(obj) ) {
         var state = getLoc[obj].state;
       }
     }
     if ( typeof abbrstate(state) != "undefined" ) {
       state = abbrstate(state);
     }
     Session.set('home_state',state);
   });
});

Template.finance_homepage.helpers({
  topList:function(){
    return globalUrl('National');
  },
  TopCompanies: function(){
    //return list for top companies in the US currently hardcoded
    var national_list = 'Top companies in the United States with the highest percentage gain in stock price';
    national_list = compUrlName(national_list);
    var comp_list = Router.pick_path('content.toplist',{
      l_name: national_list,
      list_id: 6960,
      page_num:1
    })
    return comp_list;
  },

  Cities: function() {
    var state = homestates();

    var randomState = [];

    if ( typeof Session.get('home_state') != "undefined" ) {
      var curLoc = state.indexOf(Session.get('home_state'));
      //remove the current home location gotten from removeaddr api
      if(typeof curLoc != 'undefined'){
        if (curLoc > -1) {
          state.splice(curLoc, 1);
        }
      }
    } else {
      var ran = Math.floor(Math.random() * state.length);
      var curLoc = state[ran];
      Session.set('home_state', curLoc);
      state.splice(ran, 1);
    }

    for(i = 0; i < 6; i++){
      var x = Math.floor((Math.random() * state.length));
      randomState[i] = state[x];
      //remove the random states that were randomized and chosen so that it doesnt pop into the array again
      var index = state.indexOf(state[x]);
      if (index > -1) {
        state.splice(index, 1);
      }
    }
    var image = randomimage();
    var x = Math.floor(Math.random()*3);
    //plug in the data
    Cities = [
      {URL: Router.pick_path('content.locationprofile',{loc_id:Session.get('home_state')}), class: "fi_explore-image1",id: "explore1", State: fullstate(Session.get('home_state')), txt: '', index: 0, image: image[x]},
      {URL: Router.pick_path('content.locationprofile',{loc_id:randomState[1]}), class: "fi_explore-image2",id: "explore2", State: fullstate(randomState[1]), txt: '', index: 1, image: image[x+1]},
      {URL: Router.pick_path('content.locationprofile',{loc_id:Session.get('home_state')}), class: "fi_explore-image3",id: "explore3", isString: true, GeoLocation: '', txt: 'Check out the public companies in ' + fullstate(Session.get('home_state')), image: ''},
      {URL: Router.pick_path('content.locationprofile',{loc_id:randomState[2]}), class: "fi_explore-image1",id: "explore4", State: fullstate(randomState[2]), txt: '', index: 2, image: image[x+2]},
      {URL: Router.pick_path('content.locationprofile',{loc_id:randomState[3]}), class: "fi_explore-image1",id: "explore5", State: fullstate(randomState[3]), txt: '', index: 3, image: image[x+3]},
      {URL: Router.pick_path('content.locationprofile',{loc_id:randomState[4]}), class: "fi_explore-image2",id: "explore6", State: fullstate(randomState[4]), txt: '', index: 4, image: image[x+4]}
    ];
    return Cities;
  },

  National: function(){
    return Router.pick_path('content.locationprofile', {loc_id:'National'});
  },
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
    'OR',
    'PA',
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
