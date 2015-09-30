/*Author: Meghana yerramilLi
Created: [08/14/2015]
Description: top_portfolio
Associated Files: top_portfolio.less,top_portfolio.html
*/
//render function to set the data
Template.top_portfolio.onRendered( function() {
  Session.set("topport_data",
  [
    {
      city:"San Fransisco",
      name:"Tommy Lofgren",
      money:"$7.438.56",
      perc:"12.71%",
      rem:"$800,000",
      text:"Annual Salary",
      percentage:"112.114%",
      toprticon2_none:'none',
      toprticon3_none:'none',
      location:"San Fransisco, CA",
      toprt_midicon2:'none',
      title:"All Public Portfolios",
      toprt_midicon3:'none',

    },
    {

      rem:"$1,000,000",
      text:"Bonus",
      percentage:"<i class='toprt_greytxt'><i class='toprt_space'>--</i>%</i>",
      toprticon1_none:'none',
      toprticon3_none:'none',
      toprt_midicon3:'none',
      toprt_midicon1:'none',
      toprt_greenone:'none',

      title:"Top Gaining Portfolios ",


    },
    {

      rem:"$74,000",
      text:"Stock Options",
      percentage:"86.37%",
      toprticon2_none:'none',
      toprticon1_none:'none',
      toprt_midicon2:'none',
      toprt_midicon1:'none',
      title:"Portfolio Top Lists ",

    },

  ]);

});
//retrieving the data from array
Template.top_portfolio.helpers({
  getceo:function(){
    var data = Session.get("topport_data");
    return data[0].ceo;
  },
  getsalary:function(){
    var data = Session.get("topport_data");
    return data[0].salary;
  },
  getinfo: function() {
    var data = Session.get("topport_data");
    return data;
  },
  city:function(){
    var data = Session.get("topport_data");
    return data[0].city;
  },
  name:function(){
    var data = Session.get("topport_data");
    return data[0].name;
  },
  money:function(){
    var data = Session.get("topport_data");
    return data[0].money;
  },
  perc:function(){
    var data = Session.get("topport_data");
    return data[0].perc;
  },
  location:function() {
    var data = Session.get("topport_data");
    return data[0].location;
  },

})
