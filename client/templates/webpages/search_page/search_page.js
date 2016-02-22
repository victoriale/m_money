function ExecSearch() {
  var LocationText = $('.re_mainsearch-text')[0].value;
  if ( LocationText.match(/^\d*$/) ) {
    location_id = LocationText;
  } else if ( LocationText.match(/^[^\,]*\,[^\,]*$/) ) {
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
    console.log('Other');
    return;
  }
  LocationRedirect(location_id);
}
function GetSuggest(nowTime) {
  var searchString = $('.re_mainsearch-text')[0].value;
  if ( searchString == "" ) {
    $('.discover_recommendations').removeClass('active');
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

      var suggestions = sortSuggestions(data, $('.re_mainsearch-text')[0].value);

      if ( suggestions.length == 0 ) {
        $('.discover_recommendations').html('');
        $('.discover_recommendations').removeClass('active');
        return false;
      }

      var HTMLString = '<div class="caret-top"></div>';
      for ( var index = 0; index < suggestions.length; index++ ) {
        if ( index != 0 ) {
          HTMLString = HTMLString + '<div class="border-li"></div>';
        }
        HTMLString = HTMLString + '<a style="color: #000" href="' + suggestions[index].url + '"><div class="discover_recommendations_item">' + suggestions[index].string + '</div></a>';
      }

      if ( data['name']['func_success'] == false && data['location']['func_success'] == false && data['ticker']['func_success'] == false) {
        $('.discover_recommendations').removeClass('active');
        return false;
      }

      //  $('.fi_search_recommendations')[0].innerHTML = '<div class="caret-top"></div>' /*' <i class="fa fa-times fi_search_recommendations_close"></i>'*/ + HTMLStringTick + HTMLStringName + HTMLStringLoc;
      $('.discover_recommendations').html(HTMLString);
      $('.discover_recommendations').addClass('active');
    });
  }
}
Template.search_page.onRendered(function(){
  $('.header_search_recommendations').removeClass('active');
});

Template.search_page.events({
  'submit form': function(event) {
    event.preventDefault();
  },
  'keypress .re_mainsearch input': function(event){
    if ( event.which === 13 ) {
      Finance_Search($('.re_mainsearch-text')[0].value);
    }
  },
  'click .re_searchbtn.fa-search': function() {
    Finance_Search($('.re_mainsearch-text')[0].value);
  },
  'keyup .re_mainsearch input': function(event) {
    if ( event.which === 13 ) {
      return "";
    }
    if ( typeof StartTime == "undefined" ) {
      StartTime = 0;
    }
    var d = new Date();
    d = d.getTime();
    if ( d - StartTime < 250 ) {
      setTimeout(function(){GetSuggest();},250);
      return "";
    }
    StartTime = d;
    GetSuggest();
  },
  'click .discover_recommendations_item': function(event) {
    $('.re_mainsearch-text')[0].value = $(event.target)[0].innerHTML;
    $('.discover_recommendations').removeClass('active');
    Finance_Search($('.re_mainsearch-text')[0].value);
  },
  'click .discover_recommendations_close': function() {
    $('.discover_recommendations').removeClass('active');
    return false;
  },
  'click .fi_mainsearch-text': function(){
    if($('.re_mainsearch-text')[0].value == '' || $('.re_mainsearch-text')[0].value == ' ' || $('.re_mainsearch-text')[0].value == undefined){
      return false;
    }else{
      $(".fi_mainsearch-text").addClass("boxhighlight");
      $('.discover_recommendations').addClass('active');
    }
  },
  'mouseenter .re_mainsearch': function(){
    if($('.re_mainsearch-text')[0].value == '' || $('.re_mainsearch-text')[0].value == ' ' || $('.re_mainsearch-text')[0].value == undefined){
      return false;
    }else{
      $(".fi_mainsearch-text").addClass("boxhighlight");
      $('.discover_recommendations').addClass('active');
    }
  },
  'mouseleave .discover_recommendations': function(){
    $(".fi_mainsearch-text").removeClass("boxhighlight");
    $('.discover_recommendations').removeClass('active');
  },
  'click .search_tab-menu-active-list': function(event, t){
    t.$('.current-list').removeClass('current-list');
    t.$(event.currentTarget).addClass('current-list');
    Session.set('searchTab',t.$(event.currentTarget).attr('id'));
  }

});

function get_all_sorted(data) {
  // Sort all the data into location, company, executive
  var results = {
    company: [],
    location: [],
    officer: [],
    ticker: []
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
    for ( var index = 0; index < ticker_data.length; index++ ) {
      results[ticker_data[index].name_type][results[ticker_data[index].name_type].length] = ticker_data[index];
    }
  }

  if ( data.location.func_success == true ) {
    var loc_data = data.location.func_data.search_data;
    total_results = total_results + loc_data.length;
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
  var suggestions = {
    company: [],
    location: [],
    executive: []
  };
  // Determine how many of which things to show
  var priority = [
    'ticker',
    'company',
    'location',
    'officer'
  ];
  for ( var index = 0; index < priority.length; index++ ) {
    var type = priority[index];
    for ( var i = 0; i < results[type].length; i++ ) {
      if ( type == 'ticker' ) {
        var i_data = {
          url: Router.pick_path('content.companyprofile',{company_id: results[type][i].c_id, name: compUrlName(results[type][i].c_name), ticker: results[type][i].c_ticker}),
          string: '<b>' + results[type][i].c_ticker + '</b> - ' + results[type][i].c_name + ' (' + results[type][i].c_exchange + ')<i class="fa fa-chevron-right"></i>'
        };
      } else if ( type == 'company' ) {
        var i_data = {
          url: Router.pick_path('content.companyprofile',{company_id: results[type][i].c_id, name: compUrlName(results[type][i].c_name), ticker: results[type][i].c_ticker}),
          string: '<b>' + results[type][i].c_name + '</b> - ' + results[type][i].c_exchange + ':' + results[type][i].c_ticker + '<i class="fa fa-chevron-right"></i>'
        };
      } else if ( type == 'location' ) {
        var i_data = {
          url: Router.pick_path('content.locationprofile',{loc_id: fullstate(results[type][i].c_hq_state), city: compUrlName(results[type][i].dma_frontend_name), city_id: results[type][i].c_dma_code}),
          string: '<b>' + toTitleCase(results[type][i].c_hq_city) + ', ' + fullstate(results[type][i].c_hq_state) + '</b> - ' + toTitleCase(results[type][i].dma_frontend_name) + '<i class="fa fa-chevron-right"></i>'
        };
      } else if ( type == 'officer' ) {
        var i_data = {
          url: Router.pick_path('content.executiveprofile',{ticker: results[type][i].c_ticker, fname: compUrlName(results[type][i].o_first_name), lname: compUrlName(results[type][i].o_last_name), exec_id: results[type][i].o_id}),
          string: '<b>' + results[type][i].o_first_name + ' ' + results[type][i].o_last_name + '</b> - ' + results[type][i].c_name + ' (' + results[type][i].c_ticker + ')<i class="fa fa-chevron-right"></i>'
        };
      }
      var type2 = type;
      if ( type2 == "ticker" ) {
        type2 = "company";
      } else if ( type2 == "officer" ) {
        type2 = "executive";
      }
      suggestions[type2][suggestions[type2].length] = i_data;
    }
  }
  return suggestions;
}

Template.search_page.onCreated(function(){
  Session.set('searchTab', 'executive');
})

Template.search_page.onRendered(function(){
  var searchParams = Router.current().getParams();
  $('.header_search_recommendations').removeClass('active');

  //Code to determine anchor tags attributes
  if(window.history.length > 1){
    //If previous history exists, go back a page
    this.$('#go_back').attr({
      'href': '',
      'onclick': 'history.go(-1)'
    });
  }else{
    //If previous history does not exist, go back to home page
    if(typeof searchParams.partner_id === 'undefined'){
      //Non partner page
      var path = Router.path('content.finance.home');
    }else{
      //Partner page
      var path = Router.path('content.partnerhome', {partner_id: searchParams.partner_id});
    }

    this.$('#go_back').attr('href', path);
  }

})

Template.search_page.helpers({

  //will
  Results: function(){
    var allResults = Session.get('data');
    var resultTab = Session.get('searchTab');
    if(typeof allResults == 'undefined'){
      return '';
    }
    var data = get_all_sorted(allResults);
    Session.set('totalResults', data.company.length + data.executive.length + data.location.length);
    Session.set('SortedSearch', data);
    return data[resultTab];
  },

  totalResults:function(){
    return Session.get('totalResults');
  },

  currentResult:function(){
    var data = Session.get('SortedSearch');
    var resultTab = Session.get('searchTab');
    return data[resultTab].length;
  },

  searchLength:function(){
    var data = Session.get('SortedSearch');
    return {
      execLength: data.executive.length,
      compLength: data.company.length,
      locLength: data.location.length,
    };
  },
})
