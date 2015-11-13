/*
Author: jyothyswaroop
Created: 08/10/2015
Description: co_competitor page
Associated Files: co_competitor.less and co_competitor.html
*/
var counter=0;

//renders the data when page loads
Template.co_competitor.onRendered(function () {
$(".co_comp-page-selector1").css("background-color","#3098ff");

});

var backgroundStyle="tilewhite";
Template.co_competitor.helpers({
  companyInfo: function(){
    var data = Session.get('competitors');
    if(typeof data == 'undefined'){
      return '';
    }
    var newData = data.company;

    var company = compUrlName(newData.c_name);
    var ticker = newData.c_ticker;
    var company_id = newData.c_id;

    newData['c_tr_last_updated'] = newData['c_tr_last_updated'].replace(/-/g, '/');
    //database sending back in million
    newData['market_cap'] = commaSeparateNumber_decimal(Number(newData['market_cap'])*1000000);
    newData['csi_price_change_since_last'] = Number(newData['csi_price_change_since_last']).toFixed(2);
    newData['csi_price'] = Number(newData['csi_price']).toFixed(2);
    newData['csi_percent_change_since_last'] = Number(newData['csi_percent_change_since_last']).toFixed(2);
    newData['url'] = Router.pick_path('content.companyprofile', {company_id: company_id, name: company, ticker: ticker});
    newData['locurl'] = Router.pick_path('content.locationprofile',{
      loc_id:newData.c_hq_state,
      city: compUrlName(newData.c_hq_city)
    });
    newData['secturl'] = Router.pick_path('content.sector',{
      loc_id:newData.c_hq_state,
      sector_id: compUrlName(newData.c_sector),
      page_num:1
    });
    newData.share_company_url =  "https://www.facebook.com/sharer/sharer.php?u=" + Router.pick_path('content.companyprofile', {company_id: company_id, name: company, ticker: ticker});
    newData.share_company_competitor_url = "https://www.facebook.com/sharer/sharer.php?u=" + Router.pick_path('content.competitor', {company_id: company_id, name: company, ticker: ticker});

    return newData;
  },

  companyList: function(){
    var data = Session.get('competitors');
    if(typeof data == 'undefined'){
      return '';
    }
    var compare = data.company;
    var competitors = data.competitors;
    $.map(competitors, function(data, index){
      //database sending back in million
      data['market_cap'] = commaSeparateNumber_decimal(Number(data['market_cap'])*1000000);
      data['csi_price_change_since_last'] = Number(data['csi_price_change_since_last']).toFixed(2);
      data['csi_price'] = Number(data['csi_price']).toFixed(2);
      data['csi_percent_change_since_last'] = Number(data['csi_percent_change_since_last']).toFixed(2);
      data['csi_price_last_updated'] = (new Date(data['csi_price_last_updated'])).toSNTForm();
      data.share_url = "https://www.facebook.com/sharer/sharer.php?u=" + Router.pick_path('content.companyprofile', {company_id: data.c_id, name: compUrlName(data.c_name), ticker: data.c_ticker});

      var company = compUrlName(data.c_name);
      var ticker = data.c_ticker;
      var company_id = data.c_id;
      data['locurl'] = Router.pick_path('content.locationprofile',{
        loc_id:data.c_hq_state,
        city: compUrlName(data.c_hq_city)
      });
      data['secturl'] = Router.pick_path('content.sector',{
        loc_id:data.c_hq_state,
        sector_id: compUrlName(data.c_sector),
        page_num:1
      });
      data['url'] = Router.pick_path('content.companyprofile', {company_id: company_id, name: company, ticker: ticker});
      data['rank'] = index+1;
      data['compare_to'] = compare.c_ticker;
      data['compared_percent'] = (((data['csi_price'] - compare['csi_price'])/compare['csi_price'])* 100).toFixed(2);
    });
    return data.competitors;
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
Template.co_competitor.events({
    'click .co_comp-x': function(e, t){
      t.$('.co_comp-ct1').hide();
    },
    //This function is called when user presses the button "1" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .co_comp-page-selector1': function()
    {
        $(".co_comp-page-selector1").css("background-color","#3098ff");
        $(".co_comp-page-selector2").css("background-color","#ffffff");
        $(".co_comp-page-selector3").css("background-color","#ffffff");
        $(".co_comp-page-selector200").css("background-color","#ffffff");
    },
});
