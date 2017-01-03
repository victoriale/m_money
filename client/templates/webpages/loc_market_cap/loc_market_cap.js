/*
Author: jyothyswaroop
Created: 07/30/2015
Description: followers page
Associated Files: list_view.less and loc_market_cap.html
*/

Template.loc_market_cap.onCreated(function(){
  Session.set('lv_count', 0);
})

//renders the data when page loads
Template.loc_market_cap.onRendered(function () {
  $(".list_vw-page-selector1").css("background-color","#3098ff");
});

var backgroundStyle="tilewhite";
Template.loc_market_cap.helpers({
  toplist:function(){
    var params = Router.current().getParams();
    if(params.list_id == 'dollar_ceo'){
      var listdata = Session.get('dollar_ceo');
    }
    if(params.list_id == 'female_ceo'){
      var listdata = Session.get('female_ceo');
    }
    if(typeof listdata =='undefined'){
      return '';
    }
    $.map(listdata.list_data, function(data,index){
      if(index % 2 == 0){
        data['background'] = 'tilewhite';
      }else{
        data['background'] = 'tilegrey';
      }
      if(typeof data['TotalComp'] == 'undefined' || data['TotalComp'] == ''){
        data['objname'] = 'Salary';
        data['TotalComp'] = 1;
      }else{
        data['objname'] = 'Compensation';
        data['TotalComp'] = dNumberToCommaNumber(data['TotalComp']);
      }
      // data['newDate'] = moment(data.csi_price_last_updated).tz('America/New_York').format('MM/DD/YYYY');
      data['newDate'] = moment(data.csi_price_last_updated,'shortDate');
      data['rank'] = index+1;
      data['url'] = Router.pick_path('content.executiveprofile',{
        fname:data.o_first_name,
        lname:data.o_last_name,
        ticker: data.c_ticker,
        exec_id: data.o_id
      });

      //data from list can come in 6 different ways these values will catch and give results back
      for(objName in data){
        if(objName === 'stock_percent'){
          data['data_name'] = "Stock Percent";
          data['data_value'] = Number(data['stock_percent']).toFixed(2)+"%";
        }
        if(objName === 'market_cap'){
          data['data_name'] = "Market Cap";
          data['data_value'] = '$'+nFormatter2(data['market_cap']);
        }
        if(objName === 'market_percent'){
          data['data_name'] = "Market Percent";
          data['data_value'] = Number(data['market_percent']).toFixed(2)+"%";
        }
        if(objName === 'trading_volume'){
          data['data_name'] = "trading volume";
          data['data_value'] = nFormatter2(data['trading_volume']);
        }
        if(objName === 'pe_ratio'){
          data['data_name'] = "PE Ratio";
          data['data_value'] = Number(data['pe_ratio']).toFixed(0);
        }
        if(objName === 'eps'){
          data['data_name'] = "Earnings Per Share";
          data['data_value'] = Number(data['eps']).toFixed(2);
        }
      }
    })
    return listdata;
  },

  carouselList:function(){
    var count = Session.get("lv_count");
    var params = Router.current().getParams();
    if(params.list_id == 'dollar_ceo'){
      var listdata = Session.get('dollar_ceo');
    }
    if(params.list_id == 'female_ceo'){
      var listdata = Session.get('female_ceo');
    }
    if(typeof listdata =='undefined'){
      return '';
    }
    $.map(listdata.list_data, function(data,index){
      if(typeof data['TotalComp'] == 'undefined' || data['TotalComp'] == ''){
        data['objname'] = 'Salary';
        data['TotalComp'] = 1;
      }else{
        data['objname'] = 'Compensation';
        data['TotalComp'] = dNumberToCommaNumber(data['TotalComp']);
      }
      // data['newDate'] = moment(data.csi_price_last_updated).tz('America/New_York').format('MM/DD/YYYY');
      data['newDate'] = globalDateFormat(data.csi_price_last_updated,'shortDate');
      data['rank'] = index+1;
      data['url'] = Router.pick_path('content.companyprofile',{
        ticker: data.c_ticker,
        name: compUrlName(data.c_name),
        company_id: data.c_id
      });
    })
    return listdata.list_data[count];
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
Template.loc_market_cap.events({
  //Event to close tooltip
  'click .list_vw-x': function(e, t){
    //Currently disabled: Styling needs to be fixed to handle this event
    //t.$('.list_vw-wl').hide();
  },
  'click .list_vw-lefthov': function(){
    var counter = Session.get("lv_count");
    var list = Session.get('top_list_gen')['top_list_list'];
    if(counter > 0){
      counter--;
      Session.set("lv_count",counter);
    }
    else
    {
      counter = list.length-1;
      Session.set("lv_count", counter);
    }
  },
  'click .list_vw-righthov': function(){
    var counter = Session.get("lv_count");
    var list = Session.get('top_list_gen')['top_list_list'];
    if(counter < list.length - 1)
    {
      counter++;
      Session.set("lv_count",counter);
    }
    else
    {
      counter = 0;
      Session.set("lv_count", counter);
    }
  },
});
