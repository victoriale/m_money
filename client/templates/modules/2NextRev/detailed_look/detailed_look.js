/*Author: Meghana yerramilLi
Created: [08/13/2015]
Description: detailed_look
Associated Files: detailed_look.less,detailed_look.html
*/
//render function to set the data
Template.detailed_look.onRendered( function() {
  Session.set("detl_data",
  [
    {
      ceo:"Mark Zuckerberg",
      salary:"$800,000",
      rem:"$800,000",
      text:"Annual Salary",
      percentage:"112.114%",
      detlicon2_none:'none',
      detlicon3_none:'none',
      location:"San Fransisco, CA",
      detl_midicon2:'none',
      title:"Executives compensation",
      detl_midicon3:'none',
      detl_none:'none',
      detl_ed:'none',
    },
    {

      rem:"$1,000,000",
      text:"Bonus",
      percentage:"<i class='detl_greytxt'><i class='detl_space'>--</i>%</i>",
      detlicon1_none:'none',
      detlicon3_none:'none',
      detl_midicon3:'none',
      detl_midicon1:'none',
      detl_greenone:'none',
      detl_none:'none',
      title:"Insider Activity  ",
      detl_cirnone:'none',
      detl_ed:'detl_ed',
      detl_ednone:'none',
    },
    {

      rem:"$74,000",
      text:"Stock Options",
      percentage:"86.37%",
      detlicon2_none:'none',
      detlicon1_none:'none',
      detl_midicon2:'none',
      detl_midicon1:'none',
      title:"Share Holdings   ",
      detl_cirnone:'none',
      detl_ed:'detl_ed',
      detl_ednone:'none',
    },

  ]);

});
//retrieving the data from array
Template.detailed_look.helpers({
  getceo:function(){
    var data = Session.get("detl_data");
    return data[0].ceo;
  },
  getsalary:function(){
    var data = Session.get("detl_data");
    return data[0].salary;
  },
  getinfo: function() {
    var data = Session.get("detl_data");
    return data;
  },


  location:function() {
    var data = Session.get("detl_data");
    return data[0].location;
  },

})
