/*
Author: Meghana yerramilli
Created: [07-20-2015]
Description: featured top 100 lists
Associated Files: featured_top_100.html, featured_top_100.less
*/
//render function to set the array with data
Template.featured_top_100.onRendered( function() {
  var counter=1;
  Session.set("counter",counter);
  Session.set("top100_data",
  [
    {
      company_name:"Facebook,Inc",
      company_location:"San Francisco, CA",
      company_CEO:"Mark Zuckerberg",
      company_stock:"FB",
      company_shares:"19,000,000",
      title:"Facebook's Trending Lists",
      top100_none:'none',
      tile2_icon_none:'none',
      tile3_icon_none:'none'

    },
    {
      title:"Company Top 100 Lists",
      top100_none:'none',
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
Template.featured_top_100.helpers (
  {
    company_name: function() {
      var data = Session.get("top100_data");
      return data[0].company_name;
    },
    company_location: function() {
      var data = Session.get("top100_data");
      return data[0].company_location;
    },
    company_CEO: function() {
      var data = Session.get("top100_data");
      return data[0].company_CEO;
    },
    company_stock: function() {
      var data = Session.get("top100_data");
      return data[0].company_stock;
    },
    company_shares: function() {
      var data = Session.get("top100_data");
      return data[0].company_shares;
    },
    counter: function() {
      var data = Session.get("counter");
      return data;
    },
    gettitle: function() {
      var data = Session.get("top100_data");
      return data;
    },
  });
