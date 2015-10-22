/*
Author: Meghana yerramilli
Created: [07-20-2015]
Description: featured top 100 lists
Associated Files: featured_list.html, featured_list.less
*/
//render function to set the array with data
Template.featured_list.onRendered( function() {
  Session.set("fl_counter",0);

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

Template.featured_list.events({
  'click .fl_block_leftbutton': function(){
    var counter = Session.get("fl_counter");
    var list = Session.get('featured_lists')['featured_list_data'];
    if(counter > 0){
      counter--;
      Session.set("fl_counter",counter);
    }
    else
    {
      counter = list.length-1;
      Session.set("fl_counter", counter);
    }
  },
  'click .fl_block_rightbutton': function(){
    var counter = Session.get("fl_counter");
    var list = Session.get('featured_lists')['featured_list_data'];
    if(counter < list.length - 1)
    {
      counter++;
      Session.set("fl_counter",counter);
    }
    else
    {
      counter = 0;
      Session.set("fl_counter", counter);
    }
  },
})
//helper function to retrieve data from array
Template.featured_list.helpers (
  {
    featuredData: function(){
      var data = Session.get('featured_lists');
      if(typeof data == 'undefined'){
        return '';
      }
      return data;
    },

    featuredList: function(){
      var data = Session.get('featured_lists');
      var count = Session.get('fl_counter');
      if(typeof data == 'undefined'){
        return '';
      }
      var newData = data.featured_list_data;
      $.map(newData, function(data ,index){
        data.trading_volume = dNumberToCommaNumber(Number(data.trading_volume).toFixed(0));
      })
      return newData[count];
    },

    compName: function(){
      var data = Session.get('profile_header');
      if(typeof data == 'undefined'){
        return '';
      }
      return data.c_name;
    },

    counter: function(){
      var count = Session.get('fl_counter');
      return count+1;
    },

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
