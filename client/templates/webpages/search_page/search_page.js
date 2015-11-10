Template.search_page.onCreated(function(){
  Session.set('searchTab', 'executive');
})

Template.search_page.onRendered(function(){
  var searchParams = Router.current().getParams();
  //console.log(searchParams.search_results);
  $('.header_search_recommendations').removeClass('active');
  Meteor.call("GetSuggestion", searchParams.search_results.replace(/-/g, ' '), Number(Session.get('time')),  function(error, data){
    if(error){
      console.log('Invalid Search Error',error);
      Session.set('IsError',true);
      return '';
    }
    for ( var module_name in data ) {
      if ( data.hasOwnProperty(module_name) ) {
        //console.log(module_name,data[module_name]);
        Session.set(module_name,data[module_name]);
      }
    }
  });
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
    allResults['NewList'] = {};

    allResults['NewList']['executive'] = [];
    allResults['NewList']['company'] = [];
    allResults['NewList']['location'] = [];
    $.map(allResults['name']['func_data']['search_data'], function(data, index){
      if(data.name_type == 'officer'){
        allResults['NewList']['executive'].push(data);
      }
      if(data.name_type == 'company'){
        allResults['NewList']['company'].push(data);
      }
      //funtion to push locatio into allResults['NewList']['location']
    })
    allResults['NewList']['location'] = allResults.location.func_data.search_data;
    var newList = allResults['NewList'];
    newList['totalResults'] = newList.company.length + newList.executive.length + newList.location.length;
    Session.set('totalResults', newList['totalResults']);
    var exec = newList.executive;
    var newArray1 = [];
    var newArray2 = [];
    var newArray3 = [];
    $.map(exec,function(data, index){
      var result = {
        url: Router.pick_path('content.executiveprofile', {
          fname:data.o_first_name,
          lname:data.o_last_name,
          ticker:data.c_ticker,
          exec_id:data.o_id
        }),
        txt1: '<b>' + data.o_first_name + " " + data.o_last_name + "</b> Profile At " + data.c_name + ' (' + data.c_ticker + ')',
      }
      newArray1.push(result);
    })
      newList['executive']['search'] = newArray1;

    var comp = newList.company;
    $.map(comp,function(data, index){
      var result = {
        url: Router.pick_path('content.companyprofile', {
          name:compUrlName(data.c_name),
          ticker:data.c_ticker,
          company_id:data.c_id
        }),
        txt1: data.c_name + ' (' + data.c_exchange + ':' + data.c_ticker + ')',
      };
      newArray2.push(result);
    })
    newList['company']['search'] = newArray2;

    var loc = newList.location;
    $.map(loc,function(data, index){
      var result = {
        url: Router.pick_path('content.locationprofile', {
          loc_id:compUrlName(data.c_hq_state),
          city:compUrlName(data.dma_frontend_name),
          city_id: data.c_dma_code
        }),
        txt1: data.dma_frontend_name,
      }
      newArray3.push(result);
    })
      newList['location']['search'] = newArray3;
      Session.set('SortedSearch', newList);
    return allResults['NewList'][resultTab]['search'];
  },

  totalResults:function(){
    return Session.get('totalResults');
  },

  currentResult:function(){
    var data = Session.get('SortedSearch');
    var resultTab = Session.get('searchTab');
    return  data[resultTab].length;
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
