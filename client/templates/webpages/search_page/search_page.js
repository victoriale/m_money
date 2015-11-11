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
    total_results = total_results + name_data.length;
    for ( var index = 0; index < name_data.length; index++ ) {
      results[name_data[index].name_type][results[name_data[index].name_type].length] = name_data[index];
    }
  }

  if ( data.ticker.func_success == true ) {
    var ticker_data = data.ticker.func_data.search_data;
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
})

Template.search_page.events({
  'click .search_tab-menu-active-list': function(event, t){
    t.$('.current-list').removeClass('current-list');
    t.$(event.currentTarget).addClass('current-list');
    Session.set('searchTab',t.$(event.currentTarget).attr('id'));
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
