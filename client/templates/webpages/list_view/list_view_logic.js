/*
Author: jyothyswaroop
Created: 07/30/2015
Description: followers page
Associated Files: list_view.less and list_view.html
*/

Template.list_view.onCreated(function(){
  Session.set('lv_count', 0);
})

//renders the data when page loads
Template.list_view.onRendered(function () {
  $(".list_vw-page-selector1").css("background-color","#3098ff");
});

var backgroundStyle="tilewhite";
Template.list_view.helpers({
  toplist:function(){
    var listdata = Session.get('top_list_gen');
    if(typeof listdata =='undefined'){
      return '';
    }

    $.map(listdata.top_list_list, function(data,index){
      if(index % 2 == 0){
        data['background'] = 'tilewhite';
      }else{
        data['background'] = 'tilegrey';
      }
      console.log(data);
      data['locUrl'] = Router.path('content.locationprofile',{
        loc_id:data.c_hq_state,
      })
      data['newDate'] = moment(data.csi_price_last_updated).tz('America/New_York').format('MM/DD/YYYY');
      data['rank'] = index+1;
      data['url'] = Router.path('content.companyprofile',{
        ticker: data.c_ticker,
        name: compUrlName(data.c_name),
        company_id: data.c_id
      });

      data.price = commaSeparateNumber_decimal(Number(data.csi_price).toFixed(2));
      data.price_change = commaSeparateNumber_decimal(Number(data.csi_price_change_since_last).toFixed(2));
      data.percent_change = commaSeparateNumber_decimal(Number(data.csi_percent_change_since_last).toFixed(2));

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
    var listdata = Session.get('top_list_gen');
    if(typeof listdata =='undefined'){
      return '';
    }
    $.map(listdata.top_list_list, function(data,index){

      data['newDate'] = moment(data.csi_price_last_updated).tz('America/New_York').format('MM/DD/YYYY');
      data['rank'] = index+1;
      data['url'] = Router.path('content.companyprofile',{
        ticker: data.c_ticker,
        name: compUrlName(data.c_name),
        company_id: data.c_id
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
    return listdata.top_list_list[count];
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
Template.list_view.events({
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
