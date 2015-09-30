/*Author: [Thanush ]
Created: [07/24/2015]
Description: [Finance : latest_ipos Module]*/

Template.latest_IPOs.onRendered( function() {
  Session.set("latest_ipos");
});
///Helpers for the tiles (each function)
Template.latest_IPOs.helpers({                   //helper class for adding data to template dictionary
  ipos_tiles:[
    {open_page:'OPEN PAGE',font_awesome:'fa-university',tile_name:'Upcoming IPOs'},
    {open_page:'OPEN PAGE',font_awesome:'fa-usd',tile_name:'Recently Priced IPOs '},
    {open_page:'OPEN PAGE',font_awesome:' fa-file-archive-o',tile_name:'Recently Filed IPOs '}
  ],
// helpers for the Ipos names (each function)
  iposnames:[
    {ipos_name:'AWNA',ipos_company:'Proposed Symbol',ipos_awesome:'fa-check'},
    {ipos_name:'$124,192,000',ipos_company:'Total Revenue',ipos_awesome:'fa-bar-chart'},
    {ipos_name:'Morgan Stanley & Co. LLC',ipos_company:'Lead Underwriter',ipos_awesome:' fa-gavel'}
  ],
  /// top list number in the top
  topnumb:function() {
    var data = Session.get("latest_ipos");
    return ["36"];
  },
  // city
  city:function() {
    var data = Session.get("latest_ipos");
    return ["San Francisco"];
  },
  //state
  state:function() {
    var data = Session.get("latest_ipos");
    return ["CA"];
  },
  //company
  company:function() {
    var data = Session.get("latest_ipos");
    return ["Box Corporation"];
  },
  //amount
  amount:function() {
    var data = Session.get("latest_ipos");
    return ["Offer Amount"];
  },
  //money
  money:function() {
    var data = Session.get("latest_ipos");
    return ["96 Million"];
  }
  });
