/*
Author: Meghana yerramilli
Created: [07-20-2015]
Description: featured top 100 lists
Associated Files: featured_list.html, featured_list.less
*/
//render function to set the array with data
Template.featured_list.onRendered( function() {
  var counter=1;
  Session.set("counter",counter);
  Session.set("fl_data",
  [
    {
      company_name:"[Profile Name #1]",
      company_location:"City, State",
      company_CEO:"[Profile's Title]",
      // company_stock:"FB",
      company_shares:"[Data Entry]",
      title:"[Profile's]'s Trending Lists",
      fl_none:'none',
      tile2_icon_none:'none',
      tile3_icon_none:'none'

    },
    {
      title:"Top 100 [Profile Type]",
      fl_none:'none',
      tile1_icon_none:'none',
      tile3_icon_none:'none'
    },
    {
      title:"All Finance Top 100 Lists",
      tile1_icon_none:'none',
      tile2_icon_none:'none'
    },

  ]);

});
//helper function to retrieve data from array
Template.featured_list.helpers (
  {
    company_name: function() {
      var data = Session.get("fl_data");
      return typeof(data) !== 'undefined' ? data[0].company_name : '';
    },
    company_location: function() {
      var data = Session.get("fl_data");
      return typeof(data) !== 'undefined' ? data[0].company_location : '';
    },
    company_CEO: function() {
      var data = Session.get("fl_data");
      return typeof(data) !== 'undefined' ? data[0].company_CEO : '';
    },
    company_stock: function() {
      var data = Session.get("fl_data");
      return typeof(data) !== 'undefined' ? data[0].company_stock : '';
    },
    company_shares: function() {
      var data = Session.get("fl_data");
      return typeof(data) !== 'undefined' ? data[0].company_shares : '';
    },
    counter: function() {
      var data = Session.get("counter");
      return data;
    },
    gettitle: function() {
      var data = Session.get("fl_data");
      return data;
    },
    profile: function(){
      var data = "[PROFILE]";
      return data;
    },
    featURL: function(){
      return Router.path('content.toplist');
    },
  });
