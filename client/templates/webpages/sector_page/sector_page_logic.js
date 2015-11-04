/*
Author: jyothyswaroop
Created: 8/12/2015
Description: sector_page
Associated Files: sector_page.less and sector_page.html
*/
var counter=0;
Template.sector_page.onCreated(function(){
  Session.set('sector_count', 0);
})
//renders the data when page loads
Template.sector_page.onRendered(function () {
$(".sect_pg-page-selector1").css("background-color","#3098ff");

});

var backgroundStyle="tilewhite";
Template.sector_page.helpers({
  back_url: function(){
    return Router.pick_path('content.locationprofile',{
      loc_id: Session.get('loc_id')
    });
  },

  sectorData:function(){
    var data = Session.get('sector_companies');
    if(typeof data == 'undefined'){
      return '';
    }
    $.map(data.companies, function(data,index){
      if(index % 2 == 0){
        data['background'] = 'tilewhite';
      }else{
        data['background'] = 'tilegrey';
      }
      data['newDate'] = moment(data.csi_price_last_updated).tz('America/New_York').format('MM/DD/YYYY');
      data['rank'] = index+1;
      data['url'] = Router.pick_path('content.companyprofile',{
        company_id: data.c_id
      });
      data['csi_price'] = Number(data['csi_price']).toFixed(2);
      data['csi_price_change_since_last'] = Number(data['csi_price_change_since_last']).toFixed(2);
      data['csi_percent_change_since_last'] = Number(data['csi_percent_change_since_last']).toFixed(2);
    });
    data['location'] = fullstate(Session.get('loc_id'));

    return data;
  },

  sectorList:function(){
    var count = Session.get("sector_count");
    var data = Session.get('sector_companies');
    if(typeof data == 'undefined'){
      return '';
    }
    $.map(data.companies, function(data,index){
      if(index % 2 == 0){
        data['background'] = 'tilewhite';
      }else{
        data['background'] = 'tilegrey';
      }
      data['newDate'] = moment(data.csi_price_last_updated).tz('America/New_York').format('MM/DD/YYYY');
      data['rank'] = index+1;
      data['url'] = Router.pick_path('content.companyprofile',{
        company_id: data.c_id
      });
      data['csi_price'] = Number(data['csi_price']).toFixed(2);
      data['csi_price_change_since_last'] = Number(data['csi_price_change_since_last']).toFixed(2);
      data['csi_percent_change_since_last'] = Number(data['csi_percent_change_since_last']).toFixed(2);
    });
    data['location'] = fullstate(Session.get('loc_id'));
    return data['companies'][count];
  },

//gave names for dyamic access {{getheadername0}}
    getheadername0: function(){
      var name0= "United States";
      return name0;
    },

  //This function is called everytime "each" loop runs, it returns the respective class which is suppose to use on each iteration
  getBackgroundStyle: function() {

    if (backgroundStyle === "tilegrey")
    {
      backgroundStyle="tilewhite";
      return backgroundStyle;
    } else {
      backgroundStyle = "tilegrey";
      return backgroundStyle;
    }
  }
});
//This handles the events on button clicks of 1,2,3 and 200
Template.sector_page.events({
  'click .list_vw-lefthov': function(){
    var counter = Session.get("sector_count");
    var list = Session.get('sector_companies')['companies'];
    if(counter > 0){
      counter--;
      Session.set("sector_count",counter);
    }
    else
    {
      counter = list.length-1;
      Session.set("sector_count", counter);
    }
  },
  'click .list_vw-righthov': function(){
    var counter = Session.get("sector_count");
    var list = Session.get('sector_companies')['companies'];
    if(counter < list.length - 1)
    {
      counter++;
      Session.set("sector_count",counter);
    }
    else
    {
      counter = 0;
      Session.set("sector_count", counter);
    }
  },
    //This function is called when user presses the button "1" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .sect_pg-page-selector1': function()
    {
        $(".sect_pg-page-selector1").css("background-color","#3098ff");
        $(".sect_pg-page-selector2").css("background-color","#ffffff");
        $(".sect_pg-page-selector3").css("background-color","#ffffff");
        $(".sect_pg-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "2" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .sect_pg-page-selector2': function()
    {
        $(".sect_pg-page-selector2").css("background-color","#3098ff");
        $(".sect_pg-page-selector1").css("background-color","#ffffff");
        $(".sect_pg-page-selector3").css("background-color","#ffffff");
        $(".sect_pg-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "3" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .sect_pg-page-selector3': function()
    {
        $(".sect_pg-page-selector3").css("background-color","#3098ff");
        $(".sect_pg-page-selector2").css("background-color","#ffffff");
        $(".sect_pg-page-selector1").css("background-color","#ffffff");
        $(".sect_pg-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "200" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .sect_pg-page-selector200': function()
    {
        $(".sect_pg-page-selector200").css("background-color","#3098ff");
        $(".sect_pg-page-selector2").css("background-color","#ffffff");
        $(".sect_pg-page-selector3").css("background-color","#ffffff");
        $(".sect_pg-page-selector1").css("background-color","#ffffff");
    }
});
