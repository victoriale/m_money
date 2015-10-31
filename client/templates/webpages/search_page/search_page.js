Template.search_page.onRendered(function(){
  this.autorun(function(){
    var searchParams = Router.current().getParams();
    console.log(searchParams.search_results);
    Meteor.call("GetSuggestion", searchParams.search_results, time,  function(error, data){
      if(error){
        console.log('Invalid Team Error',error);
        Session.set('IsError',true);
        return '';
      }
      console.log(data);
      for ( var module_name in data ) {
        if ( data.hasOwnProperty(module_name) ) {
          console.log(module_name,data[module_name]);
          Session.set(module_name,data[module_name]);
        }
      }
    });


  })
})

Template.search_page.events({
  'click .search_tab-menu-active-list': function(event, t){
    t.$('.current-list').removeClass('current-list');
    t.$(event.currentTarget).addClass('current-list');
  }
})

Template.search_page.helpers({

  //will
  Results: function(){
    var allResults = Session.get('data');
    if(typeof allResults == 'undefined'){
      return '';
    }
    allResults['NewList'] = {};

    allResults['NewList']['executive'] = [];
    allResults['NewList']['company'] = [];
    allResults['NewList']['location'] = [];
    $.map(allResults['name']['func_data']['search_data'], function(data, index){
      if(data.name_type == 'officer'){
        console.log('push exec');
        allResults['NewList']['executive'].push(data);
      }
      if(data.name_type == 'company'){
        console.log('push company');
        allResults['NewList']['company'].push(data);
      }
      //funtion to push locatio into allResults['NewList']['location']
    })
    console.log(allResults);
  },
})
